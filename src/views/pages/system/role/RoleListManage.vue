<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" :inline="true" size="normal">
      <el-form-item label="">
        <el-input
          v-model="listParm.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">搜索</el-button>
        <el-button @click="resetBtn" :icon="Refresh">重置</el-button>
        <el-button @click="addBtn" :icon="Plus">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 新增或者编辑的弹框属性 -->
    <AddRoleVue ref="addRef"></AddRoleVue>
  </el-main>
</template>

<script setup lang="ts">
import "@/assets/elementPlusBase.css";
import { Search, Edit, Plus, Refresh, Delete } from "@element-plus/icons-vue";
import useRole from "@/composables/role/useRole";
import useTable from "@/composables/role/useTable";
import AddRoleVue from "./AddRole.vue";

const { listParm, searchBtn, resetBtn } = useTable();
const { addBtn, deleteBtn, editBtn, addRef } = useRole();
</script>

<style lang="scss" scope></style>
