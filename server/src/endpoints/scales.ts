import { Application, Request, Response } from 'express'

import scaleDescriptorService from '../services/scaleDescriptor'

const queryByName = (req: Request, res: Response) => {
    const scaleNumber: number = parseInt(req.params.scaleNumber, 10)
    const scaleDetails = scaleDescriptorService.getScaleDetails(scaleNumber)
    res.json(scaleDetails)
}

const declare = (app: Application) => {
    app.get('/scales/:scaleNumber', queryByName)
}

export default declare
