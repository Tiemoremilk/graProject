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
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="categoryId" label="物资分类">
              <el-select
                v-model="addModel.categoryId"
                style="width: 100%"
                placeholder="请选择物资分类"
                size="default"
              >
                <el-option
                  v-for="item in materialCategoryData.list"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="infoName" label="物资名称">
              <el-input v-model="addModel.infoName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="specs" label="规格">
              <el-input v-model="addModel.specs"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="unit" label="单位">
              <el-input v-model="addModel.unit"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="0">
            <el-form-item prop="infoDesc" label="备注">
              <el-input
                v-model="addModel.infoDesc"
                type="textarea"
                :autosize="{ minRows: 3, maxRows: 6 }"
              ></el-input> </el-form-item
          ></el-col>
        </el-row>
        <el-row>
          <el-col :span="22" :offset="0">
            <el-form-item prop="image" label="图片">
              <el-upload
                ref="uploadRef"
                action="#"
                :on-change="uploadFile"
                :auto-upload="false"
                :limit="1"
                :file-list="fileList"
                list-type="picture-card"
              >
                <el-icon><Plus /></el-icon>

                <template #file="{ file }">
                  <div>
                    <img
                      class="el-upload-list__item-thumbnail"
                      :src="file.url"
                      alt=""
                    />
                    <span class="el-upload-list__item-actions">
                      <span
                        class="el-upload-list__item-preview"
                        @click="handlePictureCardPreview(file)"
                      >
                        <el-icon><zoom-in /></el-icon>
                      </span>
                      <!-- <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleDownload(file)"
                      >
                        <el-icon><Download /></el-icon>
                      </span> -->
                      <span
                        v-if="!disabled"
                        class="el-upload-list__item-delete"
                        @click="handleRemove(file)"
                      >
                        <el-icon><Delete /></el-icon>
                      </span>
                    </span>
                  </div>
                </template>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog> </el-form-item
          ></el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialogVue>
</template>

<script setup lang="ts">
import sysDialog from "@/utils/sysDialog";
import SysDialogVue from "@/components/SysDialog.vue";
import useInstance from "@/hooks/useInstance";
import { ElMessage, type FormInstance } from "element-plus";
import { nextTick, reactive, ref } from "vue";
import type { MaterialInfoType } from "@/type/materialInfoModel";
import { EditType, Title } from "@/type/enumType";
import { addApi, editApi } from "@/api/materialInfo";
import infoSelectCategory from "@/composables/materialInfo/infoSelectCategory";
import useUpload from "@/composables/materialInfo/useUpload";

const { dialog, onClose, onConfirm, onShow } = sysDialog();
const { global } = useInstance();
const addFormRef = ref<FormInstance>();
const { materialCategoryData, materialCategoryList } = infoSelectCategory();
const {
  uploadRef,
  dialogImageUrl,
  dialogVisible,
  disabled,
  handleRemove,
  handlePictureCardPreview,
  fileList,
  uploadFile,
  imgurl,
} = useUpload();
//表单绑定数据
const addModel = reactive<MaterialInfoType>({
  infoId: "",
  categoryId: "",
  infoName: "",
  image: "",
  specs: "",
  unit: "",
  infoDesc: "",
  type: "",
});
//显示弹框
const show = async (type: string, row?: MaterialInfoType) => {
  imgurl.value = "";
  //清空图片数据
  fileList.value = [];
  if (uploadRef.value) {
    uploadRef.value?.clearFiles();
  }
  //获取物资分类
  await materialCategoryList();
  //设置弹框属性
  type == EditType.ADD
    ? (dialog.title = Title.ADD)
    : (dialog.title = Title.EDIT);
  dialog.height = 360;
  dialog.width = 680;
  //编辑，设置数据回显
  if (row) {
    nextTick(() => {
      Object.assign(addModel, row);
      //设置图片回显
      let img: any = {
        name: "",
        url: "",
      };
      img.url = addModel.image;
      imgurl.value = addModel.image;
      fileList.value.push(img);
    });
  }
  onShow();
  //清空表单
  addFormRef.value?.resetFields();
  addModel.type = type;
};
//表单验证规则
const rules = reactive({
  categoryId: [
    {
      required: true,
      trigger: "blur",
      message: "请选择物资分类",
    },
  ],
  infoName: [
    {
      required: true,
      trigger: "blur",
      message: "请填写物资名称",
    },
  ],
  image: [
    {
      required: true,
      trigger: "blur",
      message: "请上传物资图片",
    },
  ],
  specs: [
    {
      required: true,
      trigger: "blur",
      message: "请填写物资规格",
    },
  ],
  unit: [
    {
      required: true,
      trigger: "blur",
      message: "请填写物资单位",
    },
  ],
});

//注册事件
const emits = defineEmits(["refresh"]);

//表单提交
const onSubmit = () => {
  addModel.image = imgurl.value;
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
