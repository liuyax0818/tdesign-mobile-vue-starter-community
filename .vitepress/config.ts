import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  title: 'TDesign Docs',
  description: 'TDesign Mobile Vue Quick Start',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
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
