module.exports = {
  modules: ['@nuxtjs/markdownit'],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it for additionnals options
  markdownit: {
    injected: true,
    preset: 'default',
    linkify: true,
    breaks: true,
    use: []
  }
}
