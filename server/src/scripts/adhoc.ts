import Scale from '../models/Scale'

const scale1 = Scale.fromToneStrings(['C', 'D', 'E', 'F', 'G', 'A', 'B'])
console.log(scale1.toString())

const scale2 = Scale.fromToneStrings(['C', 'D', 'E', 'F', 'G', 'A', 'Bb'])
console.log(scale2.toString())

const scale3 = Scale.fromToneStrings(['D', 'E', 'F', 'G', 'A', 'B', 'C'])
console.log(scale3.toString())

const scale4 = Scale.fromToneStrings(['E', 'F#', 'G', 'A', 'Bb', 'C', 'D'])
console.log(scale4.toString())

const scale5 = Scale.fromToneStrings(['C', 'D', 'E', 'F#', 'G', 'A', 'Bb'])
console.log(scale5.toString())
