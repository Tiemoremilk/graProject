<template>
  <el-main height="">
    <!-- 搜索 -->
    <el-form
      :model="listParam"
      :inline="true"
      size="default"
      ref="referenceRef"
    >
      <el-form-item prop="nickName">
        <el-input
          v-model="listParam.nickName"
          placeholder="请输入昵称"
        ></el-input>
      </el-form-item>
      <el-form-item prop="phone">
        <el-input
          v-model="listParam.phone"
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
    <!-- 列表 -->
    <el-table :height="tableHeight" :data="tableList.dataList" border stripe>
      <el-table-column prop="nickName" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别" width="60">
        <template #default="scope">
          <div class="sex">
            <el-tag v-if="scope.row.sex == '0'" size="default" effect="light"
              >男</el-tag
            >
            <el-tag v-if="scope.row.sex == '1'" size="default" effect="light"
              >女</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="roleName" label="角色">
        <!-- <template #default="scope"></template> -->
      </el-table-column>
      <el-table-column prop="enabled" width="80" label="状态">
        <template #default="scope">
          <el-tag
            v-if="scope.row.enabled == true"
            type="success"
            size="default"
            effect="light"
            >启用</el-tag
          >
          <el-tag
            v-if="scope.row.enabled == false"
            type="danger"
            size="default"
            effect="light"
            >停用</el-tag
          ></template
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="账号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column prop="createTime" width="130" label="创建时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon v-if="scope.row.createTime ? true : false"
              ><timer
            /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.createTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" width="130" label="更新时间">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon v-if="scope.row.updateTime ? true : false"
              ><timer
            /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.updateTime }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="320" align="center">
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
            color="#A78B7E"
            :icon="Warning"
            plain
            size="default"
            @click="resetPassword(scope.row)"
            >重置密码</el-button
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
      v-model:current-page="listParam.currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="listParam.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParam.total"
      background
    >
      :pager-count="7">
    </el-pagination>
    <!-- <AddUser ref="addRef" /> -->
    <AddUser @refresh="refresh" ref="addRef"></AddUser>
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
import useTable from "@/composables/user/useTable";
import useUser from "@/composables/user/useUser";
import AddUser from "./AddUser.vue";
import { ref } from "vue";
const {
  listParam,
  searchBtn,
  resetBtn,
  tableList,
  sizeChange,
  currentChange,
  tableHeight,
  refresh,
} = useTable();
const { editBtn, addBtn, addRef, deleteBtn, resetPassword } = useUser(refresh);
const referenceRef = ref<null | { resetFields: () => null }>(null);
const reset = () => {
  referenceRef.value?.resetFields();
  resetBtn();
};
</script>

<style lang="scss" scoped>
.sex {
  :deep(.el-tag) {
    --el-tag-bg-color: rgb(246, 243, 242) !important;
    --el-tag-border-color: #a78b7e !important;
    --el-tag-text-color: #a78b7e !important;
  }
}
</style>
