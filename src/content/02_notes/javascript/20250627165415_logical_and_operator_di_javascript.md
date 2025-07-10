---
id: '20250627165415'
title: Logical AND Operator di JavaScript
tags:
  - javascript
  - programming
  - fundamental
created: 2025-06-27T16:54:15+07:00
updated: 2025-07-10T18:12:09+07:00
---

Secara sederhananya bisa dianggap satu kondisi atau if tanpa else

**Contoh**:

```javascript
const isLoggedIn = true
const userName = 'John Doe'

const displayName = isLoggedIn && userName
console.log(displayName) // output: John Doe
```

Sama saja dengan seperti ini:

```javascript
const isLoggedIn = true
const userName = 'John Doe'

if (isLoggedIn) {
	console.log(userName)
}
// output: John Doe
```

**Terkait**:

- [[20250628205351_if_statement_di_javascript]]
- [[20250628211305_else_if_statement_di_javascript]]
- [[Switch Statement Di JavaScript]]
- [[20250701054353_ternary_operator_di_javascript]]
- [[20250628171342_operator_perbandingan_di_javascript]]
