<template>
    <div >
        <section ref="about" class="about">
            <div ref="aboutGroup" class="about__group">
                <div ref="aboutText" class="about__text" >
                    <rich-text tag="h1" class="text-6xl">About Me</rich-text>
                    <rich-text tag="h1" class="text-lg dot">.</rich-text>
                </div>
               <div class="w-100 lg:mt-20">
                    <div class="flex justify-between items-center  flex-col lg:items-start lg:flex-row">
                       <div>
                            <div ref="profileImg" class="profile__wrapper profile__wrapper--round">
                                <img
                                    :src="about.myImage"
                                    class="profile__img "
                                    border-radius="50%"
                                />
                            </div>
                            <div class="flex justify-center">
                                <ul ref="profileLinks" class="profile__links">
                                    <li v-for="link in links" :key="link.icon" class="profile__link">
                                    <a
                                        class="profile__a"
                                        :href="link.href"
                                        target="_blank"
                                    >
                                        <svg class="profile__svg">
                                        <use :href="iconPath(link.icon)" />
                                        </svg>
                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div ref="bio"  class="text-sm profile__about mt-10 pb-10 lg:mt-0 lg:pb-0">
                            <rich-text tag="p" class="text-lg">
                                As a <b>senior Computer Science student</b> at the University of Saskatchewan, with a minor in Mathematics, I've immersed myself in the tech world, expanding my horizons beyond the classroom. My journey includes internships at renowned organizations like the <b>Royal Bank of Canada</b> and <b>Omnee</b>, where I've honed my skills in software development and project management.
                            
                                <br><br>
                            
                                My experience as a <b>Full Stack Developer Intern</b> at the <b>Royal Bank of Canada</b> in Toronto, and previously as a <b>Software Engineer Intern</b> in Calgary, has given me a deep understanding of the financial tech landscape. Here, I've led significant projects, such as improving <b>accessibility</b> in web applications and streamlining <b>data transformation</b> tools. My role at <b>Omnee</b> further solidified my expertise, especially in <b>web development</b>, where I led the front-end rebuild of the corporate website, significantly enhancing its performance and user experience.
                            
                                <br><br>
                            
                                I'm passionate about <b>Web and Mobile App Development</b>, and my interests extend to the realms of <b>Artificial Intelligence</b> and <b>Data Analytics</b>. My academic background, enriched with courses in <b>AI, deep learning,</b> and <b>software engineering</b>, complements my practical experience. Notably, I've been involved in hackathons, such as the <b>RBC internal hackathon</b> and <b>Hack the Change 2023</b>, where my team and I developed innovative solutions like a business advisor tool and a platform for sustainable investing, earning accolades for creativity and impact.
                            
                                <br><br>
                            
                                Eager to contribute my skills and continue my growth, I am excited to explore opportunities where I can make a meaningful impact in the tech industry, bringing a blend of technical prowess and a keen sense for innovative solutions.
                            </rich-text>
                            
                        </div>    
                    </div>
               </div>
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { gsap } from "gsap";
import RichText from '~/components/RichText.vue'
import { about } from '@/data/about'
import { About } from '@/types/pages'
import { links } from '@/data/navigation'
import {SocialMedia} from '@/types/links'

    export default Vue.extend({
        name: 'About' as string,
        components: {
            RichText,
        },
        data() {
            return {
                about: about as About,
                links: links as SocialMedia[]
            }
        },
        mounted(){
            this.animateFading(1);
            this.animateHero()

        },

        methods: {
            iconPath(icon: string): string {
                return require('@/assets/sprite.svg') + '#' + icon;
            },
            animateFading(delay: number) {
                gsap.set(this.$refs.profileImg as any, {
                    autoAlpha: 0,
                });
                gsap.set(this.$refs.profileLinks as any, {
                    autoAlpha: 0,
                });
                gsap.to(this.$refs.profileImg as any, {
                    autoAlpha: 1,
                    duration: 1,
                    delay,
                });
                gsap.to(this.$refs.profileLinks as any, {
                    autoAlpha: 1,
                    duration: 1,
                    delay,
                });
            },



            animateHero(): void {
                if (!process.client) return;
                const aboutText = this.$refs.aboutText as any
                const aboutGroup = this.$refs.aboutGroup as any
                const bio = this.$refs.bio as any
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
    })
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
    margin-top: rem(20px);
    margin-right: rem(0px);
    padding: .2rem 0 .2rem 0;
    background-color: var(--transparentBg);
    border-radius: $border-radius;
    border: double 6px transparent;
    background-image: linear-gradient(var(--transparentBg), var(--transparentBg));
    
    border-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E %3Cstyle%3Epath%7Banimation:stroke 5s infinite linear%3B%7D%40keyframes stroke%7Bto%7Bstroke-dashoffset:776%3B%7D%7D%3C/style%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='0%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%232d3561' /%3E%3Cstop offset='25%25' stop-color='%23c05c7e' /%3E%3Cstop offset='50%25' stop-color='%23f3826f' /%3E%3Cstop offset='100%25' stop-color='%23ffb961' /%3E%3C/linearGradient%3E %3Cpath d='M1.5 1.5 l97 0l0 97l-97 0 l0 -97' stroke-linecap='square' stroke='url(%23g)' stroke-width='3' stroke-dasharray='388'/%3E %3C/svg%3E") 1;
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