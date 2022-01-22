<template>
  <div>
    <TheHeader />
    <Nuxt class="main" />
  </div>
</template>
<style lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
html {
  font-family: var(--font-family);
  font-size: 16px;
}
body {
  background-color: var(--background);
  transition: background-color 0.15s linear;
  line-height: 1.75;
}


</style>