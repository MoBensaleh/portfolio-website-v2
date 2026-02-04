<template>
  <div>
    <section ref="project" class="projects">
      <div ref="projectGroup" class="project__group">
        <div ref="projectText" class="project__text flex items-baseline">
          <rich-text tag="h1" class="text-6xl">Projects</rich-text>
          <rich-text tag="h1" class="text-lg dot">.</rich-text>
        </div>
        <div
          class="projects__highlights"
          ref="highlights"
          @mouseenter="stopHighlightAutoplay"
          @mouseleave="startHighlightAutoplay"
        >
          <div class="highlights">
            <div class="highlights__viewport">
              <div
                class="highlights__track"
                :style="{ transform: `translateX(-${highlightIndex * 100}%)` }"
              >
                <article
                  v-for="project in highlightProjects"
                  :key="project.title"
                  class="highlights__slide"
                >
                  <div class="highlights__meta">
                    <span class="highlights__eyebrow">Highlights</span>
                    <rich-text tag="h2" class="highlights__title text-3xl">
                      {{ project.title }}
                    </rich-text>
                    <rich-text tag="p" class="highlights__description text-sm">
                      {{ project.description }}
                    </rich-text>
                    <div class="highlights__actions">
                      <a
                        v-if="project.live"
                        :href="project.live"
                        aria-label="Live demo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="currentColor"
                            d="M8 5.5a1 1 0 011.5-.86l8 4.5a1 1 0 010 1.72l-8 4.5A1 1 0 018 14.5v-9z"
                          />
                        </svg>
                      </a>
                      <a
                        v-if="project.website"
                        :href="project.website"
                        aria-label="Project website"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="currentColor"
                            d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.5 9h-3.09a14.9 14.9 0 00-1.5-5.02A8.02 8.02 0 0119.5 11zM12 4c.9 1.2 1.63 2.82 2.03 5H9.97C10.37 6.82 11.1 5.2 12 4zM4.5 13h3.09c.23 1.78.78 3.53 1.5 5.02A8.02 8.02 0 014.5 13zm0-2a8.02 8.02 0 014.59-7.02A14.9 14.9 0 007.59 11H4.5zm7.5 9c-.9-1.2-1.63-2.82-2.03-5h4.06c-.4 2.18-1.13 3.8-2.03 5zm3.91-2.98c.72-1.49 1.27-3.24 1.5-5.02h3.09a8.02 8.02 0 01-4.59 7.02zM16.41 11H7.59c.2-1.82.7-3.56 1.47-5h5.88c.77 1.44 1.27 3.18 1.47 5z"
                          />
                        </svg>
                      </a>
                      <a
                        v-if="project.github"
                        :href="project.github"
                        aria-label="Source code"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path
                            fill="currentColor"
                            d="M12 .5a11.5 11.5 0 00-3.64 22.4c.58.1.8-.24.8-.54v-2.1c-3.26.7-3.95-1.4-3.95-1.4-.54-1.3-1.32-1.66-1.32-1.66-1.08-.72.08-.7.08-.7 1.2.08 1.84 1.2 1.84 1.2 1.06 1.8 2.78 1.28 3.46.98.1-.76.42-1.28.76-1.58-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.54.12-3.2 0 0 .98-.32 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.66.24 2.9.12 3.2.76.82 1.2 1.86 1.2 3.14 0 4.5-2.74 5.5-5.36 5.8.44.38.82 1.1.82 2.24v3.32c0 .3.2.66.8.54A11.5 11.5 0 0012 .5z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div class="highlights__media">
                    <img :src="project.picture" :alt="project.title" />
                  </div>
                </article>
              </div>
            </div>
            <div class="highlights__controls">
              <button
                type="button"
                aria-label="Previous highlight"
                @click="prevHighlight"
              >
                ‹
              </button>
              <span class="highlights__index"
                >{{ highlightIndex + 1 }} / {{ highlightProjects.length }}</span
              >
              <button
                type="button"
                aria-label="Next highlight"
                @click="nextHighlight"
              >
                ›
              </button>
            </div>
          </div>
        </div>
        <div ref="projectList" class="projects__list-wrapper">
          <ul class="projects__list">
            <li
              v-for="project in projects"
              :key="project.title"
              class="projects__project list-complete-item"
            >
              <project-card :project="project"></project-card>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { gsap } from 'gsap'
import RichText from '~/components/RichText.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import { projects } from '~/data/projects'
import type { Project } from '~/types/project'

export default defineComponent({
  components: {
    RichText,
    ProjectCard,
  },
  data() {
    return {
      projects: projects as Project[],
      highlightIndex: 0,
      highlightTimer: null as ReturnType<typeof setInterval> | null,
    }
  },
  computed: {
    highlightProjects(): Project[] {
      const withImages = this.projects.filter((project) => project.picture)
      return withImages.length ? withImages : this.projects
    },
  },
  mounted() {
    this.animateProjects()
    this.animateFading(1)
    this.startHighlightAutoplay()
  },
  beforeUnmount() {
    this.stopHighlightAutoplay()
  },

  methods: {
    animateProjects(): void {
      const projectsRef = this.$refs.project as HTMLElement | undefined
      const projectGroup = this.$refs.projectGroup as HTMLElement | undefined
      const projectText = this.$refs.projectText as HTMLElement | undefined
      const highlights = this.$refs.highlights as HTMLElement | undefined
      if (!projectsRef || !projectGroup || !projectText) return
      const tl = gsap.timeline({
        defaults: { ease: 'ease.in', duration: 0.5 },
      })

      tl.set(projectText.querySelectorAll('h1'), {
        opacity: 0,
        yPercent: 50,
      })
      if (highlights) {
        tl.set(highlights, { autoAlpha: 0, y: 20 })
      }

      tl.from(projectsRef, {
        autoAlpha: 0,
      })
      tl.from(
        projectGroup,
        {
          autoAlpha: 0,
        },
        '0'
      )
      tl.to(projectText.querySelectorAll('h1'), {
        opacity: 1,
        yPercent: 0,
      })
      if (highlights) {
        tl.to(
          highlights,
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
          },
          '-=0.2'
        )
      }
    },
    animateFading(delay: number) {
      const projectList = this.$refs.projectList as HTMLElement | undefined
      if (!projectList) return
      gsap.set(projectList, {
        autoAlpha: 0,
      })
      gsap.to(projectList, {
        autoAlpha: 1,
        duration: 1,
        delay,
      })
    },
    startHighlightAutoplay() {
      if (this.highlightTimer) return
      this.highlightTimer = setInterval(() => {
        this.nextHighlight()
      }, 6000)
    },
    stopHighlightAutoplay() {
      if (this.highlightTimer) {
        clearInterval(this.highlightTimer)
        this.highlightTimer = null
      }
    },
    nextHighlight() {
      if (!this.highlightProjects.length) return
      this.highlightIndex =
        (this.highlightIndex + 1) % this.highlightProjects.length
    },
    prevHighlight() {
      if (!this.highlightProjects.length) return
      this.highlightIndex =
        (this.highlightIndex - 1 + this.highlightProjects.length) %
        this.highlightProjects.length
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.projects {
  @include size(100%, auto);
  color: var(--primary);
  max-width: $max-width;
  margin-right: auto;
  margin-left: auto;
  padding: 0 rem(25px) rem($nav-height);
  &__list-wrapper {
    visibility: hidden;
  }
  &__highlights {
    margin-top: rem(30px);
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(max(250px, calc((100% - 50px) / 2)), 1fr)
    );
    justify-content: center;
    gap: rem(50px);
    margin-top: rem(50px);
    margin-bottom: rem(50px);
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      justify-content: flex-start;
      gap: rem(100px);
      margin-top: rem(70px);
    }
  }
}
.highlights {
  display: grid;
  grid-template-areas:
    'viewport'
    'controls';
  gap: rem(16px);
  padding: rem(18px);
  border-radius: rem(18px);
  background: radial-gradient(
      120% 120% at 10% 10%,
      rgba(255, 255, 255, 0.08),
      transparent 50%
    ),
    rgba(255, 255, 255, 0.04);
  border: rem(1px) solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.25);
  @media screen and (min-width: 1024px) {
    grid-template-areas: 'viewport' 'controls';
    align-items: center;
    padding: rem(28px);
  }
  &__viewport {
    grid-area: viewport;
    overflow: hidden;
    border-radius: rem(16px);
  }
  &__track {
    display: flex;
    width: 100%;
    transition: transform 0.9s cubic-bezier(0.22, 1, 0.36, 1);
  }
  &__slide {
    min-width: 100%;
    display: grid;
    grid-template-areas:
      'meta'
      'media';
    gap: rem(18px);
    align-items: center;
    @media screen and (min-width: 1024px) {
      grid-template-areas: 'meta media';
      grid-template-columns: 1.1fr 1fr;
      min-height: rem(340px);
    }
  }
  &__meta {
    grid-area: meta;
  }
  &__eyebrow {
    font-size: rem(11px);
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--tertiary);
  }
  &__title {
    margin-top: rem(8px);
    font-size: $text-4xl;
  }
  &__description {
    margin-top: rem(12px);
    color: var(--tertiary);
    line-height: 1.7;
    font-size: rem(15px);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: rem(92px);
  }
  &__actions {
    margin-top: rem(16px);
    display: flex;
    gap: rem(10px);
    a {
      @include size(rem(36px), rem(36px));
      @include flex(center, center);
      border-radius: 999px;
      color: var(--primary);
      border: rem(1px) solid var(--stroke);
      background: color-mix(in srgb, var(--background) 70%, transparent);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      svg {
        width: rem(18px);
        height: rem(18px);
      }
      &:hover {
        transform: translateY(rem(-2px));
        box-shadow: 0 8px 18px rgba(0, 0, 0, 0.2);
      }
    }
  }
  &__media {
    grid-area: media;
    border-radius: rem(16px);
    overflow: hidden;
    border: rem(1px) solid rgba(255, 255, 255, 0.08);
    min-height: rem(220px);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
  }
  &__controls {
    grid-area: controls;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(10px);
    button {
      @include size(rem(44px), rem(44px));
      border-radius: 999px;
      border: rem(1px) solid rgba(255, 255, 255, 0.12);
      background: transparent;
      color: var(--primary);
      font-size: rem(22px);
      cursor: pointer;
      transition: transform 0.2s ease, background 0.2s ease;
      &:hover {
        transform: translateY(rem(-2px));
        background: rgba(255, 255, 255, 0.08);
      }
    }
  }
  &__index {
    font-size: rem(12px);
    color: var(--tertiary);
  }
}
.list-complete {
  will-change: transform;
  &-item {
    transition-property: opacity, transform;
    transition-duration: 0.75s;
    transition-timing-function: ease-in-out;
  }
  &-enter {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
    &-item {
      transition-delay: 0.5s;
    }
  }
  &-leave-active {
    position: absolute;
    visibility: hidden;
  }
}
</style>
