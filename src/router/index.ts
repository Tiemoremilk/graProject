import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/views/layout/Index.vue";
import { loginStore } from "@/stores/login";

const router = createRouter({
  // import.meta.env.MODE: {string} 应用运行的模式。
  // import.meta.env.BASE_URL: {string} 部署应用时的基本 URL。他由base 配置项决定。
  // import.meta.env.PROD: {boolean} 应用是否运行在生产环境。
  // import.meta.env.DEV: {boolean} 应用是否运行在开发环境 (永远与import.meta.env.PROD相反)。

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      name: "login"
    },
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
    {
      path: "/sendRoot",
      component: Layout,
      name: "sendRoot",
      meta: {
        title: "发放管理",
        icon: "Setting",
        roles: ["sys:sendRoot"],
      },
      children: [
        {
          path: "/sendInfo",
          component: () => import("@/views/pages/sendRoot/send/SendInfo.vue"),
          name: "sendInfo",
          meta: {
            title: "物资发放",
            icon: "UserFilled",
            roles: ["sys:sendInfo"],
          },
        },
        {
          path: "/sendDetail",
          component: () =>
            import("@/views/pages/sendRoot/sendDetail/SendDetail.vue"),
          name: "sendDetail",
          meta: {
            title: "发放记录",
            icon: "Wallet",
            roles: ["sys:sendDetail"],
          },
        },
      ],
    },
    {
      path: "/intoRoot",
      component: Layout,
      name: "intoRoot",
      meta: {
        title: "物资入库",
        icon: "Wallet",
        roles: ["sys:intoRoot"],
      },
      children: [
        {
          path: "/intoInfo",
          component: () => import("@/views/pages/intoRoot/into/IntoInfo.vue"),
          name: "intoInfo",
          meta: {
            title: "物资入库",
            icon: "UserFilled",
            roles: ["sys:intoInfo"],
          },
        },
        {
          path: "/intoDetail",
          component: () =>
            import("@/views/pages/intoRoot/intoDetail/IntoDetail.vue"),
          name: "intoDetail",
          meta: {
            title: "入库记录",
            icon: "Wallet",
            roles: ["sys:intoDetail"],
          },
        },
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const store = loginStore();
  if (to.path === "/login") {
    return next();
  }
  //说明用户访问的页面不是login 请求需要校验
  //获取token数据.
  const token = store.$state.token;
  //if(token !==null && token.length>0)
  //下列if 解释为: 如果token不为null
  if (token) {
    return next();
  }

  next("/login");
});
export default router;
