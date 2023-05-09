<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParam" :inline="true" size="default">
      <el-form-item>
        <el-input v-model="listParam.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" color="#FFF" :icon="Search"
        >搜索
        </el-button
        >
        <el-button @click="resetBtn" color="#FFF" :icon="Refresh">重置</el-button>
        <el-button @click="addBtn" color="#A78B7E" plain :icon="Plus"
        >新增
        </el-button
        >
      </el-form-item>
    </el-form>
    <el-table :height="tableHeight" :data="tableList.list" border stripe>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="contentText" label="内容"></el-table-column>
      <el-table-column prop="createTime" label="时间"></el-table-column>
      <el-table-column label="操作" align="center" width="200">
        <template #default="scope">
          <el-button
            :icon="Edit"
            color="#A78B7E"
            plain
            @click="editBtn(scope.row)"
            size="default"
          >编辑
          </el-button
          >
          <el-button
            :icon="Delete"
            plain
            type="danger"
            size="default"
            @click="deleteBtn(scope.row)"
          >删除
          </el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:current-page="listParam.currentPage"
      :page-sizes="[10,20, 40, 80, 100]"
      :page-size="listParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParam.total" background>
    </el-pagination>

    <AddNotice ref="addRef" @reFresh="getList"></AddNotice>
  </el-main>

</template>

<script setup lang="ts">
import AddNotice from "./AddNotice.vue";
import { Delete, Edit, Plus, Refresh, Search } from "@element-plus/icons-vue";

import useTable from "@/composables/noticeRoot/useTable";
import useNotice from "@/composables/noticeRoot/useNotice";

//表格
const { listParam, getList, resetBtn, searchBtn, tableList, sizeChange, currentChange, tableHeight } = useTable();
//新增、编辑
const { addBtn, editBtn, deleteBtn, addRef } = useNotice(getList);
</script>

<style scoped>

</style>