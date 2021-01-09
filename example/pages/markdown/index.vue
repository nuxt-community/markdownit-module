<template>
  <div v-html="hello" />
</template>

<script>
import hello from './hello.md'

export default {
  computed: {
    hello() {
      return hello
    }
  }
}
</script>
