import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: 'docs',

  locales: {
    root: {
      title: 'TDesign Docs',
      description: 'TDesign Mobile Vue Quick Start',
      label: 'English',
      lang: 'en',
      link: '/en',
      themeConfig: {
        nav: [
          { text: 'Home', link: '/en/index' },
          { text: 'Examples', link: '/en/markdown-examples' },
        ],
        sidebar: [
          {
            text: 'Examples',
            items: [
              { text: 'Markdown Examples', link: '/en/markdown-examples' },
              { text: 'Runtime API Examples', link: '/en/api-examples' },
            ],
          },
        ],
      },
    },

    zh: {
      title: 'TDesign 文档',
      description: 'TDesign 移动端模板',
      label: '中文（简体）',
      lang: 'zh',
      link: '/zh',
      themeConfig: {
        nav: [
          { text: '首页', link: '/zh/index' },
          { text: '示例', link: '/zh/markdown-examples' },
        ],
        sidebar: [
          {
            text: '示例',
            items: [
              { text: 'Markdown 示例', link: '/zh/markdown-examples' },
              { text: '运行时 API 示例', link: '/zh/api-examples' },
            ],
          },
        ],
      },
    },
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
