export const data = {
  "key": "v-3a4711a6",
  "path": "/sidebar/second/second_demo2.html",
  "title": "样式",
  "lang": "en-US",
  "frontmatter": {},
  "excerpt": "",
  "headers": [
    {
      "level": 2,
      "title": "二级标题",
      "slug": "二级标题",
      "children": [
        {
          "level": 3,
          "title": "三级标题",
          "slug": "三级标题",
          "children": []
        }
      ]
    }
  ],
  "filePathRelative": "sidebar/second/second_demo2.md",
  "git": {}
}

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
