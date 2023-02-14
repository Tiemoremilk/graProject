<template>
  <el-main>
    <el-button @click="addBtn" color="#A78B7E" plain :icon="Plus"
      >新增</el-button
    >
    <AddMenu ref="addRef"></AddMenu>
  </el-main>
</template>

<script setup lang="ts">
import {
  Search,
  Edit,
  Plus,
  Refresh,
  Delete,
  Timer,
  Warning,
} from "@element-plus/icons-vue";
import useMenu from "@/composables/menu/useMenu";
import AddMenu from "./AddMenu.vue";
const { addBtn, editBtn, deleteBtn, addRef } = useMenu();
</script>

<style scoped></style>
