<template>
  <div>

    <TheHeader />
    
    <section ref="hero" class="hero">
      <div ref="heroGroup" class="hero__group">
        <div ref="heroText" class="hero__text" >
          <div class="flex row items-baseline">
            <rich-text tag="h1" class="text-6xl mr-3">Hi</rich-text>
            <span class="wave"><img src="@/assets/images/Hand.gif"></span>
            <rich-text tag="h1" class="text-6xl">,</rich-text>
          </div>
          <div class="flex row">
            <rich-text tag="h1" class="text-6xl">I'm {{about.firstName}}</rich-text>
            <rich-text tag="h1" class="text-6xl dot">.</rich-text>
          </div>
        </div>
        <base-button :buttonText="'sddsdsd'"></base-button>
      </div>
    </section>
      


  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from 'gsap';
import RichText from '~/components/RichText.vue'
import { About } from '@/types/pages'
import { about } from '@/data/about'
import BaseButton from '~/components/BaseButton.vue';

export default Vue.extend({
  components: { RichText, BaseButton },

  data(){
    return{
      about: about as About,
    }
  },
   mounted() {
    this.animateHero();
  },
  methods: {
    animateHero(): void {

      const hero = this.$refs.hero as Element;
      const heroGroup = this.$refs.heroGroup as Element;
      const heroText = this.$refs.heroText as Element;
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      });
   
      tl.set(heroText.querySelectorAll('h1'), {
        opacity: 0,
        yPercent: 50,
      });
 
      tl.from(hero, {
        autoAlpha: 0,
      });
      tl.from(
        heroGroup,
        {
          autoAlpha: 0,
        },
        '0'
      );
      tl.to(heroText.querySelectorAll('h1'), {
        opacity: 1,
        yPercent: 0,
      });
    
    },
  },

})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.wave{
  width:40px;
  height: auto;
  position: relative;
  top:3px;
  @media screen and (min-width: 1024px) {
    width: 60px;
  }

}
.hero {
  position: fixed;
  top: 0 !important;
  bottom: 49px !important; 
  transform: translateY(0) !important;
  @include flex(flex-start, center, column);
  @include size(100%, 100%);
  margin-top: auto;
  color: var(--primary);
  visibility: hidden;
  @media screen and (min-width: 1024px) {
    @include flex(center, center, column);
    bottom: 0 !important; 
  }
  &__group {
    visibility: hidden;
    padding: 0 rem(25px);
    position: relative;
    @media screen and (min-width: 1024px) {
      @include flex(center, space-between, column);
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
