# Markdownit
[![npm](https://img.shields.io/npm/dt/@nuxtjs/markdownit.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/markdownit)
[![npm (scoped with tag)](https://img.shields.io/npm/v/@nuxtjs/markdownit/latest.svg?style=flat-square)](https://npmjs.com/package/@nuxtjs/markdownit)

Using [markdownit-loader](https://github.com/nuxt-community/markdownit-loader) and [markdown-it](https://github.com/markdown-it/markdown-it)

## Setup
- Add `@nuxtjs/markdownit` dependency using yarn or npm to your project
- Add `@nuxtjs/markdownit` to `modules` section of `nuxt.config.js`
```js
{
  modules: [
    '@nuxtjs/markdownit'
  ],

  // [optional] markdownit options
  // See https://github.com/markdown-it/markdown-it
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    use: [
      'markdown-it-div',
      'markdown-it-attrs'
    ]
  }
}
```

## Usage

### Using `.vue` files
**TIP** You can also write Vue logic inside `<template lang="md">`!

`hello.vue`:
```html
<template lang="md">
  # Hello World!

  Current route is: {{ $route.path }}
</template>
```

### Using `.md` files

`hello.md`
```md
# Hello World!!
```

`hello.vue`
```html
<template>
  <div v-html="hello"></div>
</template>

<script>
  import hello from '../hello.md'

  export default {
    computed: {
      hello() {
        return hello
      }
    }
  }
</script>
```

### Using `$md` to render markdown

`nuxt.config.js`:
```js
{
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    runtime: true // Support `$md()`
  }
}
```

`hello.vue`:
```html
<template>
  <div v-html="$md.render(model)"></div>
</template>

<script>
export default {
  data() {
    return {
      model: '# Hello World!'
    }
  }
}
</script>

```

#### Overriding temporarily markdown-ir options

To use specific options "on the fly", you can proceed by altering temporary, the `$md.options` flags.

> Note : usage of $md.render require the usage of `markdownit: { runtime: true }` in `nuxt.config.js`

`hello.vue`:
```html
<template>
  <div v-html="rendered" />
</template>

<script>
export default {
  props: {
    markdown: { type: String, required: true },
    options: { type: Object, default: null },
  },
  computed: {
    rendered() {
      const md = this.$md;
      let backupOptions;
      if (this.options) {
        // Backup initial preset
        backupOptions = Object.assign({}, md.options);
        // Overrides options with props ones
        Object.assign(md.options, this.options);
      }
      // Render
      const rendered = md.render(this.markdown);
      if (this.options) {
        // Restore backuped options
        md.options = backupOptions;
      }
      return rendered;
    },
  },
}
</script>
```
