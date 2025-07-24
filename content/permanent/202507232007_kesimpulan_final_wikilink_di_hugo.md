---
id: "202507232007"
title: Kesimpulan Final Wikilink Di Hugo
tags:
  - hugo
  - wikilink
  - solving
  - idea
created: 2025-07-23T20:07:36+07:00
updated: 2025-07-23T20:07:36+07:00
---

Kesimpulan untuk tema yang ingin dibuat, aku mendapatkan 1 Opsi terbaik menurut ku.

Pertama wikilink tidak akan jadi default featured utama, aku tetap akan menyisipkan sebagai opsional, atau eksperimental seperti yang sudah pernah aku fikirkan sebelumnya di sini 

- [[202507231153_fitur_wikilinks_experiental_untuk_tema_hugo]]

Kemudian aku akan buat `.Params.wikilink` dengan default false

```yaml
params:
  wikilink: false
```

Kemudian di `layouts/_markup/render-link.html` yang aku rasa cukup stabil saat catatan ini di buat pada 2025-07-23.

```go-html-template
{{ if site.Params.wikilink | default false }}
  {{- $destination := .Destination | default "" -}}
  {{- $text := .Text | safeHTML | default "" -}}
  {{- $title := .Title | default "" -}}

  {{- $regularPages := where site.RegularPages "Lang" $.Page.Lang -}}

  {{- $isWikilink := eq $destination "wikilinks" -}}
  {{- $isExternal := or
    (strings.HasPrefix $destination "http://")
    (strings.HasPrefix $destination "https://")
    (strings.HasPrefix $destination "mailto:")
  -}}

  {{ define "render-link" }}
    <a class="link link--internal" href="{{ .href }}">
      {{ .text }}
      🔗
    </a>
  {{ end }}

  {{ define "render-broken" }}
    <span class="link link--broken" title="{{ i18n "missingLink" }}">
      {{ .text }}
      ❌
    </span>
  {{ end }}

  {{ if $isWikilink }}
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
      {{ template "render-link" (dict "href" (print $page.RelPermalink $anchor) "text" $text) }}
    {{ else }}
      {{ template "render-broken" (dict "text" $text) }}
    {{ end }}

  {{ else if not $isExternal }}
    {{ $parts := split $destination "#" }}
    {{ $target := index $parts 0 }}
    {{ $anchor := cond (gt (len $parts) 1) (printf "#%s" (index $parts 1)) "" }}

    {{ $page := "" }}
    {{ range $regularPages }}
      {{ if and (ne .File nil) (or
        (eq .File.BaseFileName $target)
        (eq .File.TranslationBaseName $target)
        (in .Aliases $destination)
        )
      }}
        {{ $page = . }}
        {{ break }}
      {{ end }}
    {{ end }}

    {{ if $page }}
      {{ template "render-link" (dict "href" (print $page.RelPermalink $anchor) "text" $text) }}
    {{ else }}
      {{ template "render-broken" (dict "text" $text) }}
    {{ end }}

  {{ else }}
    <a
      class="link link--external"
      href="{{ $destination | safeURL }}"
      rel="external noopener noreferrer nofollow"
      target="_blank"
    >
      {{ $text }}
      🌐
    </a>
  {{ end }}

{{ else }}
  {{- $u := urls.Parse .Destination -}}
  <a
    href="{{ .Destination | safeURL }}"
    {{- with .Title }}title="{{ . }}"{{ end -}}
    {{- if $u.IsAbs }}
      rel="external noopener noreferrer nofollow" target="_blank"
    {{ end -}}
    class="link {{ if $u.IsAbs }}
      link--external
    {{ else }}
      link--internal
    {{ end }}"
  >
    {{- with .Text }}{{ . }}{{ end -}}

    {{- if $u.IsAbs }}
      {{ partial "components/icon" (dict "name" "box-arrow-up-right") }}
    {{ else -}}
      🔗
    {{ end }}
  </a>
{{ end }}
```

Kemudian untuk `layouts/_partials/components/wikilink.html` aku pakai ini

```go-html-templates
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
  {{ if findRE "\\[\\[.*?\\]\\]" . }}
    {{ $placeholder := printf "WIKILINK_PLACEHOLDER_%d" $i }}
    {{ $placeholders = $placeholders | append (dict "original" . "placeholder" $placeholder) }}
    {{ $content = replace $content . $placeholder }}
    {{ $i = add $i 1 }}
  {{ end }}
{{ end }}

{{/* 3. Konversi wikilink jadi markdown link dengan "wikilinks" sebagai tujuan */}}
{{ $content = replaceRE `\[\[(https?://[^\|\]]+)\|([^\]]+)\]\]` `[$2]($1)` $content }}
{{ $content = replaceRE `\[\[(https?://[^\]]+)\]\]` `[$1]($1)` $content }}
{{ $content = replaceRE `\[\[([^\|\]]+)\|([^\]]+)\]\]` `[$2](wikilinks "$1")` $content }}
{{ $content = replaceRE `\[\[([^\]]+)\]\]` `[$1](wikilinks "$1")` $content }}

{{/* 4. Kembalikan semua yang dimasking */}}
{{ range $placeholders }}
  {{ $content = replace $content .placeholder .original }}
{{ end }}

{{ .RenderString $content }}
```

Kemudian panggil di `layouts/page.html`

```go-html-template
{{ define "main" }}
  <h1>{{ .Title }}</h1>
  {{ if site.Params.wikilink | default false }}
    {{ partial "components/wikilink" . }}
  {{ else }}
    {{ .Content }}
  {{ end }}
{{ end }}
```

Jadi cukup fleksibel untuk digunakan secara umum. Kekurangan Wikilink tidak bisa menggunakan `![[image.jpg]]` jadi jika ingin embed gambar pakai standar markdown `![image](image.jpg)`.

---

## Lihat Juga

- [[202507231512_hal_utama_untuk_menangani_wikilink_hugo]]
- [[202507231153_fitur_wikilinks_experiental_untuk_tema_hugo]]
- [[202507231124_masalah_wikilink_di_hugo]]
- [[202507191421_cara_merender_wikilink_di_hugo]]
