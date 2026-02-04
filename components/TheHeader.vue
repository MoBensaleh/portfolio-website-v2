<template>
  <header class="header flex justify-end lg:justify-between">
    <nav ref="nav" class="header__nav">
      <div
        v-for="link in navigation"
        :key="link.icon"
        :class="[
          'header__link-wrapper',
          { 'header__link-wrapper--active': isActive(link.to) },
        ]"
      >
        <div v-if="link.text === 'Contact'">
          <a :href="link.to">
            <div class="link__icon-wrapper">
              <svg class="link__icon">
                <use :href="iconPath(link.icon)" />
              </svg>
            </div>
            <span class="link__text">{{ link.text }}</span>
          </a>
        </div>
        <NuxtLink v-else class="header__link link" :to="link.to">
          <div class="link__icon-wrapper">
            <svg class="link__icon">
              <use :href="iconPath(link.icon)" />
            </svg>
          </div>
          <span class="link__text">{{ link.text }}</span>
        </NuxtLink>
      </div>
    </nav>
    <button-dark-mode class="header__toggle" />
  </header>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'
import spriteUrl from '@/assets/sprite.svg?url'
import { navigation } from '@/data/navigation'
import type { NavigationItem } from '@/types/links'

export default defineComponent({
  data() {
    return {
      navigation: navigation as NavigationItem[],
    }
  },
  mounted() {
    this.animateHeader()
  },
  methods: {
    iconPath(icon: string): string {
      return `${spriteUrl}#${icon}`
    },
    isActive(link: string): boolean {
      return this.$route.path === link
    },
    animateNav(
      nav: Element,
      yPercent: number,
      duration: number,
      delay: number
    ): void {
      gsap.set(nav, {
        autoAlpha: 0,
        yPercent,
      })
      gsap.to(nav, {
        autoAlpha: 1,
        yPercent: 0,
        ease: 'ease.in',
        duration,
        delay,
      })
    },
    animateLinkIcons(
      linkIcons: NodeListOf<Element>,
      yPercent: number,
      duration: number,
      delay: number
    ): void {
      gsap.set(linkIcons, {
        autoAlpha: 0,
        yPercent,
      })
      gsap.to(linkIcons, {
        autoAlpha: 1,
        yPercent: 0,
        ease: 'elastic',
        delay,
        duration,
        stagger: {
          amount: 0.5,
        },
      })
    },
    animateHeader(): void {
      const nav = this.$refs.nav as HTMLElement | undefined
      const linkIcons = nav?.querySelectorAll('.link__icon')
      if (!nav || !linkIcons) return
      if (window.innerWidth < 1024) {
        this.animateNav(nav, 100, 0.5, 2)
        this.animateLinkIcons(linkIcons, 50, 1, 2.5)
      } else {
        this.animateNav(nav, 0, 0, 0)
        this.animateLinkIcons(linkIcons, -50, 1, 0)
      }
    },
  },
})
</script>

<style scoped lang="scss">
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

a{
  padding: 0;
  @include flex(center, center, column);
  font-size: rem(12px);
  @media screen and (min-width: 1024px) {
    font-size: rem(16px);
  }
}
.header {
  @include size(100%, auto);
  max-width: $max-width;
  position: relative;
  margin-left: auto;
  margin-right: auto;
  padding: rem(10px);
  font-family: var(--font-family-secondary);
  z-index: 2;
  @media screen and (max-width: 1023px) {
    height: 0;
    padding: 0;
  }
  &__nav {
    @include fixed(auto, 0, 0, 0);
    @include size(100%, #{rem($nav-height)});
    @include flex(center, space-around);
    border-top: $border;
    background-color: var(--tertiary);
    transition: background-color 0.15s ease-in-out;
    visibility: hidden;
    @media screen and (min-width: 1024px) {
      position: unset;
      flex-basis: 35%;
      justify-content: space-between;
      margin-top: 16px;
      border-top: none;
      padding-left: 10px;
      background-color: transparent;
      transition: none;
    }
  }
  &__link {
    @include flex(center, space-between);
    position: relative;
    @media screen and (min-width: 1024px) {
      position: unset;
      justify-content: space-between;
      border-top: none;
      background-color: transparent;
    }
  }
  &__link-wrapper {
    @media screen and (min-width: 1024px) {
      &:hover {
        .link__text {
          transform: scale3d(1, 1, 1);
        }
      }
    }
    &--active {
      .link__icon {
        fill: var(--primary-light);
        animation: bounce 0.85s cubic-bezier(0.28, 0.84, 0.42, 1);
        @media screen and (min-width: 1024px) {
          fill: var(--tertiary);
        }
      }
      .link__text::after {
        content: '';
        transform: translate3d(0, 0, 0);
        background-color: var(--tertiary);
      }
    }
  }
  &__settings {
    @include size(100%, auto);
    @include flex(center, space-between);
  }
  &__toggle {
    margin-right: rem(28px);
    @media screen and (max-width: 1023px) {
      position: fixed;
      top: max(#{rem(12px)}, env(safe-area-inset-top));
      right: max(#{rem(12px)}, env(safe-area-inset-right));
      margin-right: 0;
      z-index: 3;
      @include size(rem(40px), rem(40px));
      @include flex(center, center);
    }
  }
  &__lang {
    @include size(100%, auto);
    @include flex(center, flex-start);
    margin-right: 20px;
    padding-left: 15px;
    @media screen and (min-width: 1024px) {
      @include flex(center, flex-end);
    }
    .link {
      font-size: rem(16px);
      font-weight: 700;
    }
    .link.nuxt-link-active {
      text-decoration: underline;
      text-decoration-color: var(--secondary);
      text-decoration-skip-ink: none;
      text-decoration-thickness: rem(2px);
      text-underline-offset: rem(5px);
    }
  }
  &__separator {
    color: var(--tertiary);
    font-weight: 700;
    margin: 0 10px;
  }
}
.link {
  @include flex(center, center, column);
  color: var(--primary);
  font-size: rem(12px);
  font-weight: 700;
  text-decoration: none;
  text-transform: capitalize;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s linear;
  @media screen and (min-width: 1024px) {
    font-size: rem(16px);
  }
  &__icon-wrapper {
    @include size(rem(20px), rem(20px));
    @include flex(center, center);
    @media screen and (min-width: 1024px) {
      @include size(rem(28px), rem(28px));
      fill: var(--background);
      color: var(--primary);
    }
  }
  &__icon {
    @include size(rem(18px), rem(18px));
    color: var(--stroke);
    fill: var(--tertiary);
    transform: translateZ(0);
    transform-origin: center center;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    z-index: 2;
    visibility: hidden;
    transition: fill 0.15s ease-in-out, color 0.15s ease-in-out;
    @media screen and (min-width: 1024px) {
      @include size(rem(30px), rem(30px));
      fill: var(--background);
      color: var(--primary);
    }
  }
  &__text {
    color: var(--primary-dark);
    @media screen and (min-width: 1024px) {
      @include flex(center, center, column);
      color: var(--primary);
      transform: scale3d(0, 0, 0);
      will-change: transform;
      transform-origin: center center;
      backface-visibility: hidden;
      -webkit-font-smoothing: subpixel-antialiased;
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
}
@keyframes bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(1.1, 0.9) translateY(0);
  }
  30% {
    transform: scale(0.9, 1.1) translateY(-5px);
  }
  50% {
    transform: scale(1.05, 0.95) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(-2px);
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
</style>
