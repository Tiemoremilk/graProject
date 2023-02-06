import { getSelectApi, getRoleByUserIdApi } from "./../../api/user/index";
import type { SelectTypeList } from "@/type/userModel";
import { reactive, ref } from "vue";
export default function useSelectRole() {
  //角色数据
  const roleData = reactive<SelectTypeList>({
    list: [],
  });
  const roleId = ref("");
  /**获取数据 */
  const listRole = async () => {
    const res: any = await getSelectApi();
    // console.log(res.code);
    // console.log(res.data);·
    if (res && res.code == 200) {
      roleData.list = res.data;
    }
  };
  const getRoleByUserId = async (userId: string) => {
    const res: any = await getRoleByUserIdApi(userId);
    if (res && res.code == 200) {
      roleId.value = res.data.roleId;
    }
  };
  return { roleData, listRole, getRoleByUserId, roleId };
}
