function getDomainNameFromURL(url) {
    const urlObj = new URL(url);
    console.log({urlObj});
    return urlObj.hostname;
}

const bootDevURL = 'https://boot.dev/learn/learn-python';
const domainName = getDomainNameFromURL(bootDevURL);
console.log(`The domain name for ${bootDevURL} is ${domainName}.`);