<template>
  <div class="flex justify-center">
    <TheHeader />
    <section ref="hero" class="hero">
      <div ref="heroGroup" class="hero__group">
        <div ref="heroText" class="hero__text" >
          <div class="flex row items-center">
            <rich-text tag="h1" class="text-6xl mr-3">Hi</rich-text>
            <span class="wave"><img src="@/assets/images/Hand.gif"></span>
            <rich-text tag="h1" class="text-6xl">,</rich-text>
          </div>
          <div class="flex row">
            <rich-text tag="h1" class="text-6xl">I'm {{about.firstName}}</rich-text>
            <rich-text tag="p" class="text-lg dot">.</rich-text>
          </div>
          <rich-text tag="p" class="text-lg ">I'm a  </rich-text>

        </div>
        <div class="inline-flex mt-9 hero__buttons">
          <base-button :button-text="'Discover my projects'" :button-link="'/projects'"></base-button>
          <base-button :button-text="'Who am I?'" :button-link="'/about'"></base-button>
        </div>
      </div>
      <img id="profile_pic" src="@/assets/images/Mohamed.png" alt="Mohamed"/>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';
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

#profile_pic{
    width:200px;
    @include flex(center, center, row);
    filter: url(#dropshadow);
    transition: filter 0.15s linear;
    border:10px solid black;
    border-radius: $border-radius;
    background: rgba(251, 249, 243, 0.06);
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1;
    min-height: 3em;
    resize: both;
    object-fit: cover;
    margin-top: rem(25px);
    @media screen and (min-width: 1024px) {
      width: 280px;
    }
}
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
  transform: translateY(0) !important;
  @include flex(center, center, column);
  @include size(100%, 100%);
  margin-top: auto;
  color: var(--primary);
  visibility: hidden;
  position: fixed;
  max-width: $max-width;
  top: 0 !important;
  bottom: 49px !important; 
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    bottom: 0 !important; 
  }
  &__group {
    visibility: hidden;
    padding: 0 rem(30px);
    position: relative;
    @media screen and (min-width: 1024px) {
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
    @include flex(start, start, column);
    z-index: 1;
  }
  &__buttons {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
      // margin-top: 40px;
      // visibility: hidden;
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
// @keyframes float {
//   from {
//     transform: translate3d(rem(-2px), rem(-5px), rem(-10px));
//   }
//   to {
//     transform: translate3d(0, 0, 0);
//   }
// }



</style>
