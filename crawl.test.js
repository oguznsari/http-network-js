const { normalizeURL, getURLsFromHTML } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL strip Protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalizeURL strip Protocol(http)', () => {
    const input = 'http://BLOG.boot.dev/path'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalizeURL strip trailing slash ', () => {
    const input = 'https://blog.boot.dev/path/'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('normalizeURL strip CAPITALS ', () => {
    const input = 'https://BLOG.boot.dev/path'
    const output = normalizeURL(input)
    const expected = 'blog.boot.dev/path'

    expect(output).toEqual(expected)
})

test('getURLsFromHTML absolute', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path/">Boot.dev Blog</a>
            </body> 
        </html> 
    `
    const inputBaseURL = "https://blog.boot.dev/path/"
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML relative', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/path/">Boot.dev Blog</a>
            </body> 
        </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML both', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://blog.boot.dev/path1/">Boot.dev Blog</a>
                <a href="/path2/">Boot.dev Blog</a>
            </body> 
        </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]

    expect(output).toEqual(expected)
})

test('getURLsFromHTML invalid', () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Invalid URL.</a>
            </body> 
        </html> 
    `
    const inputBaseURL = "https://blog.boot.dev"
    const output = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = []

    expect(output).toEqual(expected)
})