<template>
  <div class="menu">
    <MenuLogo></MenuLogo>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      unique-opened
      background-color="#3E3C3B"
      router
      :collapse="!stauts"
    >
      <MenuItem :menuList="menuList"></MenuItem>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed } from "vue";
import MenuItem from "./MenuItem.vue";
import MenuLogo from "./MenuLogo.vue";
import { useRoute } from "vue-router";
import { collapseStore } from "@/stores/collapse";
const store = collapseStore();
// eslint-disable-next-line vue/return-in-computed-property
const stauts = computed(() => {
  return store.getCollapse;
});
const route = useRoute();
//获取激活的菜单
const activeIndex = computed(() => {
  const { path } = route;
  return path;
});
//菜单数据
let menuList = reactive([
  {
    path: "/home",
    component: "Layout",
    name: "home",
    meta: {
      title: "首页",
      icon: "Promotion",
      roles: ["sys:home"],
    },
  },
  {
    path: "/system",
    component: "Layout",
    name: "system",
    meta: {
      title: "系统管理",
      icon: "Setting",
      roles: ["sys:manage"],
    },
    children: [
      {
        path: "/userList",
        component: "/system/User/UserList",
        name: "userList",
        meta: {
          title: "用户管理",
          icon: "UserFilled",
          roles: ["sys:user"],
        },
      },
      {
        path: "/roleList",
        component: "/system/Role/RoleList",
        name: "roleList",
        meta: {
          title: "角色管理",
          icon: "Wallet",
          roles: ["sys:role"],
        },
      },
      {
        path: "/menuList",
        component: "/system/Menu/MenuList",
        name: "menuList",
        meta: {
          title: "菜单管理",
          icon: "Menu",
          roles: ["sys:menu"],
        },
      },
    ],
  },
  {
    path: "/goodsRoot",
    component: "Layout",
    name: "goodsRoot",
    meta: {
      title: "物资管理",
      icon: "HelpFilled",
      roles: ["sys:goodsRoot"],
    },
    children: [
      {
        path: "/goodsType",
        component: "/goods/GoodsType",
        name: "goodsType",
        meta: {
          title: "物资类型",
          icon: "Histogram",
          roles: ["sys:goodsType"],
        },
      },
      {
        path: "/goodsList",
        component: "/goods/GoodsList",
        name: "goodsList",
        meta: {
          title: "物资信息",
          icon: "Wallet",
          roles: ["sys:goodsList"],
        },
      },
    ],
  },
]);
</script>
<style scoped lang="scss">
.menu {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
  }
  .el-menu {
    border-right: none;
  }

  :deep(.el-sub-menu .el-sub-menu__title) {
    color: #f4f4f5 !important;
  }

  :deep(.el-menu .el-menu-item) {
    color: #bfcbd9;
  }
  /* 菜单点中文字的颜色 */

  :deep(.el-menu-item.is-active) {
    color: #e27b5b !important;
  }
  /* 当前打开菜单的所有子菜单颜色 */

  :deep(.is-opened .el-menu-item) {
    background-color: #6f4034 !important;
  }
  /* 鼠标移动菜单的颜色 */

  :deep(.el-menu-item:hover) {
    background-color: #5f392e !important;
  }
}
</style>
