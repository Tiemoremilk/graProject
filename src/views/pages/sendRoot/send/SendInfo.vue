<template>
  <el-container id="container" :style="{ height: mainHeight + 'px' }">
    <el-aside width="30%" class="asideContainer">
      <div class="title">入库信息</div>
      <el-divider />
      <el-form
        :model="addModel"
        ref="addRef"
        :rules="rules"
        label-width="80px"
        :inline="false"
        size="normal"
      >
        <el-form-item prop="type" label="入库类型">
          <el-radio-group v-model="addModel.type">
            <el-radio :label="1">捐赠</el-radio>
            <el-radio :label="2">下拨</el-radio>
            <el-radio :label="3">采购</el-radio>
            <el-radio :label="4">借用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="省份" size="default" prop="province" class="cascader">
          <elui-china-area-dht
            v-model="address"
            placeholder="请选择省市区"
            isall
            @change="onChange"
          ></elui-china-area-dht>
        </el-form-item>
        <el-form-item label="详细来源" prop="detailSource" size="default">
          <el-input v-model="addModel.detailSource"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="name" size="default">
          <el-input v-model="addModel.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" size="default">
          <el-input v-model="addModel.email"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone" size="default">
          <el-input v-model="addModel.phone"></el-input>
        </el-form-item>
        <el-form-item label="物资明细" size="default">
          <el-button
            size="default"
            color="#FFF"
            :icon="List"
            @click="selectInfo"
          >选择物资
          </el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button color="#F5F0EA" @click="cancel">取消</el-button>
          <el-button color="#7A6A61" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main class="mainContainer">
      <div class="title">
        物资信息
      </div>
      <el-divider />
      <el-table :data="addTableData.list" border stripe>
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
        <el-table-column prop="num" label="数量" width="180">
          <template #default="scope">
            <el-input-number
              @change="change"
              size="default"
              v-model="scope.row.num"
              :min="1"
              label="数量"
            ></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="110">
          <template #default="scope">
            <el-button
              @click="deleteAddBtn(scope.row)"
              plain
              type="danger"
              :icon="Delete"
              size="default"
            >删除
            </el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
  <el-drawer custom-class="faDrawer" v-model="drawer" direction="rtl" size="35%">
    <template #title>
      <el-select v-model="selectParm.categoryId" placeholder="请选择物资类型" size="default">
        <el-option
          v-for="item in materialCategoryData.list"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-input
        v-model="selectParm.infoName"
        style="width: 30%; margin-left: 20px"
        placeholder="请输入物资名称"
      ></el-input>
      <el-button
        style="margin: 0px 2px 0 10px"
        :icon="Search"
        color="#DCDFE6"
        size="default"
        @click="searchSelect"
      >搜索
      </el-button>
      <el-button
        :icon="Refresh"
        color="#DCDFE6"
        size="default"
        @click="resetSelect"
      >
      </el-button>

    </template>
    <template #default>
      <el-table :data="selectTable.list" :height="selectTableHeight" border stripe>
        <el-table-column prop="image" width="90" label="物资图片" align="center">
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
        <el-table-column label="操作" align="center" width="110">
          <template #default="scope">
            <el-button type="primary" color="#BB9D8E" :icon="Plus" size="default" @click="addBtn(scope.row)">加入
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        v-model:current-page="selectParm.currentPage"
        :page-sizes="[10, 20, 40, 80, 100]"
        :page-size="selectParm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="selectParm.total"
        background
      ></el-pagination>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import useSelectInfo from "@/composables/intoRoot/into/useSelectInfo";
import infoSelectCategory from "@/composables/materialInfo/infoSelectCategory";
import { nextTick, onMounted, reactive, ref } from "vue";
import { EluiChinaAreaDht } from "elui-china-area-dht";
import { Delete, List, Plus, Refresh, Search } from "@element-plus/icons-vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";


const {
  selectParm, selectTable, getSelectList, searchSelect, resetSelect, sizeChange,
  currentChange, selectTableHeight, addBtn, addTableData, deleteAddBtn
} = useSelectInfo();
const { materialCategoryData, materialCategoryList } = infoSelectCategory();
const router = useRouter();
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
const address = ref([]);
const drawer = ref(false);
const categoryId = ref("");
//表单ref属性
const addRef = ref<FormInstance>();
//表单对象
const addModel = reactive({
  type: "",
  province: "",
  detailSource: "",
  name: "",
  phone: "",
  email: "",
  infos: []
});
const onChange = (e: any) => {
  const economize = chinaData[e[0]]?.label ?? "";
  const market = chinaData[e[1]]?.label ?? "";
  const distinguish = chinaData[e[2]]?.label ?? "";
  addModel.province = economize + "/" + market + "/" + distinguish;
  console.log(economize, market, distinguish);
};
const selectInfo = async () => {
  await materialCategoryList();
  await getSelectList();
  drawer.value = true;
};
//入库提交
const onSubmit = () => {
  if (addTableData.list.length == 0) {
    ElMessage.warning("请选择物资信息!");
    return;
  }
  addRef.value?.validate((val) => {
    if (val) {
      addModel.infos = addTableData.list as any;
      router.push({ name: "intoDetail" });
      addRef.value?.resetFields();
    }
  });
};
const change = () => {
};
//取消
const cancel = () => {
  address.value = [];
  addModel.province = "";
  addRef.value?.resetFields();
};
//表单验证规则
const rules = reactive({
  type: [
    {
      required: true,
      trigger: "blur",
      message: "请选择入库类型"
    }
  ],
  province: [
    {
      required: true,
      trigger: "blur",
      message: "请选择省市区",
    },
  ],
  detailSource: [
    {
      required: true,
      trigger: "blur",
      message: "请填写详细来源",
    },
  ],
  name: [
    {
      required: true,
      trigger: "blur",
      message: "请填写联系人",
    },
  ],
  phone: [
    {
      required: true,
      trigger: "blur",
      message: "请填写联系电话",
    },
  ],
  email: [
    {
      required: true,
      trigger: "blur",
      message: "请填写邮箱",
    },
  ],
});

const mainHeight = ref(0);
onMounted(() => {
  nextTick(() => {
    mainHeight.value = window.innerHeight - 100;
  });
});
</script>

<style scoped>
#container {
    padding: 20px 10px;

    :deep(.el-cascader) {
        width: 100%;
    }
}
.asideContainer {
  min-width: 250px;
  border-right: 1px solid #e4e7ed;
}
.mainContainer {
    padding: 0px 0px 0px 10px;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  cursor: text;
  letter-spacing: 2px;
  font-size: 18px;
}
</style>
