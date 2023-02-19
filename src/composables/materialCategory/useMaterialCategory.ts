import { deleteApi } from "@/api/materialCategory";
import useInstance from "@/hooks/useInstance";
import type { FuncList } from "@/type/baseType";
import { EditType } from "@/type/enumType";
import type { MaterialCategoryType } from "@/type/materialCategoryModel";
import { ElMessage } from "element-plus";
import { ref } from "vue";

export default function useMaterialCategory(refresh: FuncList) {
  const { global } = useInstance();
  // type 0新增 1编辑
  const addRef = ref<{
    show: (type: string, row?: MaterialCategoryType) => void;
  }>();
  //新增
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  //编辑
  const editBtn = (row: MaterialCategoryType) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  //删除
  const deleteBtn = async (row: MaterialCategoryType) => {
    const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    if (confirm) {
      const res: any = await deleteApi(row.categoryId);
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
