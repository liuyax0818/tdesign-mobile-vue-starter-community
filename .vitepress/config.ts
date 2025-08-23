import { defineConfig } from 'vitepress'
import { zh } from './locales'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  locales: {
    root: {
      title: 'TDesign Docs',
      description: 'TDesign Mobile Vue Quick Start',
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/' },
          { text: 'Examples', link: '/markdown-examples' },
        ],
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/markdown-examples' },
              { text: 'Runtime API Examples', link: '/api-examples' },
            ],
          },
        ],
      },
    },
    zh,
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    search: {
      provider: 'local',
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TDesignOteam/tdesign-mobile-vue-starter-community' },
    ],
  },

  vite: {
    server: {
      port: 4399,
      host: '0.0.0.0',
      proxy: {},
    },
  },
})
