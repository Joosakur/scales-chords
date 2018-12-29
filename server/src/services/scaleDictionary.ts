import fs from 'fs'

import { ScaleListEntry } from '../rest/models'

const namesToNumbers: { [name: string]: number } = JSON.parse(
    fs.readFileSync('data/namesToNumbers.json', {encoding: 'utf8'}),
)

const queryScalesByName: (name: string) => ScaleListEntry [] = (name: string) => {
    if (!name || name.length === 0) return []

    return Object.keys(namesToNumbers).reduce((list: ScaleListEntry [], scaleName: string) => {
        if (nameMatches(name, scaleName)) {
            list.push({
                name: scaleName,
                scaleNumber: namesToNumbers [scaleName],
            })
        }
        return list
    }, []).sort((s1, s2) => s1.name < s2.name ? -1 : 1)
}

const nameMatches = (n1: string, n2: string) => {
    n1 = n1.toLowerCase()
    n2 = n2.toLowerCase()
    if (n2.startsWith(n1)) return true
    for (const namePart of n2.split(' ')) {
        if (namePart.startsWith(n1)) return true
    }
    return false
}

export default {
    queryScalesByName,
}
