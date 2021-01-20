import { setupTest, expectModuleToBeCalledWith, expectModuleNotToBeCalledWith, get } from '@nuxt/test-utils'

describe('module (with config)', () => {
  setupTest({
    testDir: __dirname,
    fixture: 'fixture',
    server: true,
    config: {
      markdownit: {
        runtime: true,
        preset: 'default',
        linkify: true,
        breaks: true,
        use: []
      }
    }
  })

  test('should inject plugin', () => {
    expectModuleToBeCalledWith('addPlugin', expect.objectContaining({
      fileName: 'markdownit.js'
    }))
  })

  test('template', async () => {
    const { body } = await get('/template')
    expect(body).toContain('Hello World!')
  })

  test('$md', async () => {
    const { body } = await get('/$md')
    expect(body).toContain('# Hello World!')
  })

  test('breaks option', async () => {
    const { body } = await get('/template')
    expect(body).not.toContain("I'm a paragraph <br/> without line breaks")
  })
})

describe('default configuration', () => {
  setupTest({
    config: {
      markdownit: {
        runtime: false
      }
    }
  })

  test('plugin should not be include', () => {
    expectModuleNotToBeCalledWith('addPlugin')
  })
})
