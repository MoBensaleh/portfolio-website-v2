<template>
  <div>
    <section ref="about" class="about">
      <div ref="aboutGroup" class="about__group">
        <div ref="aboutText" class="about__text">
          <rich-text tag="h1" class="text-6xl">About Me</rich-text>
          <rich-text tag="h1" class="text-lg dot">.</rich-text>
        </div>
        <div class="about__meta">
          <span class="about__pill">Based in {{ about.city }}, {{ about.province }}, {{ about.country }}</span>
          <span class="about__pill">{{ about.roles[0] }}</span>
        </div>
        <div class="w-100 lg:mt-20 about__content">
          <div
            class="flex justify-between items-center flex-col lg:items-center lg:flex-row"
          >
            <div>
              <div
                ref="profileImg"
                class="profile__wrapper profile__wrapper--round"
              >
                <img
                  :src="about.myImage"
                  class="profile__img"
                  alt="Profile photo"
                  border-radius="50%"
                />
              </div>
              <div class="flex justify-center">
                <ul ref="profileLinks" class="profile__links">
                  <li
                    v-for="link in links"
                    :key="link.icon"
                    class="profile__link"
                  >
                    <a
                      class="profile__a"
                      :href="link.href"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg class="profile__svg">
                        <use :href="iconPath(link.icon)" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              ref="bio"
              class="text-sm profile__about mt-10 pb-10 lg:mt-0 lg:pb-0"
            >
              <rich-text tag="div" class="text-lg">
                <p>
                  Hi, I’m Mo—a machine learning engineer who builds
                  production‑ready AI systems and the software around them.
                  Based in Calgary. If you want to collaborate or just say hi,
                  I’m always open to a conversation.
                </p>
              </rich-text>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'
import spriteUrl from '@/assets/sprite.svg?url'
import RichText from '~/components/RichText.vue'
import { about } from '@/data/about'
import type { About } from '@/types/pages'
import { links } from '@/data/navigation'
import type { SocialMedia } from '@/types/links'

export default defineComponent({
  name: 'About',
  components: {
    RichText,
  },
  data() {
    return {
      about: about as About,
      links: links as SocialMedia[],
    }
  },
  mounted() {
    this.animateFading(1)
    this.animateHero()
  },

  methods: {
    iconPath(icon: string): string {
      return `${spriteUrl}#${icon}`
    },
    animateFading(delay: number) {
      const profileImg = this.$refs.profileImg as HTMLElement | undefined
      const profileLinks = this.$refs.profileLinks as HTMLElement | undefined
      if (!profileImg || !profileLinks) return
      gsap.set(profileImg, {
        autoAlpha: 0,
      })
      gsap.set(profileLinks, {
        autoAlpha: 0,
      })
      gsap.to(profileImg, {
        autoAlpha: 1,
        duration: 1,
        delay,
      })
      gsap.to(profileLinks, {
        autoAlpha: 1,
        duration: 1,
        delay,
      })
    },

    animateHero(): void {
      if (!import.meta.client) return
      const aboutText = this.$refs.aboutText as HTMLElement | undefined
      const aboutGroup = this.$refs.aboutGroup as HTMLElement | undefined
      const bio = this.$refs.bio as HTMLElement | undefined
      const bioParagraphs = bio?.querySelectorAll('p')
      if (!aboutText || !aboutGroup || !bio || !bioParagraphs?.length) return
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      })

      tl.set(aboutText.querySelectorAll('h1'), {
        opacity: 0,
        yPercent: 50,
      })

      tl.set(bioParagraphs, {
        opacity: 0,
        yPercent: 20,
      })

      tl.from(
        aboutGroup,
        {
          autoAlpha: 0,
        },
        '0'
      )

      tl.to(aboutText.querySelectorAll('h1'), {
        opacity: 1,
        yPercent: 0,
      })
      tl.to(bioParagraphs, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.08,
        duration: 0.45,
        ease: 'power2.out',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.about {
  @include size(100%, auto);
  color: var(--primary);
  max-width: $max-width;
  margin-right: auto;
  margin-left: auto;
  padding: 0 rem(25px) rem($nav-height);

  &__text {
    @include flex(baseline, center, row);
    gap: rem(6px);
    text-align: center;
    @media screen and (min-width: 1024px) {
      @include flex(baseline, flex-start, row);
      text-align: left;
    }
  }
  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: rem(10px);
    margin: rem(16px) 0 rem(24px);
    justify-content: center;
    @media screen and (min-width: 1024px) {
      margin-top: rem(8px);
      justify-content: flex-start;
    }
  }
  &__pill {
    font-size: rem(12px);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: rem(6px) rem(12px);
    border-radius: 999px;
    color: var(--primary);
    background: rgba(255, 255, 255, 0.06);
    border: rem(1px) solid rgba(255, 255, 255, 0.08);
  }
  &__content {
    margin-top: rem(16px);
    @media screen and (min-width: 1024px) {
      margin-top: rem(32px);
    }
  }
}

.profile {
  padding-left: rem(20px);
  &__wrapper {
    @include size(100%, 100%);
    background-color: var(--shadow);
    border-radius: $border-radius;
    --profile-size: clamp(180px, 48vw, 220px);
    width: var(--profile-size);
    height: var(--profile-size);
    @media screen and (min-width: 1024px) {
      --profile-size: 260px;
    }
    &--round {
      border-radius: 50%;
    }
  }
  &__img {
    width: calc(var(--profile-size) - #{rem(10px)});
    height: calc(var(--profile-size) - #{rem(10px)});
    border-radius: 50%;
    border: rem(10px) solid var(--secondary);
    box-shadow: 0 0 0 rem(2px) var(--stroke);
    @media screen and (min-width: 1024px) {
      width: 250px;
      height: 250px;
    }
  }
  &__about {
    @include size(100%, auto);
    max-width: rem(560px);
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    @media screen and (min-width: 1024px) {
      @include size(65%, auto);
      max-width: none;
      margin-left: 0;
      margin-right: 0;
      text-align: left;
    }
  }
  &__links {
    @include flex(center, space-around);
    @include size(100%, 100%);
    margin-top: rem(20px);
    margin-right: rem(0px);
    max-width: min(90vw, 320px);
    margin-left: auto;
    margin-right: auto;
    padding: rem(8px) rem(14px);
    background-color: rgba(255, 255, 255, 0.04);
    border-radius: 999px;
    position: relative;
    overflow: hidden;
    border: rem(1px) solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
    isolation: isolate;
    background: rgba(12, 24, 44, 0.7);
    backdrop-filter: blur(10px);
    animation: glowPulse 10s ease-in-out infinite;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: rem(1px);
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 0.1),
        rgba(197, 198, 199, 0.25),
        rgba(255, 255, 255, 0.1)
      );
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0.8;
    }
    &::after {
      content: '';
      position: absolute;
      inset: 1px;
      border-radius: inherit;
      pointer-events: none;
      z-index: 0;
      background: linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0.16) 45%,
        rgba(255, 255, 255, 0) 70%
      );
      background: repeating-linear-gradient(
        120deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(255, 255, 255, 0) 38%,
        rgba(255, 255, 255, 0.16) 50%,
        rgba(255, 255, 255, 0) 64%,
        rgba(255, 255, 255, 0) 100%
      );
      background-size: 240% 100%;
      background-position: 0 0;
      animation: sheen 18s linear infinite;
      opacity: 0.7;
      filter: blur(0.6px);
      will-change: background-position;
    }
  }

  &__a {
    @include flex(center, center);
    @include size(rem(44px), rem(44px));
    border-radius: 999px;
    border: rem(1px) solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.04);
    box-shadow: inset 0 0 0 rem(1px) rgba(255, 255, 255, 0.04);
    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
    position: relative;
    z-index: 1;
    &:hover {
      transform: translateY(rem(-2px)) scale(1.03);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      background: rgba(255, 255, 255, 0.08);
    }
  }
  &__link {
    margin: rem(10px) 0;
    position: relative;
    z-index: 1;
    animation: float 7s ease-in-out infinite;
    &:nth-child(2) {
      animation-delay: 0.6s;
    }
    &:nth-child(3) {
      animation-delay: 1.2s;
    }
  }
  &__svg {
    @include size(rem(28px), rem(28px));
    color: var(--secondary);
    stroke: var(--stroke);
    stroke-width: 10;
    transition: color 0.2s ease, transform 0.2s ease;
    &:hover {
      color: var(--primary-light);
    }
  }

}

@keyframes glowPulse {
  0%,
  100% {
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  }
  50% {
    box-shadow: 0 16px 36px rgba(0, 0, 0, 0.28);
  }
}

@keyframes sheen {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 240% 0;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(rem(-3px));
  }
}

@media (prefers-reduced-motion: reduce) {
  .profile__links {
    animation: none;
  }
  .profile__links::before {
    animation: none;
  }
  .profile__links::after {
    animation: none;
  }
  .profile__link {
    animation: none;
  }
}
</style>
