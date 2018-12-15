import ScaleDataScraper from '../data-scraper/ScaleDataScraper'

const scraper = new ScaleDataScraper()
scraper.produceMappings()
    .then(() => console.log('mappings produced'))
    .catch(console.error)
