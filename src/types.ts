import type { } from '@nuxt/types'
import type MarkdownIt from 'markdown-it'

declare module '@nuxt/types' {
  interface Context {
    $md: MarkdownIt
  }
  interface NuxtAppOptions {
    $md: MarkdownIt
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $md: MarkdownIt
  }
}

declare module 'vuex/types/index' {
  // eslint-disable-next-line
  interface Store<S> {
    $md: MarkdownIt
  }
}
