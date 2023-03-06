const { JSDOM } = require('jsdom')

function normalizeURL(urlString) {
    const urlObj = new URL(urlString)
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`

    if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
        return hostPath.slice(0, -1)
    }
    return hostPath
}

function getURLsFromHTML(htmlBody, baseURL) {
    const urls = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')

    for (const linkElement of linkElements) {
        if (linkElement.href.slice(0, 1) === '/') {
            // relative
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url: ${error.message}`)
            }
        } else {
            // absolute
            try {
                const urlObj = new URL(linkElement.href)
                urls.push(urlObj.href)
            } catch (error) {
                console.log(`Error with absolute url: ${error.message}`)
            }
        }
    }

    return urls
}

async function crawlPage(baseURL, currentURL, pages) {

    // if this is an offsite URL, bail immediately
    const currentUrlObj = new URL(currentURL)
    const baseUrlObj = new URL(baseURL)
    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages
    }

    const normalizedURL = normalizeURL(currentURL)

    // if we've already visited this page
    // just increase the count and don't repeat
    // the http request
    if (pages[normalizedURL] > 0) {
        pages[normalizedURL]++
        return pages
    }

    // initialize this page in the map
    // since it doesn't exist yet
    pages[normalizedURL] = 1

    // fetch and parse the html of the currentURL
    console.log(`crawling ${currentURL}`)
    let htmlBody = ''
    try {
        const resp = await fetch(currentURL)
        if (resp.status > 399) {
            console.log(`Error in fetch with status code: ${resp.status} on page: ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")
        if (!contentType.includes("text/html")) {
            console.log(`Non-html response, content-type: ${contentType} on page ${currentURL}`)
            return pages
        }
        htmlBody = await resp.text()

    } catch (error) {
        console.log(`Error in fetch: ${error}`)
    }

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
    }

    return pages
}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}