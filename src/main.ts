import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
//messageBox封装
import messageBox from "./utils/messageBox";
//快速复制
import easyCopy from "./utils/easyCopy";
import zhCn from "element-plus/es/locale/lang/zh-cn";
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: zhCn,
});
//全局挂载
app.config.globalProperties.$messageBox = messageBox;
app.config.globalProperties.$easyCopy = easyCopy;
app.mount("#app");
