import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import path from 'path/posix'

export default defineUserConfig<DefaultThemeOptions>({
  "base": "/nervui-saas-doc/",
  title: '使用说明文档',
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
  // plugins: [
  //     [
  //     '@vuepress/search',{
  //       search: true, //默认false
  //       searchMaxSuggestions: 10 // 默认是5
  //     }
  //   ]
  // ],
  themeConfig: {
    navbar: require("./nav.ts"),
    sidebar:require("./sidebar.ts"),
    smoothScroll: true,
    darkMode:false,
    displayAllHeaders: false,
    sidebarDepth:1,
  },
  
  markdown:{
    

  }

})
