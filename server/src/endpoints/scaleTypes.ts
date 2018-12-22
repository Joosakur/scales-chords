import { Application, Request, Response } from 'express'

import scaleDictionaryService from '../services/scaleDictionary'

const queryByName = (req: Request, res: Response) => {
    const { name } = req.query
    const scaleListEntries = scaleDictionaryService.queryScalesByName(name)
    res.json(scaleListEntries)
}

const declare = (app: Application) => {
    app.get('/scale-types', queryByName)
}

export default declare
