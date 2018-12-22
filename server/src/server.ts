import express from 'express'

import scaleTypes from './endpoints/scaleTypes'

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))
scaleTypes(app)

app.listen(3000, () => console.log('Example app listening on port 3000!'))
