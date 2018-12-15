import ScaleDataScraper from '../data-scraper/ScaleDataScraper'

const scraper = new ScaleDataScraper()
scraper.produceMappings([1465, 623, 3275, 1749])
    .then(() => console.log('mappings produced'))
    .catch(console.error)
