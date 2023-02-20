import type { MaterialInfoType } from "@/type/materialInfoModel";
import type { FuncList } from "@/type/baseType";
import useInstance from "@/hooks/useInstance";
import { ref } from "vue";
import { EditType } from "@/type/enumType";
import { deleteApi } from "@/api/materialInfo";
import { ElMessage } from "element-plus";
import useUpload from "./useUpload";

const { removeImg } = useUpload();

export default function useMaterialInfo(refresh: FuncList) {
  const { global } = useInstance();
  // type 0新增 1编辑
  const addRef = ref<{
    show: (type: string, row?: MaterialInfoType) => void;
  }>();
  //新增
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  //编辑
  const editBtn = (row: MaterialInfoType) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  //删除
  const deleteBtn = async (row: MaterialInfoType) => {
    const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    if (confirm) {
      // await removeImg();
      const res: any = await deleteApi(row.infoId);
      if (res && res.code == 200) {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "success",
        });
        refresh();
      }
    }
  };
  return {
    addBtn,
    editBtn,
    deleteBtn,
    addRef,
  };
}
