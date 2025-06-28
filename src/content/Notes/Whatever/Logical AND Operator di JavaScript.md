---
unique_id: "20250627165415"
title: Logical AND Operator di JavaScript
topic:
  - JavaScript
tags:
  - AND
  - operator
  - logical
  - javascript
date: 2025-06-27T16:54:15+07:00
---

# Logical AND Operator di JavaScript
Secara sederhananya bisa dianggap satu kondisi atau if tanpa else

**Contoh**:
```javascript
const isLoggedIn = true
const userName = "John Doe"

const displayName = isLoggedIn && userName
console.log(displayName) // output: John Doe
```

Sama saja dengan seperti ini:

```javascript
const isLoggedIn = true
const userName = "John Doe"

if(isLoggedIn){
  console.log(userName)
}
// output: John Doe
```