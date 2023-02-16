import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/Index.vue";

const router = createRouter({
  // import.meta.env.MODE: {string} 应用运行的模式。
  // import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
  // import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
  // import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与import.meta.env.PROD相反)。

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "/home",
          component: () => import("@/views/pages/home/Home.vue"),
          name: "home",
          meta: {
            title: "首页",
            icon: "#icondashboard",
          },
        },
      ],
    },
    {
      path: "/system",
      component: Layout,
      name: "system",
      meta: {
        title: "系统管理",
        icon: "el-icon-menu",
        roles: ["sys:manage"],
      },
      children: [
        {
          path: "/userList",
          component: () =>
            import("@/views/pages/system/user/UserListManage.vue"),
          name: "userList",
          meta: {
            title: "用户管理",
            icon: "el-icon-s-custom",
            roles: ["sys:user"],
          },
        },
        {
          path: "/roleList",
          component: () =>
            import("@/views/pages/system/role/RoleListManage.vue"),
          name: "roleList",
          meta: {
            title: "角色管理",
            icon: "el-icon-s-tools",
            roles: ["sys:role"],
          },
        },
        {
          path: "/menuList",
          component: () =>
            import("@/views/pages/system/menu/MenuListManage.vue"),
          name: "menuList",
          meta: {
            title: "权限管理",
            icon: "el-icon-document",
            roles: ["sys:menu"],
          },
        },
      ],
    },
    {
      path: "/materialManagement",
      component: Layout,
      name: "materialManagement",
      meta: {
        title: "物资管理",
        icon: "Setting",
        roles: ["sys:materialManagement"],
      },
      children: [
        {
          path: "/materialCategory",
          component: () =>
            import(
              "@/views/pages/materialManagement/materialCategory/MaterialCategoryManagement.vue"
            ),
          name: "materialCategory",
          meta: {
            title: "物资类型",
            icon: "UserFilled",
            roles: ["sys:materialCategory"],
          },
        },
        {
          path: "/materialInfo",
          component: () =>
            import(
              "@/views/pages/materialManagement/materialInfo/MaterialInfoManagement.vue"
            ),
          name: "materialInfo",
          meta: {
            title: "物资信息",
            icon: "Wallet",
            roles: ["sys:materialInfo"],
          },
        },
      ],
    },
  ],
});

export default router;
