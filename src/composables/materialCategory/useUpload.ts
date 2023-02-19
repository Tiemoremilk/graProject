import { uploadImageApi } from "@/api/materialInfo";
import { ElMessage, type UploadFile } from "element-plus";
import { ref } from "vue";

export default function useUpload() {
  //图片上传组件ref属性
  const uploadRef = ref();
  //图片预览地址
  const dialogImageUrl = ref("");
  //是否点击预览
  const dialogVisible = ref(false);
  const disabled = ref(false);
  //上传的文件
  const fileList = ref<UploadFile[]>([]);
  //上传图片的地址
  const imgurl = ref("");
  //删除图片
  const handleRemove = (file: UploadFile) => {
    fileList.value = fileList.value.filter((item) => item.name != file.name);
  };
  //点击预览图片
  const handlePictureCardPreview = (file: UploadFile) => {
    dialogImageUrl.value = file.url!;
    dialogVisible.value = true;
  };
  //图片上传
  const uploadFile = async (file: any) => {
    // console.log(file);
    const typeArr = ["image/png", "image/gif", "image/jpeg", "image/jpg"];
    const isLt2M = file.size / 1024 / 1024 < 5;
    const isImg = typeArr.indexOf(file.raw.type) !== -1;
    if (!isImg) {
      ElMessage.warning("只能上传图片类型!");
      uploadRef.value?.clearFiles();
      return;
    }
    if (!isLt2M) {
      ElMessage.warning("上传头像图片大小不能超过 5MB!!");
      uploadRef.value?.clearFiles();
      return;
    }
    const formData = new FormData();
    formData.append("file", file.raw);
    const res = await uploadImageApi(formData);
    if (res && res.code == 200 && res.data) {
      console.log(res);
      imgurl.value = process.env.BASE_API + res.data;
    }
  };
  return {
    dialogImageUrl,
    dialogVisible,
    disabled,
    handleRemove,
    handlePictureCardPreview,
    fileList,
    uploadFile,
    uploadRef,
    imgurl,
  };
}
