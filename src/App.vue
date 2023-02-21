<template>
  <router-view />
</template>

<style lang="scss">
.el-button {
  --el-button-hover-text-color: #87510f;
  --el-button-active-text-color: #e28007;
  --el-button-active-border-color: #ec9a46;
  --el-button-hover-bg-color: #f0e8e0;
  --el-button-hover-border-color: #eed5bb;
}

.el-input {
  --el-input-focus-border-color: #ec9a46 !important;
}
// 确认框颜色封装
.el-popover.el-popper {
  .el-button--danger {
    color: #f56c6c;
    border-color: #f56c6c;
    background-color: #fef0f0;
  }
  .el-button--danger:focus,
  .el-button--danger:hover {
    color: #fff;
    border-color: #f56c6c;
    background-color: #f56c6c;
  }
}
//messageBox
.el-message-box__btns {
  .el-button:focus,
  .el-button:hover {
    color: #a38f86;
    border-color: #d4bcb1;
    background-color: #f6f3f2;
  }

  .el-button--primary {
    color: #f56c6c;
    border-color: #f56c6c;
    background-color: #fef0f0;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    color: #fff;
    border-color: #f56c6c;
    background-color: #f56c6c;
  }
}
//分页器
.el-pagination {
  float: right;
  margin-top: 5px;
  .el-pager li:hover {
    color: #fff;
    background-color: #8f786c !important;
  }
  // .el-pager li:not(.is-disabled) {
  //   background-color: #bb9d8e !important;
  // }
  .is-active {
    color: #fff;
    background-color: #bb9d8e !important;
  }
  .el-select .el-input.is-focus .el-input__wrapper {
    box-shadow: 0 0 0 1px #db9926 inset !important;
  }
  .el-select .el-input__wrapper.is-focus {
    box-shadow: 0 0 0 1px #db9926 inset !important;
  }
}
.el-select-dropdown__item.selected {
  color: #db9926;
}

//textarea
.el-textarea__inner:focus {
  box-shadow: 0 0 0 1px #db9926 inset !important;
}

/*解决element上传组件回显动画问题*/
.el-upload-list__item {
  transition: none !important;
}

// upload预览图片过大
[w-full=""] {
  width: 100%;
}
</style>
