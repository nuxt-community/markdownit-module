<template>
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
