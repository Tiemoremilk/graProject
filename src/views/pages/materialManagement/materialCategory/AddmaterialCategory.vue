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
        <el-form-item prop="categoryName" label="分类名称">
          <el-input v-model="addModel.categoryName"></el-input>
        </el-form-item>
        <el-form-item prop="orderNum" label="排序">
          <el-input v-model="addModel.orderNum"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import type { materialCategoryType } from "@/type/materialCategoryModel";
import { EditType, Title } from "@/type/enumType";
import { nextTick, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";
import { addApi, editApi } from "@/api/materialCategory";
import { ElMessage, type FormInstance } from "element-plus";
const { dialog, onClose, onConfirm, onShow } = sysDialog();

const { global } = useInstance();
const addFormRef = ref<FormInstance>();
const show = (type: string, row?: materialCategoryType) => {
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
  addModel.type = type;
  addFormRef.value?.resetFields();
};
//表单绑定数据
const addModel = reactive<materialCategoryType>({
  type: "",
  categoryId: "",
  categoryName: "",
  orderNum: "",
});
//表单验证规则
const rules = reactive({
  categoryName: [
    {
      required: true,
      trigger: "change",
      message: "请填写物资分类名称",
    },
  ],
});
//注册事件
const emits = defineEmits(["refresh"]);

//表单提交
const onSubmit = () => {
  addFormRef.value?.validate(async (valid: any) => {
    if (valid) {
      let res = reactive<any>(null);
      if (addModel.type == EditType.ADD) {
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

defineExpose({
  show,
});
</script>

<style scoped></style>
