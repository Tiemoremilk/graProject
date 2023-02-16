import { getListApi } from "@/api/menu/index";
import { computed, onMounted, reactive } from "vue";
export default function useTable() {
  const tableList = reactive({
    dataList: [],
  });
  const tableHeight = computed(() => {
    return window.innerHeight - 230;
  });
  const getList = async () => {
    const res: any = await getListApi();
    if (res && res.code == 200) {
      tableList.dataList = res.data;
    }
  };
  const refresh = () => {
    getList();
  };
  onMounted(() => {
    getList();
  });
  return { getList, tableList, tableHeight, refresh };
}
