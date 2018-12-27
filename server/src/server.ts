import express from 'express'

import scales from './endpoints/scales'
import scaleTypes from './endpoints/scaleTypes'
import HttpStatusError from './errors/HttpStatusError'

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

app.get('/', (req, res) => res.send('Hello World!'))
scaleTypes(app)
scales(app)

app.use((err: HttpStatusError, req: express.Request, res: express.Response, next: (err: Error) => void) => {
    res.status(err.status || 500)
    res.json({error: err.message})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
