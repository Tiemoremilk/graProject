<template>
  <SysDialogVue
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="onSubmit"
  >
    <template #content>
      <el-form
        :model="addModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="roleName" label="角色名称">
              <el-input
                v-model="addModel.roleName"
                hide-required-asterisk
              ></el-input> </el-form-item
          ></el-col>
          <el-col :span="22" :offset="0">
            <el-form-item prop="remark" label="备注">
              <el-input
                v-model="addModel.remark"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import type { AddRoleModel } from "@/type/roleModel";
import { nextTick, reactive, ref } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { addApi, editApi } from "@/api/role";
import { EditType, Title } from "@/type/enumType";
import useInstance from "@/hooks/useInstance";

const { global } = useInstance();
const addFormRef = ref<FormInstance>();
const { dialog, onClose, onConfirm, onShow } = sysDialog();
const show = (type: string, row?: AddRoleModel) => {
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
const addModel = reactive<AddRoleModel>({
  type: "",
  roleId: "",
  roleName: "",
  remark: "",
});
//表单验证规则
const rules = reactive({
  roleName: [
    {
      required: true,
      trigger: "change",
      message: "请填写角色名称",
    },
  ],
});
//注册事件
const emits = defineEmits(["refresh"]);

//表单提交
const onSubmit = () => {
  addFormRef.value?.validate(async (valid) => {
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
      onClose();
    }
  });
};

defineExpose({
  show,
});
</script>

<style scoped></style>
