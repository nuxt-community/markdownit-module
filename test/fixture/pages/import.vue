<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="hello" />
</template>

<script>
import hello from '~/markdown/hello.md'

export default {
  computed: {
    hello () {
      return hello
    }
  }
}
</script>
