const { normalizeURL } = require('./crawl.js')
const { test, expect } = require('@jest/globals')

test('normalizeURL', () => {
    const input = ''
    const output = normalizeURL(input)
    const expected = ''

    expect(output).toEqual(expected)
})
