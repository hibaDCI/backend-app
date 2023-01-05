---
title: JWT Tokens in the frontend
theme: "white"
---

# JWT Tokens in the frontend

---

There are many ways to store JWT tokens in the frontend

Here are 2 of the most common:

1. JWT as httpOnly cookie 🍪
2. JWT in localstorage / sessionStorage 🏪

---

## Storing JWT in a httpOnly cookie 🍪

---

**Storing JWT in a httpOnly cookie 🍪**

1. Server sends the JWT token back to the client
2. Client (browser) automatically handles the cookie, and sends it with each subsequent request

---

**Storing JWT in a httpOnly cookie 🍪**

Responsibilities

Server:

Generate and send JWT token as httpOnly cookie

Client:

None

---

How to send a httpOnly cookie with Express.js:

```javascript
response
  .cookie("jwt", jwtToken, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  })
  .send({
    success: true,
    message: "Login successful",
  });
```

---

httpOnly cookies 🍪 are more secure

They are handled by the browser

They can not be accessed from the frontend code (JavaScript)

---

## JWT in localStorage / sessionStorage 🏪

---

**Storing JWT in localStorage / sessionStorage 🏪**

1. Server sends the JWT token back to the client
2. Client must handle the response from the server and save it (to localStorage)
3. Client must handle sending the JWT token back with every authorization request

---

**Storing JWT in localStorage / sessionStorage 🏪**

Responsibilities

Server:

Generate and send JWT token

Client:

Storing and send JWT token

##
