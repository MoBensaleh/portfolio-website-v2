<template>
  <section class="project">
    <div class="project__group">
      <h2 class="project__title">
        <span class="dot">></span>
        <span ref="title">{{project.title}}</span
        ><span ref="cursor" class="dot">_</span>
      </h2>
      <div class="project__links my-2">
        <a
          v-if="project.live"
          class="project__link link"
          :href="project.live"
          @mouseenter="onLinkHover('Play with it')"
        >
          Live
        </a>
        <a
          v-if="project.github"
          class="project__link link"
          :href="project.github"
          @mouseenter="onLinkHover('Check code')"
        >
          Code
        </a>
      </div>
      <rich-text tag="p" class="project__description text-sm my-2">
        {{ project.description }}
      </rich-text>
      <div class="project__technologies_container py-4 mt-3 px-3">
        <rich-text tag="h3" class="text-lg mb-4">
          Built with
        </rich-text>
        <div class="project__technologies">
          <rich-text tag="b" v-for="technology in project.technologies" :key="technology" class="project__technology px-2 py-1">{{technology}}</rich-text>
        </div>
      </div>
    </div>
    

    <div class="project__media">
      <div ref="project-window" class="window">
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
          class="window__image"
        
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { gsap } from 'gsap';
import { Project } from '~/types/project';

export default Vue.extend({
  name: 'ProjectCard',
  props: {
    project: {
      type: Object as () => Project,
      default: () => ({} as Project),
    },
  },
  data() {
    return {
      titleTimeline: null as unknown as gsap.core.Timeline,
      titleScrollTimeline: null as unknown as gsap.core.Timeline,
      cursorTimeline: null as unknown as gsap.core.Timeline,
      previousText: '',
      timeout: null as any,
      lastFilter: 'show-all',
      titleObserver: null as unknown as IntersectionObserver,
      windowObserver: null as unknown as IntersectionObserver,
  
    };
  },
  mounted(){
    const cursorRef = this.$refs[`cursor`] as Element;
    const titleRef = this.$refs[`title`] as Element;
    this.cursorTimeline = this.createCursorTimeline(cursorRef).pause(0.5);
    this.titleTimeline = this.createTitleTimeline(
      titleRef,
      this.project.title
    ).pause(0);
    this.titleScrollTimeline = this.createTitleTimeline(
      titleRef,
      this.project.title
    )
      .pause(0)
      .add(this.cursorTimeline.play(0));

  },

  methods: {
    createCursorTimeline(cursorRef: Element) {
      const tl = gsap.timeline({
        repeat: -1,
        yoyo: true,
      });
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
      );
      return tl;
    },

    createTitleTimeline(titleRef: Element, text: string) {
      const tl = gsap.timeline();
      tl.add(this.textAnimation(titleRef, text));
      return tl;
    },

    onLinkHover(text: string) {
      if (text === this.previousText) return;
      if (text !== this.project.title && this.timeout > 0) {
        clearTimeout(this.timeout);
      }
      this.titleScrollTimeline.pause(0);
      this.previousText = text;
      const titleRef = this.$refs[`title`] as Element;
      titleRef.innerHTML = '';
      this.cursorTimeline.pause(0);
      this.titleTimeline.reverse(this.titleTimeline.time());
      this.titleTimeline.eventCallback('onReverseComplete', () => {
        this.titleTimeline = this.createTitleTimeline(titleRef, text);
        this.titleTimeline.play(0);
        this.titleTimeline.eventCallback('onComplete', () => {
          this.cursorTimeline.restart();
          if (text !== this.project.title) {
            this.timeout = setTimeout(() => {
              this.onLinkHover(this.project.title);
            }, 500);
          }
        });
      });
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
});
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
a {
  position: relative;
   @include inline-flex(center, flex-start);
  color: var(--primary);
  background-color: transparent;
  font-weight: 700;
  font-family: var(--font-family-secondary);
  line-height: 1.5;
  text-decoration: none;
}

a::before {
  content: "";
  position: absolute;
  display: block;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: var(--tertiary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

a:hover::before {
  transform: scaleX(1);
}



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
  }
  &__group {
    @include flex(flex-start, flex-start, column);
    @include size(100%, auto);
    padding: 0;
    grid-area: group;
  }
  &__description,
  &__links {
    padding-left: rem(25px);
  }
  &__technologies_container {
    @include flex(center, center, column);
    @include size(100%, auto);
    -webkit-box-shadow:0 0 15px var(--primary);
    -moz-box-shadow: 0 0 15px var(--primary); 
    box-shadow:0 0 15px var(--primary);
    border-radius: 20px;

  }
  &__technologies{
    @include flex(center, space-around);
    flex-wrap: wrap;
    gap: 12px;
    @include size(100%, auto);
  }

  &__technology{
    border: 2px solid var(--primary);
    background-color: var(--primary);
    color: var(--background);
    border-radius: 50px;
    min-width: 70px;
    text-align: center;

    
  }

  &__links {
    @include flex(center, flex-start);
    
  }
  &__link {
    margin-right: 35%;
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