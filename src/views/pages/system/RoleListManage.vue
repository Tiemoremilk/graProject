<template>
  <div>
    <el-button color="#7A6A61" size="default" @click="addBtn">新增</el-button>
    <SysDialog
      :visible="dialog.visible"
      :height="dialog.height"
      :title="dialog.title"
      v-on:on-close="onClose"
      @on-confirm="onConfirm"
    >
      <template v-slot:content>This is Dialog</template>
    </SysDialog>
  </div>
</template>

<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import sysDialog from "@/utils/sysDialog";
const { dialog, onConfirm, onClose } = sysDialog();
const addBtn = () => {
  (dialog.title = "新增"), (dialog.visible = true);
};
</script>

<style scoped></style>
