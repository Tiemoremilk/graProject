<template>
  <SysDialogVue
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="onSubmit"
    @keyup.enter="onSubmit"
  >
    <template #content>
      <el-form
        :model="addModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-form-item prop="type" label="菜单类型">
          <el-radio-group v-model="addModel.type">
            <el-radio :label="'0'">目录</el-radio>
            <el-radio :label="'1'">菜单</el-radio>
            <el-radio :label="'2'">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="parentName" label="上级菜单">
              <el-input
                @click="selectParent"
                readonly
                v-model="addModel.parentName"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="title" label="菜单名称">
              <el-input v-model="addModel.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="addModel.type != '2'">
          <el-col :span="12" :offset="0">
            <el-form-item prop="icon" label="菜单图标">
              <el-input v-model="addModel.icon"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="name" label="路由名称">
              <el-input v-model="addModel.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="orderNum" label="菜单序号">
              <el-input v-model="addModel.orderNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="code" label="权限字段">
              <el-input v-model="addModel.code"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="addModel.type != '2'" :offset="0">
            <el-form-item prop="path" label="路由地址">
              <el-input v-model="addModel.path"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="addModel.type == '1'" :offset="0">
            <el-form-item prop="url" label="组件路径">
              <el-input v-model="addModel.url"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialogVue>
  <!-- 上级菜单-->
  <ParentMenu ref="parentRef" @selectParentNode="selectParentNode"></ParentMenu>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import { defineAsyncComponent } from "vue";
import { EditType, Title } from "@/type/enumType";
import type { MenuType, SelectNode } from "@/type/menuModel";
import { nextTick, reactive, ref } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import useInstance from "@/hooks/useInstance";
import { addApi, editApi } from "@/api/menu";
//异步组件。对一些比较重的组件，尤其是需要我们从后端获取数据后才显示的组件，用一层 defineAsyncComponent套起来
const ParentMenu = defineAsyncComponent(() => import("./ParentMenu.vue"));
const { dialog, onClose, onConfirm, onShow } = sysDialog();
const { global } = useInstance();
const addFormRef = ref<FormInstance>();
const parentRef = ref<{ showParent: () => void }>();
//菜单数据
const addModel = reactive<MenuType>({
  editType: "",
  menuId: "",
  parentId: "",
  title: "",
  code: "",
  name: "",
  path: "",
  url: "",
  type: "0",
  icon: "",
  parentName: "",
  orderNum: "",
});
//表单验证规则
const rules = reactive({
  type: [
    {
      required: true,
      trigger: "blur",
      message: "请选择菜单类型",
    },
  ],
  parentId: [
    {
      required: true,
      trigger: "change",
      message: "请选择上级菜单",
    },
  ],
  title: [
    {
      required: true,
      trigger: "change",
      message: "请填写菜单名称",
    },
  ],
  code: [
    {
      required: true,
      trigger: "change",
      message: "请填写权限字段",
    },
  ],
  name: [
    {
      required: true,
      trigger: "change",
      message: "请填写路由名称",
    },
  ],
  path: [
    {
      required: true,
      trigger: "change",
      message: "请填写路由地址",
    },
  ],
  url: [
    {
      required: true,
      trigger: "change",
      message: "请填写组件路径",
    },
  ],
});
const show = (type: string, row?: MenuType) => {
  dialog.height = 250;
  type == EditType.ADD
    ? (dialog.title = Title.ADD)
    : (dialog.title = Title.EDIT);
  if (type == EditType.EDIT) {
    //设置回显数据
    nextTick(() => {
      global.$easyCopy(row, addModel);
    });
  }
  onShow();
  addModel.editType = type;
  addFormRef.value?.resetFields();
};
//上级菜单选择事件
const selectParent = () => {
  parentRef.value?.showParent();
};
//注册事件
const emits = defineEmits(["refresh"]);
//表单提交
const onSubmit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      let res = reactive<any>(null);
      if (addModel.editType == EditType.ADD) {
        res = await addApi(addModel);
      } else {
        res = await editApi(addModel);
      }
      if (res && res.code == 200) {
        //子组件调用父组件的方法
        emits("refresh");
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
      }
      onConfirm();
    }
  });
};
const selectParentNode = (node: SelectNode) => {
  addModel.parentId = node.parentId;
  addModel.parentName = node.parentName;
};
defineExpose({
  show,
});
</script>

<style scoped></style>
