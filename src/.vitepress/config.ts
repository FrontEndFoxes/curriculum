import { defineConfig } from 'vitepress'
import { addCopyButton } from './copyButton'

export default defineConfig({
  base: '/curriculum/',
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'stylesheet', href: '/curriculum/.vitepress/styles/custom.css' }]
  ],
  title: 'Front-End Foxes Workshops',
  description: 'Workshops to teach web and mobile development to beginners',
  themeConfig: {
    siteTitle: 'Front-End Foxes Workshops',
    editLink: {
      pattern: 'https://github.com/frontendfoxes/curriculum/edit/main/:path',
      text: 'Help us improve this page!'
    },
    nav: [
      { text: 'React Workshops', link: '/workshops/react/' },
      { text: 'Vue Workshops', link: '/workshops/vue/' },
      { text: 'Code of Conduct', link: '/workshops/CODE_OF_CONDUCT' },
      { text: 'Team', link: '/workshops/TEAM' },
    ],
    sidebar: {
      '/workshops/react/': [
        {
          text: '🦴 Mini Workshops',
          items: [
            { text: 'E-commerce', link: '/workshops/react/minis/ecommerce' }
          ]
        }
      ],
      '/workshops/vue/': [
        {
          text: '🐶 Full Day Workshop',
          items: [
            { text: '📋 Chapter 1: Introducing the My Pet Shop Web App', link: '/workshops/vue/full-day/ch1' },
            { text: '📋 Chapter 2: Build a Pet Gallery', link: '/workshops/vue/full-day/ch2' },
            { text: '📋 Chapter 3: Connect your Project to an API', link: '/workshops/vue/full-day/ch3' },
            { text: '📋 Chapter 4: Create a Dog Adoption Experience', link: '/workshops/vue/full-day/ch4' },
            { text: '📋 Chapter 5: Complete the Adoption Experience with a Form', link: '/workshops/vue/full-day/ch5' },
            { text: '🤷‍♀️ Appendix 1: Lost? Confused? Starting Fresh?', link: '/workshops/vue/full-day/appendix_1' },
            { text: '📌 Appendix 2: Add your CodeSandbox to your GitHub Account', link: '/workshops/vue/full-day/appendix_2' }
          ]
        },
        {
          text: '🐾 Half-Day Workshops',
          items: [
            { text: '♣️ Build an Accessible Memory Game', link: '/workshops/vue/half-day/half-day1' }
          ]
        },
        {
          text: '🦴 Mini Workshops',
          items: [
            { text: '🖥️ Mini 1: Build A Simple Pet Fetching Web App', link: '/workshops/vue/minis/mini1' },
            { text: '🖥️ Mini 2: Build A Simple Fox Liking Web App with Grid Styling using Vue 2 and the Options API', link: '/workshops/vue/minis/mini2-vue2-options' },
            { text: '🖥️ Mini 2 (Vue 3): Build A Simple Fox Liking Web App with Grid Styling using Vue 3 and the Composition API', link: '/workshops/vue/minis/mini2-vue3-composition' },
            { text: '📱 Mini 3: Build A Simple Pet Display Mobile App', link: '/workshops/vue/minis/mini3' },
            { text: '🦄 Mini 4: Build a Rainbow/Unicorn Mobile App that Lights Up a Particle Photon Device', link: '/workshops/vue/minis/mini4' },
            { text: '💃 Mini 5: Build a Tinder-Style Mobile App: Tindogs!', link: '/workshops/vue/minis/mini5' },
            { text: '🎵 Mini 6: Build a Spotify Music Player with the Composition API (beta!)', link: '/workshops/vue/minis/mini6' }
          ]
        },
        {
          text: '👩‍🎓 Nano Activities',
          items: [
            { text: '👜 Nano 1: Vuex 101 (intermediate)', link: '/workshops/vue/nanos/nano1' },
            { text: '☎️ Nano 2: Use Axios to Call an API (intermediate)', link: '/workshops/vue/nanos/nano2' },
            { text: '🏠 Nano 3: Setup Visual Studio Code the Right Way for Vue (beginner)', link: '/workshops/vue/nanos/nano3' },
            { text: '⏰ Nano 4: Create a Computed Property to Display a Date (intermediate)', link: '/workshops/vue/nanos/nano4' },
            { text: '🔨 Nano 5: Scaffold a Nuxt App and Explore Its Architecture (Advanced)', link: '/workshops/vue/nanos/nano5' },
            { text: '💖 Nano 6: Create a Mobile App to Spread Emoji Love (Beginner)', link: '/workshops/vue/nanos/nano6' }
          ]
        }
      ],
      '/de/workshops/vue/full-day/': [
        {
          text: '🐶 Tagesworkshop',
          items: [
            { text: 'Kapitel 1', link: '/de/workshops/vue/full-day/ch1' },
            { text: 'Kapitel 2', link: '/de/workshops/vue/full-day/ch2' },
            { text: 'Kapitel 3', link: '/de/workshops/vue/full-day/ch3' },
            { text: 'Kapitel 4', link: '/de/workshops/vue/full-day/ch4' },
            { text: 'Kapitel 5', link: '/de/workshops/vue/full-day/ch5' },
            { text: 'Anhang 1', link: '/de/workshops/vue/full-day/appendix_1' }
          ]
        }
      ],
      '/fr/workshops/vue/minis/': [
        {
          text: '🦴 Ateliers Minis',
          items: [
            { text: 'Mini 1', link: '/fr/workshops/vue/minis/mini1' }
          ]
        }
      ],
      '/jp/workshops/vue/': [
        {
          text: '🐶 フルデイワークショップ',
          items: [
            { text: 'チャプター4', link: '/jp/workshops/vue/full-day/ch4' }
          ]
        },
        {
          text: '🦴 ミニワークショップ',
          items: [
            { text: 'ミニ1', link: '/jp/workshops/vue/minis/mini1' },
            { text: 'ミニ2', link: '/jp/workshops/vue/minis/mini2' },
            { text: 'ミニ3', link: '/jp/workshops/vue/minis/mini3' },
            { text: 'ミニ4', link: '/jp/workshops/vue/minis/mini4' }
          ]
        },
        {
          text: '👩‍🎓 ナノアクティビティ',
          items: [
            { text: 'ナノ2', link: '/jp/workshops/vue/nanos/nano2' },
            { text: 'ナノ3', link: '/jp/workshops/vue/nanos/nano3' },
            { text: 'ナノ6', link: '/jp/workshops/vue/nanos/nano6' }
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      addCopyButton(md)
    }
  }
}) 