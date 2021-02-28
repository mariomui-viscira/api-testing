import { secondApp } from '~src/server'

secondApp.get('/', (req, res) => {
  res.send({ message: 'you have sent to secondApp' })
})
