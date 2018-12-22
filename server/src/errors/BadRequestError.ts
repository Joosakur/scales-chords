import HttpStatusError from './HttpStatusError'

class BadRequestError extends Error implements HttpStatusError {
    readonly status: number

    constructor (msg: string) {
        super(msg)
        this.status = 400
    }
}

export default BadRequestError
