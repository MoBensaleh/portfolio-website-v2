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
          <rich-text tag="p" class="text-lg hero__typing"
            >I'm a
            <span ref="typingWrap" class="typing-wrap">
              <b ref="title" class="typing-text font-w500"></b>
              <span ref="cursor" class="typing-cursor dot">_</span>
            </span>
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
      cursorUpdater: null as (() => void) | null,
    }
  },
  mounted() {
    this.animateHero()

    const titleRef = this.$refs.title as HTMLElement | undefined
    const cursor = this.$refs.cursor as HTMLElement | undefined
    const typingWrap = this.$refs.typingWrap as HTMLElement | undefined
    if (!titleRef || !cursor || !typingWrap) return
    const masterTl = gsap.timeline({ repeat: -1 })

    gsap.to(cursor, { opacity: 0, ease: 'power2.inOut', repeat: -1 })

    const maxChars = Math.max(
      ...this.about.roles.map((role) => role.length),
      8
    )
    typingWrap.style.setProperty('--typing-max', `${maxChars}ch`)

    const updateCursor = () => {
      const width = titleRef.getBoundingClientRect().width
      typingWrap.style.setProperty('--cursor-x', `${Math.ceil(width) + 2}px`)
    }

    updateCursor()
    this.cursorUpdater = updateCursor
    window.addEventListener('resize', updateCursor)

    this.about.roles.forEach((word) => {
      const tl = gsap.timeline({ repeat: 1, yoyo: true, repeatDelay: 1 })
      tl.to(titleRef, {
        duration: 1,
        text: word,
        onUpdate: updateCursor,
        onComplete: updateCursor,
      })
      masterTl.add(tl)
    })
  },
  beforeUnmount() {
    if (this.cursorUpdater) {
      window.removeEventListener('resize', this.cursorUpdater)
    }
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
  --portrait-size: min(84vw, 44svh, 320px);
  margin-top: rem(6px);
  margin-left: auto;
  margin-right: auto;
  align-self: center;
  @media screen and (min-width: 1024px) {
    --portrait-size: min(42vw, 70vh, 560px);
    margin-top: 0;
  }
}
.hero__typing {
  min-height: 1.6em;
  max-width: 100%;
  line-height: 1.6;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: center;
  gap: rem(6px);
  @media screen and (min-width: 1024px) {
    justify-content: flex-start;
  }
}
.typing-wrap {
  --cursor-x: 0px;
  --typing-max: 18ch;
  display: inline-flex;
  align-items: baseline;
  position: relative;
  width: min(var(--typing-max), 100%);
  max-width: 100%;
}
.typing-text {
  display: inline-block;
  white-space: nowrap;
}
.typing-cursor {
  position: absolute;
  left: var(--cursor-x);
  top: 0;
}
.hero {
  transform: translateY(0) !important;
  @include flex(center, center, column);
  @include size(100%, auto);
  margin-top: auto;
  color: var(--primary);
  visibility: hidden;
  position: relative;
  max-width: $max-width;
  padding: clamp(#{rem(12px)}, 2.6vh, #{rem(24px)}) rem(16px)
    calc(#{$nav-height} + clamp(#{rem(10px)}, 3vh, #{rem(24px)}));
  min-height: 100svh;
  gap: rem(16px);
  @media screen and (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    @include size(100%, 100%);
    padding: 0;
    position: fixed;
    top: 0 !important;
    bottom: 0 !important;
  }
  &__group {
    visibility: hidden;
    padding: 0;
    position: relative;
    width: 100%;
    max-width: rem(520px);
    @media screen and (min-width: 1024px) {
      @include size(100%, auto);
      padding: 0;
      max-width: none;
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
    margin-top: rem(20px);
    text-align: center;
    align-items: center;
    @media screen and (min-width: 1024px) {
      margin-top: 0;
      text-align: left;
      align-items: flex-start;
    }
  }
  &__buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(12px);
    width: 100%;
    margin-top: rem(12px);
    :deep(.button-container) {
      width: 100%;
      max-width: rem(320px);
    }
    :deep(.button) {
      width: 100%;
    }
    @media screen and (min-width: 1024px) {
      flex-direction: row;
      align-items: flex-start;
      width: auto;
      margin-top: rem(36px);
      :deep(.button-container) {
        width: auto;
        max-width: none;
      }
      :deep(.button) {
        width: auto;
      }
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

@media (max-width: 640px) {
  .hero :deep(.text-6xl) {
    font-size: clamp(2.1rem, 8.8vw, 3.1rem);
    line-height: 1.1;
  }
  .hero__text {
    margin-top: rem(10px);
  }
}

@media (max-width: 420px) {
  .hero {
    padding-top: rem(10px);
    gap: rem(16px);
  }
  .hero :deep(.text-6xl) {
    font-size: clamp(2rem, 9.5vw, 2.8rem);
  }
  .hero__buttons {
    margin-top: rem(8px);
  }
}

@media (max-height: 700px) {
  .hero {
    padding-bottom: calc(#{$nav-height} + #{rem(10px)});
    gap: rem(12px);
  }
  .hero__text {
    margin-top: 0;
  }
  .hero__buttons {
    margin-top: rem(6px);
  }
  .wave {
    width: 32px;
  }
  .profile-particle {
    --portrait-size: min(78vw, 34svh, 240px);
    margin-top: rem(4px);
  }
}

@media (max-width: 420px) {
  .profile-particle {
    --portrait-size: min(80vw, 36svh, 240px);
  }
}
</style>
