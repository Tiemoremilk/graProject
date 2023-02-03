import type { AddUserModel } from "@/type/userModel";
import { ref } from "vue";
// import useInstance from "@/hooks/useInstance";
// const { global } = useInstance();
export default function user() {
  /**addDailg的ref属性 */
  const addRef = ref<{ show: () => void }>();
  /**新增 */
  const addBtn = () => {
    addRef.value?.show();
  };
  /**编辑 */
  const editBtn = (row: AddUserModel) => {};
  /**删除 */
  const deleteBtn = async (row: AddUserModel) => {
    // const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    // if (confirm) {
    // const res: any = await deleteApi(row.roleId);
    // if (res && res.code == 200) {
    //   ElMessage({
    //     showClose: true,
    //     message: res.msg,
    //     type: "warning",
    //   });
    //   refresh();
    // }
  };
  // };
  return { addBtn, editBtn, deleteBtn, addRef };
}
