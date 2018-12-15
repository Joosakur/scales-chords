import fs from 'fs'
import {parse} from 'node-html-parser'
import request from 'superagent'

interface OriginalScaleData {
    tones: number []
    modes: number []
    symmetries: number []
    imperfections: number []
    names: string []
}

interface ScaleDataResponse {
    [scaleNumber: string]: OriginalScaleData
}

interface ScaleData {
    scaleNumber: number,
    names: string [],
    modes: number []
}

const writeOptions = { encoding: 'utf8' }

export default class ScaleDataScraper {

    public produceMappings = async () => {
        const scales: ScaleData [] = Object.entries((await this.getDataFromGithub()))
            .map(this.mapToHeptatonicScaleData)
            .filter(Boolean)

        if (!fs.existsSync('data')) {
            fs.mkdirSync('data')
        }

        this.writeMappingsTofiles(scales)
    }

    private mapToHeptatonicScaleData = (entry: [string, OriginalScaleData]) => {
        const [ scaleNum, data ] = entry
        if (data.tones.length !== 7) { return null }

        const scaleNumber = parseInt(scaleNum, 10)
        return {
            scaleNumber,
            names: data.names,
            modes: data.modes,
        }
    }

    private getDataFromGithub: () => Promise<ScaleDataResponse> = async () => {
        const url = 'https://raw.githubusercontent.com/ianring/PHPMusicTools' +
            '/master/src/PHPMusicTools/scales/scales.json'
        const responseJson = (await request.get(url)).text
        return JSON.parse(responseJson)
    }

    private writeMappingsTofiles = (scales: ScaleData []) => {
        const numberToNames: {
            [scaleNumber: number]: string [],
        } = {}
        const numberToModes: {
            [scaleNumber: number]: number [],
        } = {}
        const nameToNumbers: {
            [scaleName: string]: number,
        } = {}

        for (const scale of scales) {
            const { scaleNumber, names, modes } = scale
            const asciiNames = names.map(name => name
                .replace(/[\u266d]/g,'b')
                .replace(/[\u266e]/g,'natural ')
                .replace(/[\u266f]/g,'#')
            )

            numberToNames [scaleNumber] = asciiNames
            numberToModes [scaleNumber] = modes
            for (const name of asciiNames) {
                nameToNumbers [name] = scaleNumber
            }
        }

        fs.writeFileSync('data/numberToNames.json', JSON.stringify(numberToNames), writeOptions)
        fs.writeFileSync('data/numberToModes.json', JSON.stringify(numberToModes), writeOptions)
        fs.writeFileSync('data/namesToNumbers.json', JSON.stringify(nameToNumbers), writeOptions)
    }

}
