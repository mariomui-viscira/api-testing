import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/data', (req, res) => {
  console.log(req.body)

  res.send({ message: 'ok' })
})

// router route precedence first come first serve
app.get('/', (req, res) => {
  res.send({ message: 'way' })
})
app.get('/', (req, res) => {
  res.send({ message: 'noway' })
})

export const start = () => {
  app.listen(3000)
}
