<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <el-container class="layout">
    <el-aside class="asside">
      <MenuBar></MenuBar>
    </el-aside>
    <el-container>
      <el-header class="header">
        <Header></Header>
      </el-header>
      <el-main class="main">
        <Tabs></Tabs>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Header from "@/views/layout/header/Header.vue";
import MenuBar from "@/views/layout/menu/MenuBar.vue";
import Tabs from "./tabs/Tabs.vue";
</script>

<style scoped lang="scss">
.layout {
  min-height: 100vh;
  width: 100%;
  .asside {
    width: auto;
    background-color: #3e3c3b;
  }
  .header {
    height: 50px;
    background: linear-gradient(to right, #3e3c3b, #d3ad9a);
    display: flex;
    align-items: center;
  }
  .main {
    background-color: #dfd8d2;
    padding-top: 1px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}
</style>
