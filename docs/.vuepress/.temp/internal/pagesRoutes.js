import { Vuepress } from '@vuepress/client/lib/components/Vuepress'

const routeItems = [
  ["v-2b50ac68","/foo.html","",["/foo.md"]],
  ["v-8daa1a0e","/","",["/index.html","/README.md"]],
  ["v-9c74260a","/zh/foo.html","",["/zh/foo.md"]],
  ["v-2d0ad528","/zh/","",["/zh/index.html","/zh/README.md"]],
  ["v-0ec098f6","/en/async_validator/useIntroduction.html","async-validator",["/en/async_validator/useIntroduction.md"]],
  ["v-73088ac9","/en/demo2/demo.html","Title1",["/en/demo2/demo.md"]],
  ["v-153b11e8","/zh/async_validator/","",["/zh/async_validator/index.html","/zh/async_validator/README.md"]],
  ["v-2dc45020","/zh/async_validator/useIntroduction.html","async-validator",["/zh/async_validator/useIntroduction.md"]],
  ["v-a1f63964","/zh/demo2/demo.html","Demo2",["/zh/demo2/demo.md"]],
  ["v-3706649a","/404.html","",[]],
]

export const pagesRoutes = routeItems.reduce(
  (result, [name, path, title, redirects]) => {
    result.push(
      {
        name,
        path,
        component: Vuepress,
        meta: { title },
      },
      ...redirects.map((item) => ({
        path: item,
        redirect: path,
      }))
    )
    return result
  },
  [
    {
      name: "404",
      path: "/:catchAll(.*)",
      component: Vuepress,
    }
  ]
)
