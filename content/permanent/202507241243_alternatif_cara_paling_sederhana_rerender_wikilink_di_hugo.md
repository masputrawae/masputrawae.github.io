---
id: "202507241243"
title: Alternatif Cara Paling Sederhana Merender Wikilink Di Hugo
tags:
  - reference
  - wikilink
  - hugo
created: 2025-07-24T12:43:48+07:00
updated: 2025-07-24T12:43:48+07:00
---

**Referensi Dari**: [radicaledward101](https://www.radicaledward101.com/blag/2023/08/14/blag-article-wiki-links-in-hugo.html)

Cara yang cukup simpel tapi cukup untuk menghandle wikilink dengan mudah, Cara sama dengan yang pernah aku tulis di [[202507191421_cara_merender_wikilink_di_hugo]]

**Berikut Caranya**:

Untuk: `layouts/partials/wikilink.html`

```go-html
{{ .RenderString 
    (replaceRE `\\((\!?)\[[[^]]*]])` `$1` (
        replaceRE `(^|[^\\|!]{1})(\!?)(?:(\[\[([^]||]*)]])|(\[\[([^]||]*)\|([^]]*)]]))` `$1$2[$4$7](internalwiki
"$4$6")` .RawContent)
    ) 
}}
```

Dan untuk `layouts/_markup/render-link.html`

```go-html-template
<a
    href="{{ if eq .Destination `internalwiki`}}
        {{if hasPrefix .Title `http`}}
            {{.Title}}
        {{else}}
            {{ ref (.Page.Site.GetPage `/`) (.Title | lower | urlize) }}
        {{end}}
    {{else}}
        {{ .Destination | safeURL }}
    {{end}}">
    {{ .Text | safeHTML }}
</a>
```

Kemudian untuk  `layouts/_markup/render-image.html`

```go-html-template
{{ if eq .Destination `internalwiki`}}
{{ $titleText := `` }}
{{ $customWidth := replaceRE `.*\|(.*)` `$1` .PlainText}}
{{ if strings.Contains .PlainText .Title}}
{{ $customWidth = ``}}
{{end}}
{{ if strings.Contains .PlainText `|` }}
{{ $titleText = replaceRE `(.*)\|.*` `$1` .PlainText }}
{{ $customWidth = replaceRE `.*\|(.*)` `$1` .PlainText}}
{{end}}
{{/*
* Prefix relative images with the page path instead of normal behavior so
* that we can use page bundles more easily!
* https://gohugo.io/content-management/page-bundles/
*/}}
{{ $imageSrc := .Title | safeURL}}
{{ if not (or (hasPrefix $imageSrc "/") (hasPrefix $imageSrc "."))}}
{{ $imageSrc = print (strings.TrimSuffix (path.Ext .Page.RelPermalink ) .Page.RelPermalink ) `/` $imageSrc}}
{{end}}

<img src="{{$imageSrc}}" {{- with $customWidth }} width="{{ . }}px" {{ end -}} {{- with $titleText }} title="{{ . }}" {{
    end -}}>
{{else}}
<img src="{{ .Destination | safeURL }}" {{- with .PlainText }} alt="{{ . }}" {{ end -}} {{- with .Title }}
    title="{{ . }}" {{ end -}}>
{{end}}
{{- /* chomp trailing newline */ -}}
```

Untuk penjelasan detail bisa kunjungi:  [radicaledward101](https://www.radicaledward101.com/blag/2023/08/14/blag-article-wiki-links-in-hugo.html)

---

## Lihat Juga

- [[202507231153_fitur_wikilinks_experiental_untuk_tema_hugo]]
- [[202507231124_masalah_wikilink_di_hugo]]
- [[202507191421_cara_merender_wikilink_di_hugo]]
- [[202507232007_kesimpulan_final_wikilink_di_hugo]]
- [[202507231512_hal_utama_untuk_menangani_wikilink_hugo]]