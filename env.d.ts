/// <reference types="vite/client" />
//ts只支持导出导入模块，但是vue不是模块，申明一下vue是个模块，ts可以导入
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
// declare module "*.vue" {
//   import type { DefineComponent } from "vue";
//   const component: ComponentOptions | ComponentOptions["setup"];
//   export default component;
// }
