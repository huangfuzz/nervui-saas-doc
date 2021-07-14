import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import path from 'path/posix'

export default defineUserConfig<DefaultThemeOptions>({
  "base": "/",
  // lang: 'en-US',
  title: '使用说明文档',
  // description: 'Just playing around',
  locales: {
    // 键名是该语言所属的子路径
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/zh/async_validator/useIntroduction.md': {
      lang: '中文',
      title: '使用文档',
      description: '文档说明',
    },
    '/en/async_validator/useIntroduction.html': {
      lang: 'English',
      title: 'Use Description',
      description: 'Vue-powered Static Site Generator',

    },
  },
  plugins: [
    [require('vuepress-plugin-code-copy'),true],
    // ['vuepress-plugin-code-copy',true],
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/en/': {
            placeholder: 'Search',
          },
          '/zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],

  ],
  themeConfig: {
    // logo: 'https://vuejs.org/images/logo.png',
    navbar: require("./nav.ts"),
    sidebar:require("./sidebar.ts"),
    smoothScroll: true,
    darkMode:false,
    displayAllHeaders: false,
    sidebarDepth:1,
  },
  // extendsMarkdown: (md) => {
  //   md.use(search);
  // },
  markdown:{
    // importCode:{
    //   handleImportPath: (str) =>
    //   str.replace(/^@src/, path.resolve(__dirname, 'docs/validate-code')),
    // }

  }

})
