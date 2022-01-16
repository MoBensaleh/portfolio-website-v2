<template>
    <div class="flex justify-center">
        <TheHeader />
        <section ref="project" class="project">
            <div ref="projectGroup" class="project__group">
                <div ref="projectText" class="project__text" >
                    <rich-text tag="h1" class="text-6xl mr-3">Projects</rich-text>
                </div>
                <div class="mt-9 projects__container">
 
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import RichText from '~/components/RichText.vue'
import { projects } from '~/data/projects'
import { Project } from '~/types/project'
    export default {
        components: {
            RichText
        },
     
        data() {
            return {
                projects: projects as Project[]
            }
        },
        mounted(){
            this.animateProjects();

        },

        methods: {
            animateProjects(): void {
                const projects = this.$refs.project as Element;
                const projectGroup = this.$refs.projectGroup as Element;
                const projectText = this.$refs.projectText as Element;
                const tl = gsap.timeline({
                    defaults: { ease: 'ease.in', duration: 0.5 },
                });
            
                tl.set(projectText.querySelectorAll('h1'), {
                    opacity: 0,
                    yPercent: 50,
                });
            
                tl.from(projects, {
                    autoAlpha: 0,
                });
                tl.from(
                    projectGroup,
                    {
                    autoAlpha: 0,
                    },
                    '0'
                );
                tl.to(projectText.querySelectorAll('h1'), {
                    opacity: 1,
                    yPercent: 0,
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;

.project {
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
    align-items: start;
    justify-content: center;
    margin-top: rem(110px);
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
    display: none;
    position: relative;
    z-index: 1;
    @media screen and (min-width: 1024px) {
      @include flex(flex-start, start, row);
  
    }
  }
}


</style>