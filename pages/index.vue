<template>
  <div>

    <TheHeader />

    <section ref="hero" class="hero">
      <!-- <SvgCorner class="hero__corner" /> -->
      <div ref="heroGroup" class="hero__group">
        
        <MyRichText  :text="blok.text" />
        <MyButtonList
          ref="heroButtons"
          class="hero__buttons"
          :buttons="blok.buttonList[0].buttons"
        />
      </div>
      <MyHeroFigure ref="heroFigure" class="hero__figure" />
    </section>

    

  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

})
</script>
<style scoped lang="scss">
  @use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.hero {
  @include flex(flex-start, space-between, column);
  @include size(100%, 100%);
  position: relative;
  margin-top: auto;
  color: var(--primary);
  visibility: hidden;
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &__group {
    visibility: hidden;
    padding: 0 rem(25px);
    position: relative;
    @media screen and (min-width: 1024px) {
      @include flex(flex-start, space-between, column);
      @include size(100%, auto);
      padding: auto;
    }
  }
  &__points {
    display: none;
    @media screen and (min-width: 1024px) {
      @include size(100%, 100%);
      @include absolute(-60px, auto, auto, -55px);
      display: block;
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
    }
  }
  &__text {
    position: relative;
    z-index: 1;
  }
  &__buttons {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
      margin-top: 40px;
      visibility: hidden;
    }
  }
  &__figure {
    @include size(100%, 100%);
    z-index: 1;
    visibility: hidden;
    margin-bottom: auto;
  }
  &__corner {
    display: none;
    @media screen and (min-width: 1024px) {
      display: block;
      @include size(100%, 100%);
      @include absolute(20px, 20px, auto, auto);
      max-height: rem(100px);
      max-width: rem(100px);
      color: var(--tertiary);
      z-index: 0;
    }
  }
}

</style>
