<template>
  <SysDialog
    :title="dialog.title"
    :visible="dialog.visible"
    :height="dialog.height"
    :width="dialog.width"
    @onClose="onClose"
    @onConfirm="commit"
  >
    <template v-slot:content>
      <el-form
        :model="addModel"
        ref="addFormRef"
        :rules="rules"
        label-width="80px"
        size="default"
      >
        <el-form-item prop="title" label="标题">
          <el-input v-model="addModel.title"></el-input>
        </el-form-item>
        <el-form-item prop="contentText" label="内容">
          <el-input type="textarea" v-model="addModel.contentText"></el-input>
        </el-form-item>
      </el-form>
    </template>
  </SysDialog>
</template>

<script setup lang="ts">

import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
import { nextTick, reactive, ref } from "vue";

import { addNotice, editNotice } from "@/api/noticeRoot";
import type { NoticeType } from "@/type/noticeModel";
import { EditType, Title } from "@/type/enumType";
import sysDialog from "@/utils/sysDialog";
//表单ref属性
const addFormRef = ref<FormInstance>();
//弹框属性
const { dialog, onClose, onConfirm, onShow } = sysDialog();
//弹框显示
const show = (type: string, row?: NoticeType) => {
  //设置弹框属性
  type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT;
  //编辑，数据回显
  if (row && type == EditType.EDIT) {
    nextTick(() => {
      Object.assign(addModel, row);
    });
  }
  onShow();
  //清空表单
  addFormRef.value?.resetFields();
  addModel.type = type;
};
//暴露出去
defineExpose({
  show
});
//定义表单绑定对象
const addModel = reactive<NoticeType>({
  noticeId: "",
  title: "",
  contentText: "",
  type: ""
});
//表单验证规则
const rules = reactive({
  title: [
    {
      required: true,
      message: "请填写标题",
      trigger: "blur"
    }
  ],
  contentText: [
    {
      required: true,
      message: "请填写内容",
      trigger: "blur"
    }
  ]
});
//注册事件
const emits = defineEmits(["reFresh"]);
//提交表单
const commit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      let res: any = null;
      if (addModel.type == EditType.ADD) {
        res = await addNotice(addModel);
      } else {
        res = await editNotice(addModel);
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        //刷新表格
        emits("reFresh");
        onClose();
      }
    }
  });
};
</script>

<style scoped></style>