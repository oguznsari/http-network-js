const { crawlPage } = require('./crawl.js')

function main() {
    if (process.argv.length < 3 || process.argv.length > 3) {
        console.log("Invalid argument count!")
        process.exit(1)
    }

    const baseURL = process.argv[2]

    console.log(`Starting crawl of ${baseURL}`)
    crawlPage(baseURL)
}

main()