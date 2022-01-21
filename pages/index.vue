<template>
  <div class="flex justify-center">
    <TheHeader />
    <section ref="hero" class="hero">
      <div ref="heroGroup" class="hero__group">
        <div ref="heroText" class="hero__text" >
          <div class="flex row items-center">
            <rich-text tag="h1" class="text-6xl mr-3">Hi</rich-text>
            <span class="wave"><img src="images/Hand.gif"></span>
            <rich-text tag="h1" class="text-6xl">,</rich-text>
          </div>
          <div class="flex row items-baseline">
            <rich-text tag="h1" class="text-6xl">I'm {{about.firstName}}</rich-text>
            <rich-text tag="h1" class="text-lg dot">.</rich-text>
          </div>
          <rich-text tag="p" class="text-lg ">I'm a  <h6  ref="title" class="inline"></h6><span ref="cursor" class="dot ">_</span></rich-text>
        </div>
        <div class="inline-flex mt-9 hero__buttons">
          <base-button :button-text="'Discover my projects'" :button-link="'/projects'"></base-button>
          <base-button :button-text="'Who am I?'" :button-link="'/about'"></base-button>
        </div>
      </div>
      <img id="profile_pic" src="images/Mohamed.png" ref="profilePic" alt="Mohamed"/>
    </section>
  </div>
</template>

<script lang="ts" >
import Vue from 'vue'
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import RichText from '~/components/RichText.vue'
import { About } from '@/types/pages'
import { about } from '@/data/about'
import BaseButton from '~/components/BaseButton.vue';

if (process.client) {
  gsap.registerPlugin(TextPlugin);
}


export default Vue.extend({
  components: { RichText, BaseButton },

  data(){
    return{
      about: about as About,
    }
  },
   mounted() {
    this.animateHero();

    const titleRef = this.$refs.title as Element;
    const cursor = this.$refs.cursor as Element;
    const masterTl = gsap.timeline({repeat: -1})

    gsap.to(cursor, {opacity:0, ease: "power2.inOut", repeat:-1})

    this.about.roles.forEach(word => {
      const tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay:1})
      tl.to(titleRef, {duration: 1, text: word})
      masterTl.add(tl)
    })
  },
  methods: {
    animateHero(): void {

      const hero = this.$refs.hero as Element;
      const heroGroup = this.$refs.heroGroup as Element;
      const heroText = this.$refs.heroText as Element;
      const profilePic = this.$refs.profilePic as Element
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
      tl.from(
        profilePic,
        {
          autoAlpha: 0,
          duration: 1,
        },
        '<'
      );
      tl.from(
        profilePic.querySelectorAll('image'),
        {
          opacity: 0,
          clearProps: 'all',
          duration: 0.75,
          stagger: {
            amount: 0.25,
          },
        },
        '>-=0.5'
      );
    
    },

    textAnimation(elem: Element, text: string): gsap.core.Tween {
      return gsap.to(elem, {
        id: 'textAnimation',
        duration: text.length / 16,
        text: {
          value: text,
        },
        ease: 'none',
      });
    },
  },

})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

#profile_pic{
    visibility: hidden;
    width:220px;
    @include flex(center, center, row);
    filter: url(#dropshadow);
    transition: filter 0.15s linear;
    border:10px solid var(--primary);
    border-radius: $border-radius;
    background: rgba(251, 249, 243, 0.06);
    min-height: 3em;
    resize: both;
    object-fit: cover;
    margin-top: rem(35px);
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
</style>
