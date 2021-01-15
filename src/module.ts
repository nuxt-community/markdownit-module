// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it
import { resolve, join } from 'path'
import defu from 'defu'
import type { Module } from '@nuxt/types'
import { ModuleOptions, ModuleLoader, moduleDefaults } from './options'

const markdownitModule: Module<ModuleOptions> = function (moduleOptions) {
  const { extendBuild, addPlugin } = this

  // Merge all option sources
  const options: ModuleOptions = defu(
    moduleOptions,
    this.options.markdownit,
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

  if (options.injected === true) {
    delete options.injected

    // Register plugin
    addPlugin({
      src: resolve(__dirname, '../templates', 'plugin.js'),
      fileName: join('markdown-it.js'),
      options
    })
  }
}

export default markdownitModule

module.exports.meta = require('../package.json')
