import { ref } from "vue";
import { ElMessage } from "element-plus";
import type { AddRoleModel } from "@/type/roleModel";
import { EditType } from "@/type/enumType";
import { deleteApi } from "@/api/role";
import type { FuncList } from "@/type/baseType";
import useInstance from "@/hooks/useInstance";

export default function useRole(refresh: FuncList) {
  const { global } = useInstance();
  // type 0新增 1编辑
  const addRef = ref<{ show: (type: string, row?: AddRoleModel) => void }>();
  //新增
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  //编辑
  const editBtn = (row: AddRoleModel) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  //删除
  const deleteBtn = async (row: AddRoleModel) => {
    const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    if (confirm) {
      const res: any = await deleteApi(row.roleId);
      if (res && res.code == 200) {
        ElMessage({
          showClose: true,
          message: res.msg,
          type: "warning",
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
