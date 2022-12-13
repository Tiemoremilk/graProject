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
  </el-main>
</template>

<script setup lang="ts">
import { Search, Edit, Plus, Refresh, Delete } from "@element-plus/icons-vue";
import useRole from "@/composables/role/useRole";
import useTable from "@/composables/role/useTable";

const { listParm, searchBtn, resetBtn } = useTable();
const { addBtn, deleteBtn, editBtn } = useRole();
</script>

<style lang="scss">

</style>
