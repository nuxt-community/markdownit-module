<template>
  <div>
    <nav>
      <NLink v-for="page in links" :key="page" :to="'/' +page">
        ({{ page }})
      </NLink>
    </nav>
    <main>
      <nuxt />
    </main>
  </div>
</template>

<script>
export default {
  computed: {
    links: () => [
      '$md',
      'import',
      'template'
    ]
  }
}
</script>
