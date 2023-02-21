<template>
  <el-main>
    <el-form size="default">
      <el-form-item>
        <el-button @click="addBtn" color="#A78B7E" plain :icon="Plus"
          >新增</el-button
        >
      </el-form-item>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="tableList.dataList"
      :height="tableHeight"
      style="width: 100%"
      row-key="menuId"
      border
      stripe
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="菜单名称"></el-table-column>
      <el-table-column prop="type" label="类型" width="80" align="center">
        <template #default="scope">
          <div class="type">
            <el-tag
              v-if="scope.row.type == '0'"
              size="default"
              effect="light"
              color="#DED8D8"
              >目录</el-tag
            >
            <el-tag
              v-if="scope.row.type == '1'"
              size="default"
              effect="light"
              color="#F2F2F2"
              >菜单</el-tag
            >
            <el-tag
              v-if="scope.row.type == '2'"
              size="default"
              effect="light"
              color="#FFFFFF"
              >按钮</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="icon" label="图标" width="60" align="center">
        <template #default="scope">
          <el-icon>
            <!-- 动态组件的方式显示图标 -->
            <component :is="scope.row.icon"></component>
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="路由名称"></el-table-column>
      <el-table-column prop="path" label="路由地址"></el-table-column>
      <el-table-column
        prop="url"
        label="组件路径"
        width="220"
      ></el-table-column>
      <el-table-column prop="code" label="权限字段"></el-table-column>
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
        </template>
      </el-table-column>
    </el-table>
    <AddMenu ref="addRef" @refresh="refresh"></AddMenu>
  </el-main>
</template>

<script setup lang="ts">
import { Edit, Plus, Delete } from "@element-plus/icons-vue";
import useMenu from "@/composables/menu/useMenu";
import AddMenu from "./AddMenu.vue";
import useTable from "@/composables/menu/useTable";

const { tableList, getList, tableHeight, refresh } = useTable();
const { addBtn, editBtn, deleteBtn, addRef } = useMenu(refresh);
</script>

<style scoped lang="scss">
.type {
  :deep(.el-tag) {
    --el-tag-bg-color: rgb(246, 243, 242) !important;
    --el-tag-border-color: #a78b7e !important;
    --el-tag-text-color: #a78b7e !important;
  }
}
</style>
