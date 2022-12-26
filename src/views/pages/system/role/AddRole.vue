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
              <el-input v-model="addModel.roleName"></el-input> </el-form-item
          ></el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="remark" label="备注">
              <el-input v-model="addModel.remark"></el-input> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import type { AddRoleModel } from "@/api/role/roleModel";
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { addApi } from "@/api/role";
const addFormRef = ref<FormInstance>();
const { dialog, onClose, onConfirm, onShow } = sysDialog();
defineExpose({
  onShow,
});
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
//表单提交
const onSubmit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      console.log(addModel);
      let res = await addApi(addModel);
      console.log(res);
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        onClose();
      }
    }
  });
};
</script>

<style scoped></style>
