import { get, setupTest, expectModuleToBeCalledWith, getNuxt } from '@nuxt/test-utils'

describe('markdownit module', () => {
  describe('setup plugin', () => {
    setupTest({
      testDir: __dirname,
      fixture: 'fixture',
      config: {
        markdownit: {
          injected: true,
          preset: 'default',
          linkify: true,
          breaks: true,
          use: []
        }
      }
    })

    test('should inject plugin', () => {
      const options = getNuxt().options.markdownit
      delete options.injected

      expectModuleToBeCalledWith('addPlugin', {
        src: expect.stringContaining('lib/plugin.js'),
        fileName: 'markdown-it.js',
        options
      })
    })
  })

  describe('usage plugin', () => {
    describe('default configuration', () => {
      setupTest({ server: true })

      test('vue', async () => {
        const { body } = await get('/')
        expect(body).toContain('Hello World!')
      })

      test('md', async () => {
        const { body } = await get('/markdown')
        expect(body).toContain('Hello World!!')
      })
    })

    describe('with configuration', () => {
      setupTest({
        server: true,
        config: {
          markdownit: {
            injected: true,
            preset: 'default',
            linkify: true,
            breaks: false,
            use: []
          }
        }
      })

      test('injected option', async () => {
        const { body } = await get('/injected/hello')
        expect(body).toContain('Hello World!')
      })

      test('breaks option', async () => {
        const { body } = await get('/breaks')
        expect(body).not.toContain("I'm a paragraph <br/> without line breaks")
      })
    })
  })
})
