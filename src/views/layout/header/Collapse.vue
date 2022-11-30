<template>
  <el-icon
    :size="20"
    color="#fff"
    style="cursor: pointer"
    @click="setCollapseStore"
  >
    <component :is="stauts ? Fold : Expand"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { collapseStore } from "@/stores/collapse/index";
import { Expand, Fold } from "@element-plus/icons-vue";
import { computed } from "vue";
const store = collapseStore();
// eslint-disable-next-line vue/return-in-computed-property
const stauts = computed(() => {
  return store.getCollapse;
});
const setCollapseStore = () => {
  store.setCollapse(!store.collapse);
};
</script>

<style lang="scss" scoped></style>
