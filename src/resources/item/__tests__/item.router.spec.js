import router from '../item.router'

describe('item router', () => {
  test('has crud routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' },
      { path: '/:id', method: 'delete' },
      { path: '/:id', method: 'put' },
      { path: '/', method: 'post' }
    ]

    routes.forEach(route => {
      let pathMatched
      let methodsMatched
      const match = router.stack.find(s => {
        const match =
          s.route.path === route.path && s.route.methods[route.method]
        if (!!match === false) {
          pathMatched = {
            didPathsMatch: s.route.path === route.path,
            path: s.route.path
          }
          methodsMatched = { didMethodsMach: !!s.route.methods[route.method] }
        }
        return match
      })
      // expect(match).toBeTruthy()
      if (!!match === false) {
        console.log(pathMatched, methodsMatched)
      }
      expect(!!match).toBe(true)
    })
  })
})
