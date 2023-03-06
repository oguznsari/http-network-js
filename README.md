# HTTP-Network-JS
- HTTP networking course with fetch &amp; rest in JS

# [Free Code Camp course](https://www.youtube.com/watch?v=2JYT5f2isg4) 

1. retrieve-items
2. url-obj.js
3. promise.js

# Useful Code Snippets
` 
const urlObj = new URL(url);
`

| Syntax | Corresponds to |
| ------- | ------- |
| .then() | await |
| new Promise() | async |


# .then example:
`
promise.then((message) => {
    console.log(`Resolved with ${message}`)
})
`

# await example:
`
const message = await promise 
console.log(`Resolved with ${message}`)
`