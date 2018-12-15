import ScaleDataScraper from './data-scraper/ScaleDataScraper'
console.log('hey')

const scraper = new ScaleDataScraper()
scraper.produceMappings([1465])
    .then(() => console.log('mappings producer'))
    .catch(console.error)
