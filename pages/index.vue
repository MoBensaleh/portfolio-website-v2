<template>
  <div class="flex justify-center">
    <section ref="hero" class="hero">
      <div ref="heroGroup" class="hero__group">
        <div ref="heroText" class="hero__text">
          <div class="flex row items-center">
            <rich-text tag="h1" class="text-6xl mr-3">Hi</rich-text>
            <span class="wave">
              <img src="/images/Hand.gif" alt="Waving hand" />
            </span>
            <rich-text tag="h1" class="text-6xl">,</rich-text>
          </div>
          <div class="flex row items-baseline">
            <rich-text tag="h1" class="text-6xl"
              >I'm {{ about.firstName }}</rich-text
            >
            <rich-text tag="h1" class="text-lg dot">.</rich-text>
          </div>
          <rich-text tag="p" class="text-lg"
            >I'm a <b ref="title" class="inline font-w500"></b
            ><span ref="cursor" class="dot">_</span>
          </rich-text>
        </div>
        <div class="inline-flex mt-9 hero__buttons">
          <base-button
            button-text="Discover my projects"
            button-link="/projects"
          ></base-button>
          <base-button
            button-text="Who am I?"
            button-link="/about"
          ></base-button>
        </div>
      </div>
      <particle-portrait
        ref="profilePic"
        src="/images/MohamedB.png"
        alt="Mohamed"
        color="var(--primary)"
        :image-scale="0.98"
        :key-tolerance="40"
        :silhouette-alpha="0.28"
        :image-layer-alpha="0.24"
        class="profile-particle"
      />
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'
import RichText from '~/components/RichText.vue'
import type { About } from '@/types/pages'
import { about } from '@/data/about'
import BaseButton from '~/components/BaseButton.vue'
import ParticlePortrait from '~/components/ParticlePortrait.vue'

export default defineComponent({
  components: { RichText, BaseButton, ParticlePortrait },

  data() {
    return {
      about: about as About,
    }
  },
  mounted() {
    this.animateHero()

    const titleRef = this.$refs.title as HTMLElement | undefined
    const cursor = this.$refs.cursor as HTMLElement | undefined
    if (!titleRef || !cursor) return
    const masterTl = gsap.timeline({ repeat: -1 })

    gsap.to(cursor, { opacity: 0, ease: 'power2.inOut', repeat: -1 })

    this.about.roles.forEach((word) => {
      const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
      tl.to(titleRef, { duration: 1, text: word })
      masterTl.add(tl)
    })
  },
  methods: {
    animateHero(): void {
      const hero = this.$refs.hero as HTMLElement | undefined
      const heroGroup = this.$refs.heroGroup as HTMLElement | undefined
      const heroText = this.$refs.heroText as HTMLElement | undefined
      const profilePicRef = this.$refs.profilePic as
        | { el?: HTMLElement; $el?: HTMLElement }
        | HTMLElement
        | undefined
      const profilePic =
        profilePicRef && 'el' in profilePicRef
          ? profilePicRef.el ?? profilePicRef.$el
          : profilePicRef
      const heroTextEls = heroText?.querySelectorAll('h1, p, .wave')
      const heroButtons = heroGroup?.querySelectorAll(
        '.hero__buttons > *'
      ) as NodeListOf<HTMLElement> | null
      if (!hero || !heroGroup || !heroText || !profilePic || !heroTextEls)
        return
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      })

      tl.set([hero, heroGroup], { autoAlpha: 1 })
      tl.set(heroTextEls, { autoAlpha: 0, y: 20 })
      if (heroButtons?.length) {
        tl.set(heroButtons, { autoAlpha: 0, y: 16 })
      }

      tl.from(hero, { autoAlpha: 0, duration: 0.4 })
      tl.from(heroGroup, { autoAlpha: 0, duration: 0.4 }, '<')
      tl.to(heroTextEls, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      })
      if (heroButtons?.length) {
        tl.to(
          heroButtons,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.45,
            ease: 'power2.out',
          },
          '-=0.2'
        )
      }
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.wave {
  width: 40px;
  height: auto;
  position: relative;
  top: 3px;
  @media screen and (min-width: 1024px) {
    width: 60px;
  }
}
.profile-particle {
  margin-top: rem(40px);
  @media screen and (min-width: 1024px) {
    margin-top: 0;
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
    @include flex(flex-start, flex-start, column);
    z-index: 1;
    margin-top: rem(50px);
    @media screen and (min-width: 1024px) {
      margin-top: 0;
    }
  }
  &__buttons {
    display: none;
    @media screen and (min-width: 1024px) {
      display: flex;
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
