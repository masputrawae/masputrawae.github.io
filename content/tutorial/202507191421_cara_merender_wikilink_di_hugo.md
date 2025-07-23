---
id: "202507191421"
title: Cara Ku Merender Wiki Link Style di Hugo
tags:
  - hugo
  - tutorial
  - wiki
created: 2025-07-19T14:21:08+07:00
updated: 2025-07-21T22:20:16+07:00
description: Cara sederhana merender [[Wiki Link]] di Hugo tanpa plugin, dengan partial dan render hook agar catatan rapi, SEO-friendly, dan mudah digunakan.
image: https://picsum.photos/1080/720?1
---

Ingin menulis catatan gaya **wiki** di Hugo? Berikut cara **yang aku pakai sendiri** untuk merender `[[Wiki Link]]` di Hugo **tanpa plugin tambahan**, murni dengan template bawaan.

Kita akan:
- Menulis partial untuk parsing wikilink.  
- Membuat `render-link.html` agar link internal, eksternal, dan alias terdeteksi otomatis.  
- Mendapatkan **tanda broken link** jika halaman belum dibuat.

>[!warning]
> Yang menggunakan multilingual wikilink ini agak tricky soal nama file ambigu, jadi kurang cocok untuk situs multilingual
> Aku juga sedang mencari cara agar bisa digunakan dengan lancar di multilingual, kalau ada saran boleh komentar di bawah, atau kita diskusikan bersama
> Dibahas disini [[202507231124_masalah_wikilink_di_hugo]]


## Membuat layouts/\_markup/render-link.html

Buat file:

```
layouts/_markup/render-link.html
```

Isi dengan kode berikut:

````go-template-html
{{- $isWikilink := eq .Destination "wikilinks" -}}
{{- $isExternal := or (strings.HasPrefix .Destination "http://")
                       (strings.HasPrefix .Destination "https://")
                       (strings.HasPrefix .Destination "mailto:") -}}

{{ if $isWikilink }}
  {{ $rawTitle := cond (ne .Title "") .Title .Text }}
  {{ $target := $rawTitle | lower | urlize }}
  {{ $parts := split $target "#" }}
  {{ $pagePath := index $parts 0 }}
  {{ $anchor := "" }}
  {{ if gt (len $parts) 1 }}
    {{ $anchor = printf "#%s" (index $parts 1) }}
  {{ end }}

  {{ $page := or (.Page.Site.GetPage $pagePath) (.Page.Site.GetPage (printf "/%s" $pagePath)) }}

  {{ if $page }}
    <a class="link link--internal" href="{{ $page.RelPermalink }}{{ $anchor }}">
      {{ .Text | safeHTML }}
      🔗
    </a>
  {{ else }}
    {{ $aliasPage := "" }}
    {{ range .Page.Site.Pages }}
      {{ if in .Aliases $target }}
        {{ $aliasPage = . }}
        {{ break }}
      {{ end }}
    {{ end }}
    {{ if $aliasPage }}
      <a class="link link--internal" href="{{ $aliasPage.RelPermalink }}{{ $anchor }}">
        {{ .Text | safeHTML }}
        🔗
      </a>
    {{ else }}
      <span class="link link--broken" title="Page not found (yet)">
        {{ .Text | safeHTML }}
        ❌
      </span>
    {{ end }}
  {{ end }}

{{ else if not $isExternal }}
  {{ $dest := .Destination }}
  {{ $parts := split $dest "#" }}
  {{ $pagePath := index $parts 0 }}
  {{ $anchor := "" }}
  {{ if gt (len $parts) 1 }}
    {{ $anchor = printf "#%s" (index $parts 1) }}
  {{ end }}
  {{ $page := or (.Page.GetPage $pagePath) (.Page.Site.GetPage (printf "/%s" $pagePath)) }}

  {{ if $page }}
    <a class="link link--internal" href="{{ $page.RelPermalink }}{{ $anchor }}">
      {{ .Text | safeHTML }}
      🔗
    </a>
  {{ else }}
    {{ $aliasPage := "" }}
    {{ range .Page.Site.Pages }}
      {{ if in .Aliases $dest }}
        {{ $aliasPage = . }}
        {{ break }}
      {{ end }}
    {{ end }}
    {{ if $aliasPage }}
      <a class="link link--internal" href="{{ $aliasPage.RelPermalink }}{{ $anchor }}">
        {{ .Text | safeHTML }}
        🔗
      </a>
    {{ else }}
      <span class="link link--broken" title="Page not found (yet)">
        {{ .Text | safeHTML }}
        ❌
      </span>
    {{ end }}
  {{ end }}

{{ else }}
  <a 
    class="link link--external" 
    href="{{ .Destination | safeURL }}"
    rel="external noopener noreferrer nofollow" 
    target="_blank"
    >
     {{ .Text | safeHTML }}
     🌏
  </a>
{{ end }}
````

---

## Membuat layouts/\_partials/wikilink.html

Buat file:

```
layouts/_partials/wikilink.html
```

Isi dengan:

````go-template-html
{{ $content := .RawContent }}
{{ $placeholders := slice }}
{{ $i := 0 }}

{{/* 1. Masking inline code: `[[...]]` */}}
{{ $inlineMatches := findRE "`\\[\\[[^`]+\\]\\]`" $content }}
{{ range $inlineMatches }}
  {{ $placeholder := printf "WIKILINK_PLACEHOLDER_%d" $i }}
  {{ $placeholders = $placeholders | append (dict "original" . "placeholder" $placeholder) }}
  {{ $content = replace $content . $placeholder }}
  {{ $i = add $i 1 }}
{{ end }}

{{/* 2. Masking code blocks: ```...``` yang berisi [[...]] */}}
{{ $codeBlockMatches := findRE "(?s)```.*?```" $content }}
{{ range $codeBlockMatches }}
  {{ if findRE "\\[\\[.*?\\]\\]" . }} {{/* hanya blok yang mengandung [[...]] */}}
    {{ $placeholder := printf "WIKILINK_PLACEHOLDER_%d" $i }}
    {{ $placeholders = $placeholders | append (dict "original" . "placeholder" $placeholder) }}
    {{ $content = replace $content . $placeholder }}
    {{ $i = add $i 1 }}
  {{ end }}
{{ end }}

{{/* 3. Proses link wikilinks */}}
{{ $content = replaceRE `\[\[(https?://[^\|\]]+)\|([^\]]+)\]\]` `[$2]($1)` $content }}
{{ $content = replaceRE `\[\[(https?://[^\]]+)\]\]` `[$1]($1)` $content }}
{{ $content = replaceRE `\[\[([^\|\]]+)\|([^\]]+)\]\]` `[$2](wikilinks "$1")` $content }}
{{ $content = replaceRE `\[\[([^\]]+)\]\]` `[$1](wikilinks "$1")` $content }}

{{/* 4. Kembalikan semua yang dimasking */}}
{{ range $placeholders }}
  {{ $content = replace $content .placeholder .original }}
{{ end }}

{{ .RenderString $content }}
````

---

## Cara Menggunakan

Di layout post (`single.html`), ganti:

```go-template-html
{{ .Content }}
```

menjadi:

```go-template-html
{{ partial "wikilink.html" . }}
```

---

## Contoh Pemakaian

Di markdown:

```md
[[my-note|Baca catatan ini]]

[[second-note]]

[[https://example.com|Contoh Eksternal]]

[[https://google.com]]
```

---

## Coba cara lain
satu cara yang aku anggap lebih baik 👉 [[202507232007_kesimpulan_final_wikilink_di_hugo]] Tapi opsional silahkan coba mana yang lebih baik menurut kalian.