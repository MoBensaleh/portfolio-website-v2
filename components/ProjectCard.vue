<template>
  <section class="project">
    <div class="project__group">
      <h2 class="project__title">
        <span class="project__title-marker" aria-hidden="true">&gt;</span>
        <span ref="title">{{ project.title }}</span>
        <span ref="cursor" class="dot">_</span>
      </h2>
      <div class="project__actions my-2">
        <a
          v-if="project.live"
          class="project__action"
          :href="project.live"
          aria-label="Live demo"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="onLinkHover('Play with it')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M8 5.5a1 1 0 011.5-.86l8 4.5a1 1 0 010 1.72l-8 4.5A1 1 0 018 14.5v-9z"
            />
          </svg>
        </a>
        <a
          v-if="project.website"
          class="project__action"
          :href="project.website"
          aria-label="Project website"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="onLinkHover('Find out more')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.5 9h-3.09a14.9 14.9 0 00-1.5-5.02A8.02 8.02 0 0119.5 11zM12 4c.9 1.2 1.63 2.82 2.03 5H9.97C10.37 6.82 11.1 5.2 12 4zM4.5 13h3.09c.23 1.78.78 3.53 1.5 5.02A8.02 8.02 0 014.5 13zm0-2a8.02 8.02 0 014.59-7.02A14.9 14.9 0 007.59 11H4.5zm7.5 9c-.9-1.2-1.63-2.82-2.03-5h4.06c-.4 2.18-1.13 3.8-2.03 5zm3.91-2.98c.72-1.49 1.27-3.24 1.5-5.02h3.09a8.02 8.02 0 01-4.59 7.02zM16.41 11H7.59c.2-1.82.7-3.56 1.47-5h5.88c.77 1.44 1.27 3.18 1.47 5z"
            />
          </svg>
        </a>
        <a
          v-if="project.github"
          class="project__action"
          :href="project.github"
          aria-label="Source code"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="onLinkHover('Check code')"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 .5a11.5 11.5 0 00-3.64 22.4c.58.1.8-.24.8-.54v-2.1c-3.26.7-3.95-1.4-3.95-1.4-.54-1.3-1.32-1.66-1.32-1.66-1.08-.72.08-.7.08-.7 1.2.08 1.84 1.2 1.84 1.2 1.06 1.8 2.78 1.28 3.46.98.1-.76.42-1.28.76-1.58-2.6-.3-5.34-1.3-5.34-5.8 0-1.28.46-2.32 1.2-3.14-.12-.3-.52-1.54.12-3.2 0 0 .98-.32 3.2 1.2a11.1 11.1 0 015.82 0c2.22-1.52 3.2-1.2 3.2-1.2.64 1.66.24 2.9.12 3.2.76.82 1.2 1.86 1.2 3.14 0 4.5-2.74 5.5-5.36 5.8.44.38.82 1.1.82 2.24v3.32c0 .3.2.66.8.54A11.5 11.5 0 0012 .5z"
            />
          </svg>
        </a>
      </div>
      <rich-text tag="p" class="project__description text-sm my-2">
        {{ project.description }}
      </rich-text>
      <div class="project__stack mt-3">
        <span class="project__stack-label">Stack</span>
        <div class="project__technologies">
          <span
            v-for="technology in project.technologies"
            :key="technology"
            class="project__technology"
          >
            {{ technology }}
          </span>
        </div>
      </div>
    </div>

    <div class="project__media">
      <div class="window">
        <div class="window__header">
          <svg class="window__buttons">
            <circle
              class="exit"
              stroke-width="2"
              stroke="currentColor"
              cx="12"
              cy="12"
              r="4"
            />
            <circle
              class="minimize"
              stroke-width="2"
              stroke="currentColor"
              cx="28"
              cy="12"
              r="4"
            />
            <circle
              class="maximize"
              stroke-width="2"
              stroke="currentColor"
              cx="44"
              cy="12"
              r="4"
            />
          </svg>
          <span class="window__title">{{ project.title }}</span>
        </div>
        <img
          v-if="project.picture"
          :src="project.picture"
          :alt="project.title"
          class="window__image"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { gsap } from 'gsap'
import type { Project } from '~/types/project'

export default defineComponent({
  name: 'ProjectCard',
  props: {
    project: {
      type: Object as PropType<Project>,
      required: true,
    },
  },
  data() {
    return {
      titleTimeline: null as unknown as gsap.core.Timeline,
      titleScrollTimeline: null as unknown as gsap.core.Timeline,
      cursorTimeline: null as unknown as gsap.core.Timeline,
      previousText: '',
      timeout: null as ReturnType<typeof setTimeout> | null,
    }
  },
  mounted() {
    const cursorRef = this.$refs.cursor as HTMLElement | undefined
    const titleRef = this.$refs.title as HTMLElement | undefined
    if (!cursorRef || !titleRef) return
    this.cursorTimeline = this.createCursorTimeline(cursorRef).pause(0.5)
    this.titleTimeline = this.createTitleTimeline(
      titleRef,
      this.project.title
    ).pause(0)
    this.titleScrollTimeline = this.createTitleTimeline(
      titleRef,
      this.project.title
    )
      .pause(0)
      .add(this.cursorTimeline.play(0))
  },

  methods: {
    createCursorTimeline(cursorRef: Element): gsap.core.Timeline {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      })
      tl.fromTo(
        cursorRef,
        {
          autoAlpha: 1,
        },
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: 'steps(1)',
        }
      )
      return tl
    },

    createTitleTimeline(titleRef: Element, text: string): gsap.core.Timeline {
      const tl = gsap.timeline()
      tl.add(this.textAnimation(titleRef, text))
      return tl
    },

    onLinkHover(text: string): void {
      if (text === this.previousText) return
      if (text !== this.project.title && this.timeout) {
        clearTimeout(this.timeout)
      }
      this.titleScrollTimeline.pause(0)
      this.previousText = text
      const titleRef = this.$refs.title as HTMLElement | undefined
      if (!titleRef) return
      titleRef.textContent = ''
      this.cursorTimeline.pause(0)
      this.titleTimeline.reverse(this.titleTimeline.time())
      this.titleTimeline.eventCallback('onReverseComplete', () => {
        this.titleTimeline = this.createTitleTimeline(titleRef, text)
        this.titleTimeline.play(0)
        this.titleTimeline.eventCallback('onComplete', () => {
          this.cursorTimeline.restart()
          if (text !== this.project.title) {
            this.timeout = setTimeout(() => {
              this.onLinkHover(this.project.title)
            }, 500)
          }
        })
      })
    },

    textAnimation(elem: Element, text: string): gsap.core.Tween {
      return gsap.to(elem, {
        id: 'textAnimation',
        duration: text.length / 16,
        text: {
          value: text,
        },
        ease: 'none',
      })
    },
  },
})
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.project {
  height: 100%;
  display: grid;
  grid-template-areas: 'media' 'group';
  grid-template-rows: max-content 1fr;
  row-gap: rem(20px);
  align-content: flex-start;
  &__title {
    font-size: $text-2xl;
    font-weight: 700;
    font-family: var(--font-family-secondary);
    display: inline-flex;
    align-items: center;
    gap: rem(10px);
  }
  &__title-marker {
    color: var(--tertiary);
    transform: translateY(rem(-1px));
  }
  &__group {
    @include flex(flex-start, flex-start, column);
    @include size(100%, auto);
    padding: 0;
    grid-area: group;
  }
  &__description,
  &__actions {
    padding-left: rem(25px);
  }
  &__actions {
    @include flex(center, flex-start);
    gap: rem(10px);
  }
  &__action {
    @include size(rem(36px), rem(36px));
    @include flex(center, center);
    border-radius: 999px;
    color: var(--primary);
    border: rem(1px) solid var(--stroke);
    background: color-mix(in srgb, var(--background) 70%, transparent);
    transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;
    text-decoration: none;
    svg {
      width: rem(18px);
      height: rem(18px);
    }
    &:hover {
      transform: translateY(rem(-2px));
      color: var(--tertiary);
      box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
    }
  }
  &__stack {
    @include flex(center, flex-start, row);
    gap: rem(10px);
    padding-left: rem(25px);
    align-items: center;
  }
  &__stack-label {
    font-size: rem(11px);
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--tertiary);
    font-family: var(--font-family-secondary);
  }
  &__technologies {
    display: flex;
    flex-wrap: wrap;
    gap: rem(6px);
    max-width: 100%;
  }
  &__technology {
    font-size: rem(11px);
    padding: rem(4px) rem(8px);
    border-radius: 999px;
    color: var(--primary);
    background: rgba(255, 255, 255, 0.06);
    border: rem(1px) solid rgba(255, 255, 255, 0.08);
    white-space: nowrap;
  }
  &__media {
    grid-area: media;
    border-radius: $border-radius;
   
    margin-left: rem(10px);
    box-shadow: var(--shadow) 4px 4px 0,
                var(--shadow) 5px 5px 0,
                var(--shadow) 6px 6px 0,
                var(--shadow) 7px 7px 0,
                var(--shadow) 8px 8px 0,
                var(--shadow) 9px 9px 0,
                var(--shadow) 10px 10px 0,
                var(--shadow) 11px 11px 0;
  }
}
.window {
  @include size(100%, auto);
  @include flex(flex-start, flex-start, column);
//   border: rem(2px) solid var(--stroke);
  border-radius: $border-radius;
  color: var(--shadow);
  background-color: var(--secondary);
  overflow: hidden;
  &__header {
    @include size(100%, auto);
    @include flex(center, flex-start);
    position: relative;
    border-bottom: rem(2px) solid var(--stroke);
    padding: 5px;
  }
  &__buttons {
    @include size(rem(64px), rem(24px));
    position: absolute;
    .exit {
      fill: #de5246;
      color: #de5246;
    }
    .minimize {
      fill: #ffce44;
      color: #ffce44;
    }
    .maximize {
      fill: #1aa260;
      color: #1aa260;
    }
  }
  &__title {
    @include size(100%, 100%);
    @include flex(center, center);
    text-align: left;
    font-family: var(--font-family-secondary);
    font-size: rem(14px);
  }
  &__image {
    max-height: 240px;
    width: 100%;
    object-fit: cover;
  }
}
.dot {
  color: var(--tertiary);
}

</style>
