---
id: "202507191421"
title: Cara Ku Merender Wiki Link Style di Hugo
tags:
  - hugo
  - tutorial
  - wikilink
created: 2025-07-19T14:21:08+07:00
updated: 2025-07-25T02:47:53+07:00
description: Cara sederhana merender [[Wiki Link]] di Hugo tanpa plugin, dengan partial dan render hook agar catatan rapi, SEO-friendly, dan mudah digunakan.
image: https://picsum.photos/1080/720?1
---

Ingin menulis catatan gaya **wiki** di Hugo? Berikut cara **yang aku pakai sendiri** untuk merender `[[Wiki Link]]` di Hugo **tanpa plugin tambahan**, murni dengan template bawaan.

Kita akan:
- Menulis partial untuk parsing wikilink.  
- Membuat `render-link.html` agar link internal, eksternal, dan alias terdeteksi otomatis.  
- Mendapatkan **tanda broken link** jika halaman belum dibuat.

## Membuat layouts/\_markup/render-link.html

Buat file:

```
layouts/_markup/render-link.html
```

Isi dengan kode berikut:

````go-html-template { file="layouts/_markup/render-link.html" }
{{ define "render-link-internal" }}
  <a class="link link--internal" href="{{ .href | safeURL }}">
    {{ .text }}
    🔗
  </a>
{{ end }}

{{ define "render-external-link" }}
  <a
    class="link link--external"
    href="{{ .href | safeURL }}"
    rel="external noopener noreferrer nofollow"
    target="_blank"
    {{- with .title }}title="{{ . }}"{{ end -}}
  >
    {{- with .text }}{{ . }}{{ end -}}
    🌐
  </a>
{{ end }}

{{ define "render-broken" }}
  <span class="link link--broken" title="{{ i18n "missingLink" }}">
    {{ .text }}
    ❌
  </span>
{{ end }}

{{- $destination := .Destination | default "" -}}
{{- $text := .Text | safeHTML | default "" -}}
{{- $title := .Title | default "" -}}

{{- $regularPages := where site.RegularPages "Lang" $.Page.Lang -}}

{{- $isWikilink := eq $destination "wikilink" -}}
{{- $isExternal := or
  (strings.HasPrefix $destination "http://")
  (strings.HasPrefix $destination "https://")
  (strings.HasPrefix $destination "mailto:")
-}}

{{ if $isWikilink }}
  {{/* Obsidian-style [[wikilink]] -> pakai strict logic */}}
  {{ $rawTitle := cond (ne $title "") $title $text }}
  {{ $parts := split $rawTitle "#" }}
  {{ $targetRaw := index $parts 0 }}
  {{ $target := path.Base $targetRaw }}
  {{ $anchor := cond (gt (len $parts) 1) (printf "#%s" (index $parts 1)) "" }}

  {{ $page := "" }}
  {{ range $regularPages }}
    {{ if and (ne .File nil) (or
      (eq .File.BaseFileName $target)
      (eq .File.TranslationBaseName $target)
      (in .Aliases $target)
      )
    }}
      {{ $page = . }}
      {{ break }}
    {{ end }}
  {{ end }}
  {{ if $page }}
    {{ template "render-link-internal" (dict "href" (print $page.RelPermalink $anchor) "text" $text) }}
  {{ else }}
    {{ template "render-broken" (dict "text" $text) }}
  {{ end }}
{{ else if $isExternal }}
  {{ template "render-external-link" (dict "href" $destination "text" $text "title" $title) }}
{{ else }}
  {{- $u := urls.Parse $destination -}}
  {{ if $u.IsAbs }}
    {{ template "render-external-link" (dict "href" $destination "text" $text "title" $title) }}
  {{ else }}
    {{ template "render-link-internal" (dict "href" $destination "text" $text) }}
  {{ end }}
{{ end }}
````

## Membuat layouts/\_markup/render-image.html

```go-html-template { file="layouts/_markup/render-image.html"}

{{ if eq .Destination `imageWikiLink` }}
  {{ $titleText := `` }}
  {{ $customWidth := replaceRE `.*\|(.*)` `$1` .PlainText }}
  {{ if strings.Contains .PlainText .Title }}
    {{ $customWidth = `` }}
  {{ end }}
  {{ if strings.Contains .PlainText `|` }}
    {{ $titleText = replaceRE `(.*)\|.*` `$1` .PlainText }}
    {{ $customWidth = replaceRE `.*\|(.*)` `$1` .PlainText }}
  {{ end }}
  {{ $imageSrc := .Title | safeURL }}
  {{ if not (or (hasPrefix $imageSrc "/") (hasPrefix $imageSrc ".")) }}
    {{ $base := .Page.File.Dir | strings.TrimPrefix "content" | strings.TrimPrefix "/" | strings.TrimSuffix "/" }}
    {{ $imageSrc = print "/" $base "/" $imageSrc | urlize }}
  {{ end }}
  <img
    src="{{ $imageSrc }}"
    {{- with $titleText }}
      alt="{{ . }}" title="{{ . }}"
    {{ end -}}
    {{- with $customWidth }}width="{{ . }}px"{{ end -}}
  />
{{ else }}
  <img
    src="{{ .Destination | safeURL }}"
    {{- with .PlainText }}alt="{{ . }}"{{ end -}}
    {{- with .Title }}
      title="{{ . }}"
    {{ end -}}
  />
{{ end }}
```
---

## Membuat layouts/\_partials/wikilink.html

Buat file:

```
layouts/_partials/wikilink.html
```

Isi dengan:

````go-html-template { file="layouts/_partials/wikilink.html" }

{{/* Inisialisasi konten dan placeholder */}}
{{ $content := .RawContent }}
{{ $placeholders := slice }}
{{ $i := 0 }}

{{/* ------------------------------------ */}}
{{/* 1. Masking inline code yang berisi [[...]] atau ![[...]] */}}
{{ $inlineMatches := findRE "`!?\\[\\[[^\\[\\]]+\\]\\]`" $content }}
{{ range $inlineMatches }}
  {{ $placeholder := printf "WIKILINK_PLACEHOLDER_%d" $i }}
  {{ $placeholders = $placeholders | append (dict "original" . "placeholder" $placeholder) }}
  {{ $content = replace $content . $placeholder }}
  {{ $i = add $i 1 }}
{{ end }}

{{/* ------------------------------------ */}}
{{/* 2. Masking semua code block yang berisi [[...]] atau ![[...]] */}}
{{ $codeBlockMatches := findRE "(?s)```.*?```" $content }}
{{ range $codeBlockMatches }}
  {{ if or (findRE "\\[\\[.*?\\]\\]" .) (findRE "!\\[\\[.*?\\]\\]" .) }}
    {{ $placeholder := printf "WIKILINK_PLACEHOLDER_%d" $i }}
    {{ $placeholders = $placeholders | append (dict "original" . "placeholder" $placeholder) }}
    {{ $content = replace $content . $placeholder }}
    {{ $i = add $i 1 }}
  {{ end }}
{{ end }}

{{/* ------------------------------------ */}}
{{/* 3. Konversi Wikilink Gambar terlebih dahulu */}}
{{ $content = replaceRE `!\[\[([^\|\]]+)\|([^\|\]]+)\|([^\]]+)\]\]` `![$2|$3](imageWikiLink "$1")` $content }}
{{ $content = replaceRE `!\[\[([^\|\]]+)\|([^\]]+)\]\]`         `![$2](imageWikiLink "$1")` $content }}
{{ $content = replaceRE `!\[\[([^\]]+)\]\]`                     `![$1](imageWikiLink "$1")` $content }}

{{/* 4. Konversi Wikilink Biasa ke Markdown Link */}}
{{ $content = replaceRE `\[\[(https?://[^\|\]]+)\|([^\]]+)\]\]` `[$2]($1)` $content }}
{{ $content = replaceRE `\[\[(https?://[^\]]+)\]\]`             `[$1]($1)` $content }}
{{ $content = replaceRE `\[\[([^\|\]]+)\|([^\]]+)\]\]`          `[$2](wikilink "$1")` $content }}
{{ $content = replaceRE `\[\[([^\]]+)\]\]`                      `[$1](wikilink "$1")` $content }}

{{/* ------------------------------------ */}}
{{/* 5. Kembalikan semua Placeholder ke Aslinya */}}
{{ range $placeholders }}
  {{ $content = replace $content .placeholder .original }}
{{ end }}

{{/* 6. Render hasil akhir */}}
{{ .RenderString $content }}

````

---

## Cara Menggunakan

Di layout post (`page.html`), ganti:

```go-html-template { file="layouts/page.html" }
{{ .Content }}
```

menjadi:

```go-html-template { file="layouts/page.html" }
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
