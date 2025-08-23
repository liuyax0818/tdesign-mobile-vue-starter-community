import type { DefaultTheme, LocaleSpecificConfig } from 'vitepress'

export const zh: LocaleSpecificConfig<DefaultTheme.Config> & { label: string, link?: string } = {
  title: 'TDesign 文档',
  description: 'TDesign 移动端模板',
  label: '中文（简体）',
  lang: 'zh',
  link: '/zh',
  themeConfig: {
    search: {
      provider: 'local',
      options: searchOptions(),
    },
    outline: {
      label: '页面导航',
    },
    lastUpdated: {
      text: '最后更新于',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
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
}

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档',
      },
      modal: {
        displayDetails: '显示详情',
        resetButtonTitle: '清除',
        backButtonTitle: '返回',
        noResultsText: '无法找到相关结果',
        footer: {
          selectText: '选择',
          selectKeyAriaLabel: 'Enter 键',
          navigateText: '切换',
          navigateUpKeyAriaLabel: '向上箭头',
          navigateDownKeyAriaLabel: '向下箭头',
          closeText: '关闭',
          closeKeyAriaLabel: 'Esc 键',
        },
      },
    },
  }
}
