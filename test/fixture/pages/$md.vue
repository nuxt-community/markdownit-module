<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="$md.render(model)" />
</template>

<script>
export default {
  data () {
    return {
      model: `
      # Hello World!
      (rendered using \`$md.render(...)\`)
      `
    }
  }
}
</script>
