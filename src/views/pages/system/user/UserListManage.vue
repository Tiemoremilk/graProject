<template>
  <el-main height="">
    <!-- 搜索 -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input
          v-model="listParm.nickName"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="listParm.phone"
          placeholder="请输入手机号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">搜索</el-button>
        <el-button @click="reset" :icon="Refresh">重置</el-button>
        <el-button @click="addBtn" color="#A78B7E" plain :icon="Plus"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- <AddUser ref="addRef" /> -->
    <AddUser ref="addRef"></AddUser>
  </el-main>
</template>

<script setup lang="ts">
import "@/assets/elementPlusBase.scss";
import {
  Search,
  Edit,
  Plus,
  Refresh,
  Delete,
  Timer,
} from "@element-plus/icons-vue";
import useTable from "@/composables/user/useTable";
import user from "@/composables/user/user";
import AddUser from "./AddUser.vue";
import { ref } from "vue";
const { listParm, searchBtn, resetBtn } = useTable();
const { editBtn, addBtn, addRef, deleteBtn } = user();
const referenceRef = ref<null | { resetFields: () => null }>(null);
const reset = () => {
  referenceRef.value?.resetFields();
  resetBtn();
};
</script>

<style scoped></style>
