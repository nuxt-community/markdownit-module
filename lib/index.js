// https://github.com/BlueOakJS/markdownit-loader
// https://github.com/markdown-it/markdown-it
const path = require('path')

module.exports = function nuxtMarkdownit (options) {
  const _options = Object.assign({}, options, this.options.markdownit)

  const markDownItLoader = {
    loader: '@nuxtjs/markdownit-loader',
    options: _options
  }

  this.extendBuild((config) => {
    config.module.rules.push({
      test: /\.md$/,
      oneOf: [
        {
          resourceQuery: /^\?vue/,
          use: [markDownItLoader]
        },
        {
          use: ['raw-loader', markDownItLoader]
        }
      ]
    })
  })

  if (_options.injected === true) {
    delete _options.injected
    // Register plugin
    this.addPlugin({
      src: path.resolve(__dirname, 'plugin.js'),
      fileName: 'markdown-it.js',
      options: Object.assign({}, _options)
    })
  }
}

module.exports.meta = require('../package.json')
