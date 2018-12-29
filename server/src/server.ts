import cors from 'cors'
import express from 'express'

import HttpStatusError from './errors/HttpStatusError'
import declareEndpoints from './rest/endpoints'

const app = express()

const corsOptions: cors.CorsOptions = {
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS',
    preflightContinue: false,
}

app.use(cors(corsOptions))

declareEndpoints(app)

app.options('*', cors(corsOptions))

app.use((err: HttpStatusError, req: express.Request, res: express.Response, next: (err: Error) => void) => {
    res.status(err.status || 500)
    console.warn(err.stack)
    res.json({error: err.message})
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
