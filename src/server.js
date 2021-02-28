import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
export const secondApp = express()
app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: false }))

// The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false) or the qs library (when true). The "extended" syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded. For more information, please see the qs library.
/*  
foo[bar]=baz', that's a qs type so nested json can happen  (rare in the wild)
/?mario=five&you=two is a querystring  (super common)
*/
const logMiddleWare = (req, res, next) => {
  console.log('logging')
  next()
}

app.use(morgan('dev'))

app.post('/data', (req, res) => {
  console.log(req.body)

  res.send({ message: 'wasup' })
})
secondApp.get('/', (req, res) => {
  res.send({ message: 'you have sent to secondApp' })
})
app.use('/secondApp', secondApp)
// router route precedence first come first serve
app.get('/', logMiddleWare, (req, res, next) => {
  // next()
  // doing a next here throws to the next controller/middlware
  res.send({ message: 'way' })
})
app.get('/', (req, res) => {
  res.send({ message: 'noway' })
})

export const start = () => {
  app.listen(3000)
}
