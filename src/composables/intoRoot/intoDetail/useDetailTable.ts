import { nextTick, onMounted, reactive, ref } from "vue";
import type { MaterialIntoParam } from "@/type/intoRootModel";
import { applyApi, getIntoListApi } from "@/api/intoRoot";
import { ElMessage } from "element-plus";
// import useInstance from "@/hooks/useInstance";
//
// const {global} = useInstance();
export default function useDetailTable() {
  //表格高度
  const tableHeigth = ref(0);
  //列表参数
  const listParam = reactive<MaterialIntoParam>({
    currentPage: 1,
    pageSize: 10,
    province: "",
    name: "",
    total: 0,
    status: "",
    type: ""
  });
  //表格数据
  const tableList = reactive({
    list: []
  });
  //获取表格数据
  const getList = async () => {
    const res: any = await getIntoListApi(listParam);
    if (res && res.code == 200) {
      tableList.list = res.data.records;
      listParam.total = res.data.total;
    }
  };

  //搜索
  const searchBtn = () => {
    getList();
  };
  //重置
  const resetBtn = () => {
    listParam.name = "";
    listParam.province = "";
    listParam.status = "";
    listParam.type = "";
    getList();
  };
  //页容量改变时触发
  const sizeChange = (size: number) => {
    listParam.pageSize = size;
    getList();
  };
  //页数改变时触发
  const currentChange = (page: number) => {
    listParam.currentPage = page;
    getList();
  };
  //审核
  const applyBtn = async (row: any) => {
    if (row.status == "1") {
      ElMessage.warning("信息已经审核，不要重复提交!");
      return;
    }
    const res: any = await applyApi({
      intoId: row.intoId,
      status: "1"
    });
    if (res && res.code == 200) {
      ElMessage.success(res.msg);
      getList();
    }

  };
//拒绝审核
  const rejectBtn = async (row: any) => {
    if (row.status == "1" || row.status == "2") {
      ElMessage.warning("信息已经审核，不要重复提交!");
      return;
    }
    // const confirm = await global.$myconfirm('请确认是否要拒绝入库')
    // if(confirm){
    const res: any = await applyApi({
      intoId: row.intoId,
      status: "2"
    });
    if (res && res.code == 200) {
      ElMessage.success(res.msg);
      getList();
    }
    // }
  };
  onMounted(() => {
    getList();
    nextTick(() => {
      tableHeigth.value = window.innerHeight - 230;
    });
  });
  return {
    listParam,
    getList,
    tableList,
    searchBtn,
    resetBtn,
    sizeChange,
    currentChange,
    tableHeigth,
    applyBtn,
    rejectBtn
  };
}
