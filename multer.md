---
title: Presenting - Uploading with multer
theme: "white"
---

# Uploading with multer

---

## What does it do?

---

multer is middleware

---

- it reads uploaded form data
- it saves uploaded files to the filesystem
- it adds a `file` attribute to the **request** object

---

- we can store the properties of the `file` attribute directly into the database, for example the `filename` or `path`
- you don't need to handle the MIME type of the image, as it is done automatically by multer / the browser

---

## How does it work?

---

![uploading with multer](_assets/uploading-with-multer.png)

---

## Client side

---

1. Create a form, with the `input` type `file`

---

```html [4]
<form onSubmit="{handleSubmitForm}" enctype="multipart/form-data">
  <label>
    Upload image
    <input type="file" accept="image/*" name="photo" />
  </label>
  <button type="submit">Submit</button>
</form>
```

---

2. Send the form data directly after instantiating it with the `FormData` object

> It is recommended to use `axios`

---

```javascript [3-9]
const formData = new FormData(event.target);

const push = await axios.post(
  "http://localhost:3001/user/uploadProfileImage",
  formData,
  {
    headers: {"Content-Type": "multipart/form-data"},
  }
);
```

---

When you make a POST request, you have to encode the data that forms the body of the request in some way

HTML forms provide three methods of encoding;

###### application/x-www-form-urlencoded

Default behaviour

###### multipart/form-data

Use when your form includes any <input type="file"> elements

###### text/plain

Rarely used
