import { deleteApi } from "@/api/menu";
import useInstance from "@/hooks/useInstance";
import type { FuncList } from "@/type/baseType";
import { EditType } from "@/type/enumType";
import type { MenuType } from "@/type/menuModel";
import { ElMessage } from "element-plus";
import { ref } from "vue";
export default function useMenu(refresh: FuncList) {
  const { global } = useInstance();
  /**addDailg的ref属性 */
  const addRef = ref<{ show: (type: string, row?: MenuType) => void }>();
  /**新增 */
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  /**编辑 */
  const editBtn = (row: MenuType) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  /**删除 */
  //删除
  const deleteBtn = async (row: MenuType) => {
    console.log(typeof global, global);
    const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    if (confirm) {
      const res: any = await deleteApi(row.menuId);
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
  return { addBtn, editBtn, deleteBtn, addRef };
}
