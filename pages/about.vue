<template>
  <div>
    <section ref="about" class="about">
      <div ref="aboutGroup" class="about__group">
        <div ref="aboutText" class="about__text">
          <rich-text tag="h1" class="text-6xl">About Me</rich-text>
          <rich-text tag="h1" class="text-lg dot">.</rich-text>
        </div>
        <div class="w-100 lg:mt-20">
          <div
            class="flex justify-between items-center flex-col lg:items-start lg:flex-row"
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
                  Hi there! I’m Mo, a recent graduate from the
                  <b>University of Saskatchewan</b> and an enthusiastic ML
                  Engineer at
                  <b
                    ><a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="https://rbcborealis.com/"
                      >RBC Borealis AI</a
                    ></b
                  >, where I get to blend my passion for Generative AI, Machine
                  Learning, and cutting-edge technology into meaningful solutions.
                  From building distributed systems to experimenting with the
                  latest in AI research, I’m constantly chasing innovation to make
                  a real-world impact.
                </p>

                <p>
                  With a strong foundation in <b>Python</b>, <b>TensorFlow</b>,
                  <b>PyTorch</b>, <b>React</b>, and <b>TypeScript</b>, I thrive
                  at the intersection of <b>engineering</b> and
                  <b>creativity</b>. Whether it’s crafting robust machine
                  learning models or building intuitive full-stack applications,
                  I love diving into challenging projects that push boundaries.
                </p>

                <p>
                  Beyond the code, you’ll often find me brainstorming ways to
                  enhance <b>Generative AI workflows</b> or experimenting with
                  <b>new tools and frameworks</b>
                  to bring ideas to life. I’m also a strong believer in
                  collaboration and enjoy connecting with like-minded folks who
                  share a love for tech, learning, and innovation.
                </p>
                <p>
                  ☕ When I’m not coding or exploring the latest ML frameworks,
                  you can find me discovering new coffee shops, brainstorming at
                  hackathons, or tinkering with side projects for fun. Thanks
                  for dropping by my portfolio—feel free to reach out if you’d
                  like to chat about AI, web dev, or the next great coffee spot!
                </p>

                <p>
                  I’d love to connect, collaborate, and create! Let’s build
                  something amazing together. 🚀
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
    display: none;
    @media screen and (min-width: 1024px) {
      @include flex(baseline, flex-start, row);
    }
  }
}

.profile {
  padding-left: rem(20px);
  &__wrapper {
    @include size(100%, 100%);
    background-color: var(--shadow);
    border-radius: $border-radius;
    @include size(rem(200px), rem(200px));
    @media screen and (min-width: 1024px) {
      @include size(rem(260px), rem(260px));
    }
    &--round {
      border-radius: 50%;
    }
  }
  &__img {
    @include size(rem(190px), rem(190px));
    border-radius: 50%;
    border: rem(10px) solid var(--secondary);
    box-shadow: 0 0 0 rem(2px) var(--stroke);
    @media screen and (min-width: 1024px) {
      @include size(rem(250px), rem(250px));
    }
  }
  &__about {
    @include size(100%, auto);
    @media screen and (min-width: 1024px) {
      @include size(65%, auto);
    }
  }
  &__links {
    @include flex(center, space-around);
    @include size(100%, 100%);
    margin-top: rem(20px);
    margin-right: rem(0px);
    padding: 0.2rem 0 0.2rem 0;
    background-color: var(--transparentBg);
    border-radius: $border-radius;
    border: double 6px transparent;
    background-image: linear-gradient(
      var(--transparentBg),
      var(--transparentBg)
    );

    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E")
      1;
  }

  &__a {
    @include flex(center, center);
  }
  &__link {
    margin: rem(10px) 0;
  }
  &__svg {
    @include size(rem(32px), rem(32px));
    color: var(--secondary);
    stroke: var(--stroke);
    stroke-width: 10;
    transition: color 0.15s ease-in-out;
    &:hover {
      color: var(--primary-light);
    }
  }
}
</style>
