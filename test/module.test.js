const { Nuxt, Builder } = require('nuxt')
const fetch = require('node-fetch')

const config = require('./fixture/nuxt.config')
config.dev = false
config.modules = [require('../lib/index')]
config.markdownit = {}

const PORT = 5000
const url = path => `http://localhost:${PORT}${path}`
const request = (path, options = {}) => fetch(url(path), options)
const get = path => request(path).then(res => res.text())

const startServer = async config => {
  const nuxt = new Nuxt(config)
  await nuxt.ready()
  await new Builder(nuxt).build()
  await nuxt.listen(PORT)
  return nuxt
}

jest.setTimeout(60000)

describe('Markdownit', () => {
  describe('default configuration', () => {
    let nuxt = null

    afterEach(async () => {
      await nuxt.close()
    })

    test('vue', async () => {
      nuxt = await startServer({
        ...config
      })

      const html = await get('/')
      expect(html).toContain('Hello World!')
    })

    test('md', async () => {
      nuxt = await startServer({
        ...config
      })

      const html = await get('/markdown')
      expect(html).toContain('Hello World!!')
    })
  })

  describe('with configuration', () => {
    let nuxt = null

    afterEach(async () => {
      await nuxt.close()
    })

    test('injected', async () => {
      nuxt = await startServer({
        ...config,
        markdownit: {
          injected: true
        }
      })

      const html = await get('/injected/hello')
      expect(html).toContain('Hello World!')
    })

    test('breaks', async () => {
      nuxt = await startServer({
        ...config,
        markdownit: {
          breaks: false
        }
      })

      const html = await get('/breaks')
      expect(html).not.toContain("I'm a paragraph <br/> without line breaks")
    })
  })
})
