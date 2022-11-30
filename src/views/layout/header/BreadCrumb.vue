<template>
  <el-breadcrumb separator="/" class="bread">
    <el-breadcrumb-item v-for="item in tabs" :key="item.path">{{
      item.meta.title
    }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { watch, type Ref, ref } from "vue";
import { useRoute, type RouteLocationMatched } from "vue-router";
const tabs: Ref<RouteLocationMatched[]> = ref([]);
const route = useRoute();
const getBreadCrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const home = matched[0];
  if (home.path != "/home") {
    matched = [{ path: "/home", meta: { title: "首页" } } as any].concat(
      matched
    );
  }
  tabs.value = matched;
};
getBreadCrumb();
watch(
  () => route.path,
  () => getBreadCrumb()
);
</script>

<style scoped lang="scss">
.bread {
  margin-left: 20px;
  :deep(.el-breadcrumb__inner) {
    color: #fff !important;
    a {
      color: #fff !important;
    }
  }
}
</style>
