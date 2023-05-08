<template>
  <el-main>
    <!--搜索栏 -->
    <el-form :model="listParam" :inline="true" size="default">
      <el-form-item>
        <el-input
          v-model="listParam.province"
          placeholder="请输入省份"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listParam.name" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="listParam.status"
          placeholder="请选择审核状态"
          size="default"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select
          v-model="listParam.type"
          placeholder="请选择入库类型"
          size="default"
        >
          <el-option
            v-for="item in optionsType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" color="#FFF" :icon="Search">搜索</el-button>
        <el-button @click="resetBtn" color="#FFF" :icon="Refresh">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :height="tableHeigth" :data="tableList.list" border stripe>
      <!-- 详细信息 给 el-table-column 加上 type="expand" -->
      <el-table-column type="expand">
        <template #default="scope">
          <el-table :data="scope.row.children" border stripe>
            <el-table-column
              prop="image"
              width="90"
              label="物资图片"
              align="center"
            >
              <template #default="scope">
                <el-image
                  style="width: 60px; height: 60px; border-radius: 50%"
                  :src="scope.row.image"
                ></el-image>
              </template>
            </el-table-column>
            <el-table-column prop="infoName" label="物资名称"></el-table-column>
            <el-table-column prop="specs" label="规格"></el-table-column>
            <el-table-column prop="unit" label="单位"></el-table-column>
            <el-table-column prop="num" label="数量"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="province" label="省份" min-width="120">
        <!--        <template #default="scope">-->
        <!--          {{scope.row.province!="0"?scope.row.province:"全部"}}-->
        <!--        </template>-->
      </el-table-column>
      <el-table-column prop="detailSource" label="详细来源" show-overflow-tooltip></el-table-column>
      <el-table-column prop="name" label="联系人" show-overflow-tooltip></el-table-column>
      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip></el-table-column>
      <el-table-column prop="email" label="邮箱" show-overflow-tooltip></el-table-column>
      <el-table-column prop="type" label="类型" align="center" width="70">
        <template #default="scope">
          <el-tag v-if="scope.row.type == '1'" type="info" size="default">捐赠</el-tag>
          <el-tag v-if="scope.row.type == '2'" type="success" size="default"
          >下拨
          </el-tag
          >
          <el-tag v-if="scope.row.type == '3'" type="warning" size="default"
          >采购
          </el-tag
          >
          <el-tag v-if="scope.row.type == '4'" type="danger" size="default"
          >借用
          </el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" align="center" width="100">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '0'" type="info" size="default">待审核</el-tag>
          <el-tag v-if="scope.row.status == '1'" type="success" size="default">审核通过</el-tag>
          <el-tag v-if="scope.row.status == '2'" type="danger" size="default">拒绝入库</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip></el-table-column>
      <el-table-column label="操作" align="center" min-width="140">
        <template #default="scope">
          <el-button
            :icon="Edit"
            color="#A78B7E"
            plain
            @click="applyBtn(scope.row)"
            size="default"
          >同意
          </el-button
          >
          <el-button
            :icon="Delete"
            plain
            type="danger"
            size="default"
            @click="rejectBtn(scope.row)"
          >拒绝
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

  </el-main>
</template>

<script setup lang="ts">
import { Delete, Edit, Refresh, Search } from "@element-plus/icons-vue";
import useDetailTable from "@/composables/intoRoot/intoDetail/useDetailTable";

const {
  listParam,
  tableHeigth,
  resetBtn,
  searchBtn,
  tableList,
  sizeChange,
  currentChange,
  rejectBtn,
  applyBtn
} = useDetailTable();
const options = [
  {
    value: "0",
    label: "未审核"
  },
  {
    value: "1",
    label: "已审核"
  },
  {
    value: "2",
    label: "审核失败"
  }
];
const optionsType = [
  {
    value: "1",
    label: "捐赠"
  },
  {
    value: "2",
    label: "下拨"
  },
  {
    value: "3",
    label: "采购"
  },
  {
    value: "4",
    label: "借用"
  }
];
//表格
</script>

<style scoped></style>