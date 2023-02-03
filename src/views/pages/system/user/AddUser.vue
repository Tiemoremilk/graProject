<template>
  <SysDialogVue
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="commit"
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
            <el-form-item prop="nickName" label="姓名">
              <el-input v-model="addModel.nickName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="sex" label="性别">
              <el-radio-group v-model="addModel.sex">
                <el-radio :label="'0'">男</el-radio>
                <el-radio :label="'1'">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="phone" label="电话">
              <el-input v-model="addModel.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" prop="email" :offset="0">
            <el-form-item label="邮箱">
              <el-input v-model="addModel.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="roleId" label="角色">
              <el-select
                v-model="addModel.roleId"
                style="width: 100%"
                placeholder="请选择角色"
                size="default"
              >
                <el-option
                  v-for="item in roleData.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="isEnable" label="状态">
              <el-radio-group v-model="addModel.isEnabled">
                <el-radio :label="true">启用</el-radio>
                <el-radio :label="false">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="username" label="账号">
              <el-input v-model="addModel.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="password" label="密码">
              <el-input v-model="addModel.password"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import type { AddUserModel } from "@/type/userModel";
import userSelectRole from "@/composables/user/userSelectRole";
import { EditType, Title } from "@/type/enumType";
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
import "@/api/user/index";
const { roleData, listRole } = userSelectRole();
const addFormRef = ref<FormInstance>();
const { dialog, onClose, onConfirm, onShow } = sysDialog();
// const show = (type: string, row?: AddUserModel) => {
//   type == EditType.ADD
//     ? (dialog.title = Title.ADD)
//     : (dialog.title = Title.EDIT);
//   onShow();
// };
const show = async () => {
  dialog.height = 200;
  await listRole();
  onShow();
};

defineExpose({
  show,
});

const addModel = reactive<AddUserModel>({
  type: "",
  userId: "",
  roleId: "",
  username: "",
  password: "",
  phone: "",
  email: "",
  sex: "",
  isEnabled: true,
  nickName: "",
});
const rules = reactive({
  nickName: [
    {
      required: true,
      trigger: "blur",
      message: "请填写姓名",
    },
  ],
  phone: [
    {
      required: true,
      trigger: "change",
      message: "请输入电话",
    },
  ],
  sex: [
    {
      required: true,
      trigger: "change",
      message: "请输选择性别",
    },
  ],
  enabled: [
    {
      required: true,
      trigger: "change",
      message: "请输选择状态",
    },
  ],
  username: [
    {
      required: true,
      trigger: "change",
      message: "请输入账户",
    },
  ],
  password: [
    {
      required: true,
      trigger: "change",
      message: "请输入密码",
    },
  ],
  roleId: [
    {
      required: true,
      trigger: "change",
      message: "请选择角色",
    },
  ],
});
/**表单提交 */
const commit = () => {
  addFormRef.value?.validate((valid) => {
    if (valid) {
      onClose();
    }
  });
};
</script>

<style scoped></style>
