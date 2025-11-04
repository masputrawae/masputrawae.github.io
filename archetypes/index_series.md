---
title: {{ replace .File.ContentBaseName "-" " " | title }}
date: {{ .Date | time.Format "2006-01-02" }}
lastmod: {{ .Date | time.Format "2006-01-02" }}
description: "Description"
images:
  - https://picsum.photos/720/1080
tags:
  - tag
series:
  - Series Title
---
