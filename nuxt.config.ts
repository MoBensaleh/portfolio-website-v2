export default defineNuxtConfig({
  app: {
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout',
      mode: 'out-in',
    },
    head: {
      title: "Mohamed Bensaleh's Portfolio",
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon_io/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon_io/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon_io/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon_io/favicon-16x16.png' },
        { rel: 'manifest', href: '/favicon_io/site.webmanifest' },
      ],
    },
  },
  css: ['~/assets/styles/styles.scss'],
  modules: ['@nuxtjs/tailwindcss'],
  build: {
    transpile: ['gsap'],
  },
  nitro: {
    compatibilityDate: '2026-01-31',
  },
})
