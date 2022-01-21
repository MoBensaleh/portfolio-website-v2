<template>
    <div >
        <TheHeader />
        <section ref="about" class="about">
            <div ref="aboutGroup" class="about__group">
                <div ref="aboutText" class="about__text" >
                    <rich-text tag="h1" class="text-6xl">About Me</rich-text>
                    <rich-text tag="h1" class="text-lg dot">.</rich-text>
                </div>
               <div class="w-100 lg:mt-12">
                   <div class="flex justify-between items-center flex-col lg:flex-row">
                       <div ref="profileImg" class="profile__wrapper profile__wrapper--round">
                           <img
                            :src="about.myImage"
                            class="profile__img "
                            border-radius="50%"
                            />
                        </div>
                        <div ref="bio"  class="text-sm profile__about mt-5 lg:mt-0">
                            <rich-text tag="p" >My name is Mohamed Bensaleh and I'm a <b>Computer Science student</b> at the University of Saskatchewan. I'm currently working as a <b>Software Development Intern</b>
                            at <b>Omnee Technologies Corp.</b> where I get to avidly learn, hone my skills in software development, and explore new programming languages, design patterns, and frameworks. <br><br>Over the course of my education/work experience I've become passionate about <b>Web development</b>, 
                            <b>mobile app development</b>, and <b>machine learning.</b></rich-text>

                        </div>
                        
                    </div>
               </div>
                
             
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
import RichText from '~/components/RichText.vue'
import { about } from '@/data/about'
import { About } from '@/types/pages'
    export default {
        name: 'About' as string,
        components: {
            RichText,
        },
        data() {
            return {
                about: about as About
            }
        },
        mounted(){
            this.animateFading(1);
            this.animateHero()

        },

        methods: {
            animateFading(delay: number) {
                gsap.set(this.$refs.profileImg as Element, {
                    autoAlpha: 0,
                });
                gsap.to(this.$refs.profileImg as Element, {
                    autoAlpha: 1,
                    duration: 1,
                    delay,
                });
            },



            animateHero(): void {
                if (!process.client) return;
                const aboutText = this.$refs.aboutText as Element
                const aboutGroup = this.$refs.aboutGroup as Element
                const bio = this.$refs.bio as Element
                const tl = gsap.timeline({
                    defaults: { ease: 'ease.in', duration: 0.5 },
                });
             
                tl.set(aboutText.querySelectorAll('h1'), {
                    opacity: 0,
                    yPercent: 50,
                });

                tl.set(bio.querySelector('p'), {
                    opacity: 0,
                    yPercent: 20,
                });
        
                tl.from(
                    aboutGroup,
                    {
                    autoAlpha: 0,
                    },
                    '0'
                );
                
                tl.to(aboutText.querySelectorAll('h1'), {
                    opacity: 1,
                    yPercent: 0,
                })
                tl.to(bio.querySelector('p'), {
                    opacity: 1,
                    yPercent: 0,
                })
            },
  
            
        }
    }
</script>

<style lang="scss" scoped>
@use '~/assets/styles/global/variables' as *;
@use '~/assets/styles/mixins/mixins' as *;
.about {
  @include size(100%, auto);
  color: var(--primary);
  max-width: $max-width;
  margin-right:auto;
  margin-left:auto;
  padding: 0 rem(25px) rem($nav-height);

  &__text{
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
    margin-top: rem(25px);
    background-color: var(--tertiary);
    border-radius: $border-radius;
    border: $border;
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