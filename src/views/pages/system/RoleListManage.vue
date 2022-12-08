<template>
  <div>
    <el-button type="primary" size="default" @click="addBtn">新增</el-button>
    <SysDialog
      :visible="dialog.visible"
      :height="dialog.height"
      v-on:on-close="onClose"
      @on-confirm="onConfirm"
    >
      <template v-slot:content>我是弹窗</template>
    </SysDialog>
  </div>
</template>

<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import { reactive } from "vue";
const addBtn = () => {
  dialog.visible = true;
};
//弹窗
const dialog = reactive({
  visible: false,
  height: 150,
});
const onConfirm = () => {
  dialog.visible = false;
};
const onClose = () => {
  dialog.visible = false;
};
</script>

<style scoped></style>
