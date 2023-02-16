<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :model="listParam"
      :inline="true"
      size="default"
      ref="referenceRef"
    >
      <el-form-item prop="categoryName">
        <el-input
          v-model="listParam.categoryName"
          placeholder="请输入物资分类名称"
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
    <!-- 列表 -->
    <el-table :height="tableHeight" :data="tableList.dataList" border stripe>
      <el-table-column prop="categoryName" label="物资分类名称">
      </el-table-column>
      <el-table-column prop="orderNum" label="排序"> </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button
            :icon="Edit"
            color="#A78B7E"
            plain
            @click="editBtn(scope.row)"
            size="default"
            >编辑</el-button
          >
          <el-button
            :icon="Delete"
            plain
            type="danger"
            size="default"
            @click="deleteBtn(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:current-page="listParam.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParam.total"
      background
    >
      :pager-count="7">
    </el-pagination>
    <!-- 新增或者编辑的弹框属性 -->
    <AddmaterialCategory ref="addRef" @refresh="refresh"></AddmaterialCategory>
  </el-main>
</template>

<script setup lang="ts">
import "@/assets/elementPlusBase.scss";
import useTable from "@/composables/materialCategory/useTable";
import useMaterialCategory from "@/composables/materialCategory/useMaterialCategory";
import AddmaterialCategory from "./AddmaterialCategory.vue";
import { ref } from "vue";
import {
  Search,
  Edit,
  Plus,
  Refresh,
  Delete,
  Timer,
} from "@element-plus/icons-vue";
const {
  sizeChange,
  currentChange,
  listParam,
  searchBtn,
  resetBtn,
  tableList,
  tableHeight,
  refresh,
} = useTable();
const { addBtn, deleteBtn, editBtn, addRef } = useMaterialCategory(refresh);
const referenceRef = ref<null | { resetFields: () => null }>(null);
const reset = () => {
  referenceRef.value?.resetFields();
  resetBtn();
};
</script>

<style scoped></style>
