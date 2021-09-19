# Welcome to caskbrewer

This is a demo for [this video](https://youtu.be/w5yaQWZfcZQ)

This is a react component that will serves and runs a static website only from a `.zip` file, by only using some web APIs like

- [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)

and some other packages:

- [axios](https://axios-http.com/)
- [jszip](https://stuk.github.io/jszip/)

# What happens

- We load a `.zip` file from the backend
- This `.zip` file contains a static website (`.html`, `.js`, `.css`) files
- After loading the `.zip` file, we extract the content
- we use Iframes for the `.html` files
- we inline the `link` tags (we get the CSS code from the `.zip` file and inline them)
- we use the [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) API with [URL.createObjectURL()](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) to create linkable JS scritps from the `.zip` file

# DEMO

See this demo of this code

https://mohammedal-rowad.github.io/caskbrewer/

> look at the `network` tab and the `DOM`
