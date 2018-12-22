import HttpStatusError from './HttpStatusError'

class NotFoundError extends Error implements HttpStatusError {
    readonly status: number

    constructor (msg: string) {
        super(msg)
        this.status = 404
    }
}

export default NotFoundError
