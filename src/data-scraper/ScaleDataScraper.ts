import fs from 'fs'
import {parse} from 'node-html-parser'
import request from 'superagent'

export default class ScaleDataScraper {

    public produceMappings = async (scaleNumbers: number []) => {
        const numberToNames: {
            [scaleNumber: number]: string [],
        } = {}

        const nameToNumbers: {
            [scaleName: string]: number [],
        } = {}

        for (const scaleNumber of scaleNumbers) {
            const scaleNames = await this.getScaleNames(scaleNumber)
            numberToNames [scaleNumber] = scaleNames
            for (const scaleName of scaleNames) {
                if (nameToNumbers [scaleName]) {
                    nameToNumbers [scaleName].push(scaleNumber)
                } else {
                    nameToNumbers [scaleName] = [scaleNumber]
                }
            }
        }

        const numberToNamesJson = JSON.stringify(numberToNames)
        const nameToNumbersJson = JSON.stringify(nameToNumbers)
        const writeOptions = { encoding: 'utf8' }
        if (!fs.existsSync('data')) {
            fs.mkdirSync('data')
        }
        fs.writeFileSync('data/numberToNames.json', numberToNamesJson, writeOptions)
        fs.writeFileSync('data/namesToNumbers.json', nameToNumbersJson, writeOptions)
    }

    public getScaleNames = async (scaleNumber: number) => {
        const htmlRoot = await this.getHtmlForScaleNumber(scaleNumber)
        const name = this.parseScaleName(htmlRoot)
        const altNames = this.parseScaleNameAlternatives(htmlRoot)

        return [name, ...altNames]
    }

    private getHtmlForScaleNumber = async (scaleNumber: number) => {
        const url = `https://ianring.com/musictheory/scales/${scaleNumber}`
        const response = await request.get(url)
        const htmlText: string = response.text
        return parse(htmlText)
    }

    private parseScaleName: (root: any) => string = (root) => {
        const scaleTitle = root.querySelector('body .container h1')
        return scaleTitle.text.match(/"(.*)"/) [1]
    }

    private parseScaleNameAlternatives: (root: any) => string = (root) => {
        const scaleSubTitle = root.querySelectorAll('body .container p') [1]
        const nameList = scaleSubTitle.text.match(/Also known as: (.*)/) [1]
        return nameList.split(', ')
    }
}
