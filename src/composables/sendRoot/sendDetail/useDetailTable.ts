import { nextTick, onMounted, reactive, ref } from "vue";

import useInstance from "@/hooks/useInstance";
import { ElMessage } from "element-plus";
import type { MaterialSendParam } from "@/type/sendRootModel";
import { getSendListApi, sendApply } from "@/api/sendRoot";

export default function useDetailTable() {
  const { global } = useInstance();
  //表格高度
  const tableHeigth = ref(0);
  //列表参数
  const listParam = reactive<MaterialSendParam>({
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
    const res: any = await getSendListApi(listParam);
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
  //拒绝
  const rejectBtn = async (row: any) => {
    if (row.status == "1" || row.status == "2") {
      ElMessage.warning("该信息已经审核通过，不用重复审核!");
      return;
    }
    const confirm = await global.$messageBox("请确定是否要拒绝发放", "提示");
    if (confirm) {
      let res: any = await sendApply({
        intoId: row.sendId,
        status: "2"
      });
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        getList();
      }
    }
  };
  //同意
  const applyBtn = async (row: any) => {
    if (row.status == "1" || row.status == "2") {
      ElMessage.warning("该信息已经审核通过，不用重复审核!");
      return;
    }
    const confirm = await global.$messageBox("请确定是否要同意发放", "提示");
    if (confirm) {
      let res: any = await sendApply({
        intoId: row.sendId,
        status: "1"
      });
      if (res && res.code == 200) {
        ElMessage.success(res.msg);
        getList();
      }
    }
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
    rejectBtn,
    applyBtn
  };
}