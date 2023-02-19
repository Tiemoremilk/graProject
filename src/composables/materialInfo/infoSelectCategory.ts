import { getSelectApi } from "@/api/materialInfo";
import type { SelectTypeList } from "@/type/materialInfoModel";
import { reactive, ref } from "vue";
export default function infoSelectCategory() {
  //角色数据
  const materialCategoryData = reactive<SelectTypeList>({
    list: [],
  });
  /**获取数据 */
  const materialCategoryList = async () => {
    const res: any = await getSelectApi();
    // console.log(res.code);
    // console.log(res.data);·
    if (res && res.code == 200) {
      materialCategoryData.list = res.data;
    }
  };
  return {
    materialCategoryData,
    materialCategoryList,
  };
}
