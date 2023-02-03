import { getSelectApi } from "./../../api/user/index";
import type { SelectTypeList } from "@/type/userModel";
import { reactive } from "vue";
export default function useSelectRole() {
  //角色数据
  const roleData = reactive<SelectTypeList>({
    list: [],
  });
  /**获取数据 */
  const listRole = async () => {
    const res: any = await getSelectApi();
    // console.log(res.code);
    // console.log(res.data);
    if (res && res.code == 200) {
      roleData.list = res.data;
      // console.log(roleData.list);
    }
  };

  return { roleData, listRole };
}
