<template>
    <div >
        <TheHeader />
        <section ref="project" class="projects">
            <div ref="projectGroup" class="project__group">
                <div ref="projectText" class="project__text" >
                    <rich-text tag="h1" class="text-6xl mr-3">Projects</rich-text>
                </div>
                <div class="mt-9 projects__list-wrapper">
                    <ul class="projects__list">
                        <li
                        v-for="project in projects" 
                        :key="project.title"
                        class="projects__project list-complete-item"
                        >
                        <project-card :key="project.title" :project="project"></project-card>
                        </li>

                    </ul>
                </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import RichText from '~/components/RichText.vue'
import ProjectCard from '~/components/ProjectCard.vue'
import { projects } from '~/data/projects'
import { Project } from '~/types/project'
    export default {
        components: {
            RichText,
            ProjectCard 
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
.projects {
  @include size(100%, auto);
  color: var(--primary);
  max-width: $max-width;
  margin-right:auto;
    margin-left:auto;
  padding: 0 rem(25px) rem($nav-height);
  &__list-wrapper {
    // visibility: hidden; 
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
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(370px, 1fr));
      justify-content: flex-start;
      gap: rem(100px);
      margin-top: rem(100px);
    }
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