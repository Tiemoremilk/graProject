<!-- eslint-disable vue/no-unused-vars -->
<template>
  <el-main>
    <!-- 搜索栏 -->
    <el-form :model="listParm" :inline="true" size="default" ref="referenceRef">
      <el-form-item prop="roleName" label="">
        <el-input
          v-model="listParm.roleName"
          placeholder="请输入角色名称"
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
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
      ></el-table-column>
      <el-table-column prop="remark" label="备注"></el-table-column>
      <el-table-column prop="createTime" width="180" label="创建时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon v-if="scope.row.createTime ? true : false"
              ><timer
            /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" width="180" label="更新时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon v-if="scope.row.updateTime ? true : false"
              ><timer
            /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
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
          <!-- <el-popconfirm
            width="220"
            title="确定要删除该角色么?"
            @confirm="deleteBtn"
            confirm-button-type="danger"
            :icon="InfoFilled"
            icon-color="#f56c6c"
          >
            <template #reference>
              <el-button :icon="Delete" plain type="danger" size="default"
                >删除</el-button
              >
            </template>
          </el-popconfirm> -->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      v-model:current-page="listParm.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total"
      background
    >
      :pager-count="7">
    </el-pagination>

    <!-- 新增或者编辑的弹框属性 -->
    <AddRoleVue ref="addRef" @refresh="refresh"></AddRoleVue>
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
import useRole from "@/composables/role/useRole";
import useTable from "@/composables/role/useTable";
import AddRoleVue from "./AddRole.vue";
import { ref } from "vue";

const {
  listParm,
  searchBtn,
  resetBtn,
  tableList,
  sizeChange,
  currentChange,
  tableHeight,
  refresh,
} = useTable();
const { addBtn, deleteBtn, editBtn, addRef } = useRole(refresh);
// 重置
// let referenceRef = ref(null);
//const reset = () => {
//   referenceRef.value.resetFields();
// };
const referenceRef = ref<null | { resetFields: () => null }>(null);
const reset = () => {
  referenceRef.value?.resetFields();
  resetBtn();
};
</script>

<style lang="scss" scope></style>
