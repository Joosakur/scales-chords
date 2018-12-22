export default class GenericInterval {
    public readonly scaleSteps: number

    constructor(num: number) {
        if (!Number.isInteger(num) || num < 1 || num > 12)
            throw new Error('Must be an integer between 1 and 12')

        this.scaleSteps = num
    }
}
