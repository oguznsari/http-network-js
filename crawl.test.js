const { normalizeURL } = require('./crawl.js')
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
