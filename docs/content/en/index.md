---
title: 'Documentation'
description: 'Markdown parser done right. Fast and easy to extend.'
category: 'Home'
---

<img src="/preview.png" class="light-img" width="1280" height="640" alt=""/>
<img src="/preview-dark.png" class="dark-img" width="1280" height="640" alt=""/>

[Mardownit Module]() for [NuxtJS](https://nuxtjs.org).

## Setup

<alert type="info">

  Markdownit module is available for `nuxt >= 2+`

</alert>

Add `@nuxtjs/markdownit` dependency to your project:

<code-group>
  <code-block label="Yarn" active>

  ```bash
  yarn add --dev @nuxtjs/markdownit
  ```

  </code-block>
  <code-block label="NPM">

  ```bash
  npm install --save-dev @nuxtjs/markdownit
  ```

  </code-block>
</code-group>

Then, add `@nuxtjs/markdownit` to the `modules` section of your `nuxt.config.js`

```js{}[nuxt.config.js]
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
    use: []
  }
}
```


## Usage

### Using `.vue` files

<alert type="info">

  You can also write Vue logic inside `template lang="md"` !

</alert>

```html {hello.vue}
<template lang="md">
  # Hello World!

  Current route is: {{ $route.path }}
</template>
```

### Using `.md` files

```md {hello.md}
# Hello World!!
```

```html {hello.vue}
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

```js {nuxt.config.js}
{
  modules: [
    '@nuxtjs/markdownit'
  ],
  markdownit: {
    injected: true
  }
}
```

```html {hello.vue}
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

## Contributing

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start example in development server using `yarn dev` or `npm run dev`
4. Before to push, execute `yarn test` or `npm test`

## License

[MIT License]()

Copyright (c) NuxtJS Team