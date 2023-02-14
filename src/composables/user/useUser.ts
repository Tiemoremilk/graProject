import { deleteApi, resetPasswordApi } from "@/api/user";
import useInstance from "@/hooks/useInstance";
import type { FuncList } from "@/type/baseType";
import { EditType } from "@/type/enumType";
import type { AddUserModel, resetUserPassword } from "@/type/userModel";
import { ElMessage } from "element-plus";
import { ref } from "vue";
// import useInstance from "@/hooks/useInstance";
// const { global } = useInstance();
export default function useUser(refresh: FuncList) {
  const { global } = useInstance();
  // type 0新增 1编辑
  /**addDailg的ref属性 */
  const addRef = ref<{ show: (type: string, row?: AddUserModel) => void }>();
  /**新增 */
  const addBtn = () => {
    addRef.value?.show(EditType.ADD);
  };
  /**编辑 */
  const editBtn = (row: AddUserModel) => {
    addRef.value?.show(EditType.EDIT, row);
  };
  /**删除 */
  const deleteBtn = async (row: AddUserModel) => {
    const confirm = await global.$messageBox("确定删除该条数据么", "提示");
    if (confirm) {
      const res: any = await deleteApi(row.userId);
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
  /**重置密码 */
  const resetPassword = async (row: AddUserModel) => {
    const confirm = await global.$messageBox("确定重置该账号密码么", "提示");
    if (confirm) {
      const params: resetUserPassword = {
        roleId: row.roleId,
        userId: row.userId,
        password: row.phone,
        enabled: row.enabled,
      };
      const res: any = await resetPasswordApi(params);
      if (res && res.code == 200) {
        ElMessage({
          showClose: true,
          message: "密码重置为该账号绑定手机号",
          type: "warning",
        });
        refresh();
      }
    }
  };
  return { addBtn, editBtn, deleteBtn, addRef, resetPassword };
}
