<template>
  <div class="button-container">
    <NuxtLink
      class="button"
      :to="buttonLink"
    >
      {{ buttonText }}
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BaseButton',
  props: {
    buttonText: {
      required: true,
      type: String,
    },
    buttonLink: {
      required: true,
      type: String,
    },
  },
})
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
@use 'sass:color' as color;
.button-container {
  @include size(max-content, max-content);
  position: relative;
  margin: rem(10px);
  border-radius: $border-radius;
  background-color: var(--primary);
  transition: background-color 0.15s linear;
  &--round {
    margin: rem(7px);
    border-radius: rem(50px);
  }
}
.button {
  @include flex(center, center);
  position: relative;
  border: $border;
  border-radius: inherit;
  padding: rem(10px) rem(21px);
  color: var(--primary-dark);
  background-color: var(--tertiary);
  font-size: rem(16px);
  font-family: var(--font-family-secondary);
  font-weight: 700;
  text-decoration: none;
  will-change: transform;
  transform: translate3d(rem(-10px), rem(-10px), 0);
  transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    background-color 0.15s linear;
  -webkit-tap-highlight-color: transparent;
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: translate3d(rem(-3px), rem(-3px), 0);
      cursor: pointer;
    }
    &:active {
      transform: translate3d(0, 0, 0);
    }
  }
}
.dark-scheme {
  .button-container {
    background-color: var(--stroke);
  }
}
</style>
