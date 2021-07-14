import { defineClientAppEnhance } from '@vuepress/client'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import demo from './components/demo.vue';

export default defineClientAppEnhance(({ app, router, siteData }) => {
    app.use(Antd);
    app.component('demo', demo);
  // ...
})