import { resolve, join } from 'path'
import defu from 'defu'
import { ModuleOptions, ModuleLoader, moduleDefaults } from './options'
import './types'

// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it

function markdownitModule (moduleOptions) {
  const { nuxt, extendBuild, addPlugin } = this

  // Merge all option sources
  const options: ModuleOptions = defu(
    moduleOptions,
    nuxt.options.markdownit,
    moduleDefaults
  )

  // Define module loader for markdownit
  const moduleLoader: ModuleLoader = {
    loader: '@nuxtjs/markdownit-loader',
    options
  }

  // Extend webpack configuration
  extendBuild((config) => {
    config.module.rules.push({
      test: /\.md$/,
      oneOf: [
        {
          resourceQuery: /^\?vue/,
          use: [moduleLoader]
        },
        {
          use: ['raw-loader', moduleLoader]
        }
      ]
    })
  })

  if (options.runtime === true) {
    delete options.runtime

    // Register plugin
    addPlugin({
      src: resolve(__dirname, 'runtime/plugin.js'),
      fileName: join('markdownit.js'),
      options
    })
  }
}

markdownitModule.meta = require('../package.json')

export default markdownitModule
