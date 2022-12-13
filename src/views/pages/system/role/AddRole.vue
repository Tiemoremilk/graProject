<template>
  <SysDialogVue
    :title="dialog.title"
    :width="dialog.width"
    :height="dialog.height"
    :visible="dialog.visible"
    @on-close="onClose"
    @on-confirm="onConfirm"
  >
    <template #content> 新增角色 </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
const { dialog, onClose, onConfirm, onShow } = sysDialog();
defineExpose({
  onShow,
});
</script>

<style scoped></style>
