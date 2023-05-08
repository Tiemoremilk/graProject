<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form
      :model="listParam"
      :inline="true"
      size="default"
      ref="referenceRef"
    >
      <el-form-item prop="infoName">
        <el-input
          v-model="listParam.infoName"
          placeholder="请输入物资信息名称"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" color="#FFF" :icon="Search"
          >搜索</el-button
        >
        <el-button @click="reset" color="#FFF" :icon="Refresh">重置</el-button>
        <el-button @click="addBtn" color="#A78B7E" plain :icon="Plus"
          >新增</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <el-table :height="tableHeight" :data="tableList.dataList" border stripe>
      <el-table-column prop="image" width="90" label="物资图片" align="center">
        <template #default="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.image"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="infoName" label="物资信息名称"> </el-table-column>
      <el-table-column prop="infoName" label="物资分类名称"> </el-table-column>
      <el-table-column prop="specs" label="规格"> </el-table-column>
      <el-table-column prop="unit" label="单位"> </el-table-column>
      <el-table-column prop="store" label="库存"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
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
      :page-sizes="[1, 20, 30, 40]"
      :page-size="listParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParam.total"
      background
    >
      :pager-count="7">
    </el-pagination>
    <!-- 新增或者编辑的弹框属性 -->
    <AddMaterialInfo ref="addRef" @refresh="refresh"></AddMaterialInfo>
  </el-main>
</template>

<script setup lang="ts">
import useMaterialInfo from "@/composables/materialInfo/useMaterialInfo";
import useTable from "@/composables/materialInfo/useTable";
import { Delete, Edit, Plus, Refresh, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import AddMaterialInfo from "./AddMaterialInfo.vue";

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
const { addBtn, deleteBtn, editBtn, addRef } = useMaterialInfo(refresh);
const referenceRef = ref<null | { resetFields: () => null }>(null);
const reset = () => {
  referenceRef.value?.resetFields();
  resetBtn();
};
</script>

<style scoped lang="scss"></style>
