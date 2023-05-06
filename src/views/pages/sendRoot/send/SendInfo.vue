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
        <el-form-item label="省份" size="default">
          <elui-china-area-dht
            v-model="address"
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
          <el-button size="default" :icon="EditPen" @click=""
            >选择物资</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button color="#F5F0EA">取消</el-button>
          <el-button color="#7A6A61" @click="onSubmit">确定 </el-button>
        </el-form-item>
      </el-form>
    </el-aside>
    <el-main class="mainContainer">
      <div class="title">物资信息信息</div>
      <el-divider />
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import { EluiChinaAreaDht } from "elui-china-area-dht";
const chinaData = new EluiChinaAreaDht.ChinaArea().chinaAreaflat;
const address = ref([]);
//表单对象
const addModel = reactive({
  type: "",
  province: "",
  detailSource: "",
  name: "",
  phone: "",
  email: "",
  infos: [],
});
const onChange = (e: any) => {
  const economize = chinaData[e[0]]?.label ?? "";
  const market = chinaData[e[1]]?.label ?? "";
  const distinguish = chinaData[e[2]]?.label ?? "";
  addModel.province = economize + "/" + market + "/" + distinguish;
  console.log(economize, market, distinguish);
};
//表单验证规则
const rules = reactive({
  type: [
    {
      required: true,
      trigger: "blur",
      message: "请选择入库类型",
    },
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
const onSubmit = () => {};
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
}
.asideContainer {
  min-width: 250px;
  border-right: 1px solid #e4e7ed;
}
.mainContainer {
  padding: 0;
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
