<template>
  <el-dialog
    :model-value="visible"
    :title="title"
    :width="width + 'px'"
    :before-close="onClose"
  >
    <div class="container" :style="{ height: height + 'px' }">
      <slot name="content"></slot>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button color="#F5F0EA" @click="onClose">取消</el-button>
        <el-button color="#7A6A61" @click="onConfirm">确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
interface DialogProps {
  title: string;
  visible: boolean;
  height: number;
  width: number;
}
//子组件接收父组件的传参，设置默认值
const props = withDefaults(defineProps<DialogProps>(), {
  title: "标题",
  visible: false,
  height: 250,
  width: 630,
});
//注册事件
const emits = defineEmits(["onConfirm", "onClose"]);
const onConfirm = () => {
  emits("onConfirm");
};
const onClose = () => {
  emits("onClose");
};
</script>

<style lang="scss">
.container {
  overflow-x: initial;
  overflow-y: auto;
}
.el-dialog {
  background-color: #dfd8d2;
  .el-dialog__header {
    background-color: #a78b7e;
    margin-right: 0;
    .el-dialog__title {
      font-size: 18px;
      font-weight: 600;
      color: #fff;
      letter-spacing: 2px;
    }
  }
  .el-dialog__headerbtn {
    .el-dialog__close {
      color: #fff;
    }
  }
  .el-dialog__body {
    padding: 10px;
  }
  .el-dialog__footer {
    border-top: 1px solid #e8eaec !important;
    padding: 10px;
  }
}
</style>
