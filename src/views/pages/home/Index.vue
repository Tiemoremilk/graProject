<template>
  <el-main :style="{ height: mianHeight + 'px' }">
    <!-- 数据统计 -->
    <el-row
      :gutter="20"
      type="flex"
      justify="center"
      style="margin-bottom: 40px"
    >
      <el-col :span="6">
        <div class="show-header">
          <div class="show-num">4</div>
          <div class="bottom-text">入库审核</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header">
          <div class="show-num">2</div>
          <div class="bottom-text">发放审核</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header">
          <div class="show-num">5</div>
          <div class="bottom-text">物资种类</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header">
          <div class="show-num">4</div>
          <div class="bottom-text">累计发放</div>
        </div>
      </el-col>
    </el-row>
    <div style="display: flex">
      <el-card style="flex: 1">
        <template #header>
          <div class="card-header">
            <span>物资分类</span>
          </div>
        </template>
        <div ref="myChart" :style="{ width: '400px', height: '250px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px; flex: 1">
        <template #header>
          <div class="card-header">
            <span>物资预警</span>
          </div>
        </template>
        <div ref="myChart1" :style="{ width: '400px', height: '250px' }"></div>
      </el-card>
      <el-card style="margin-left: 20px; flex: 1">
        <template #header>
          <div class="card-header">
            <span>物资充足</span>
          </div>
        </template>
        <div ref="myChart2" :style="{ width: '400px', height: '250px' }"></div>
      </el-card>
    </div>
    <el-card class="box-card" style="margin-top: 30px">
      <div class="clearfix">
        <span style="color: #000000; font-weight: 600; margin-bottom: 10px"
        >公告列表</span
        >
        <el-divider></el-divider>
      </div>
      <div class="text item" v-for="val in tableList.list" :key="val.noticeId">
        <span style="font-weight: 600; font-size: 14px">{{ val.title }}</span
        ><span style="margin-left: 30px; font-size: 14px">{{ val.contentText }} </span>
        <span style="float:right; font-size: 12px">创建时间：{{ val.createTime }}</span>
        <el-divider></el-divider>
      </div>
      <!--      <div class="text item">-->
      <!--        <span style="font-weight: 600; font-size: 14px">放假通知</span-->
      <!--        ><span style="margin-left: 30px; font-size: 14px"-->
      <!--      >放假时间为 2022-01-10放到 2022-3-03-01，大家关好门窗。</span-->
      <!--      >-->
      <!--        <el-divider></el-divider>-->
      <!--      </div>-->
      <!--      <div class="text item">-->
      <!--        <span style="font-weight: 600; font-size: 14px">放假通知</span-->
      <!--        ><span style="margin-left: 30px; font-size: 14px"-->
      <!--      >放假时间为 2022-01-10放到 2022-3-03-01，大家关好门窗。</span-->
      <!--      >-->
      <!--        <el-divider></el-divider>-->
      <!--      </div>-->
    </el-card>
  </el-main>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";
import useTable from "@/composables/noticeRoot/useTable";

const { global } = useInstance();
const myChart = ref<HTMLElement>();
const myChart1 = ref<HTMLElement>();
const myChart2 = ref<HTMLElement>();
const mianHeight = ref(0);
const { getList, tableList } = useTable();
//柱状图
const charts1 = () => {
  const echartInstance = global.$echarts.init(myChart.value);
  let option = reactive({
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        //x轴文字的配置
        show: true,
        interval: 0 //使x轴文字显示全
      }
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        color: "#6F4034",
        data: [120, 200, 150, 80, 70, 110, 130],
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.2)"
        }
      }
    ]
  });
  echartInstance.setOption(option);
};
//饼图
const charts2 = () => {
  const myChart = global.$echarts.init(myChart1.value);
  let option = reactive({
    // title: {
    //   subtext: "Fake Data",
    //   left: "center",
    // },
    tooltip: {
      trigger: "item"
    },
    legend: {
      orient: "vertical",
      left: "left"
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "80%"],
        avoidLabelOverlap: false,
        data: [
          { value: 1048, name: "Search Engine" },
          { value: 735, name: "Direct" },
          { value: 580, name: "Email" },
          { value: 484, name: "Union Ads" },
          { value: 300, name: "Video Ads" }
        ],
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        }
      }
    ]
  });
  myChart.setOption(option);
};
//环图
const charts3 = () => {
  const myChart = global.$echarts.init(myChart2.value);
  // let option = reactive({
  //   tooltip: {
  //     trigger: "item",
  //   },
  //   legend: {
  //     top: "5%",
  //     left: "center",
  //   },
  //   series: [
  //     {
  //       name: "Access From",
  //       type: "pie",
  //       radius: ["40%", "70%"],
  //       avoidLabelOverlap: false,
  //       label: {
  //         show: false,
  //         position: "center",
  //       },
  //       emphasis: {
  //         label: {
  //           show: true,
  //           fontSize: "40",
  //           fontWeight: "bold",
  //         },
  //       },
  //       labelLine: {
  //         show: false,
  //       },
  //       data: [
  //         { value: 1048, name: "Search Engine" },
  //         { value: 735, name: "Direct" },
  //         { value: 580, name: "Email" },
  //         { value: 484, name: "Union Ads" },
  //         { value: 300, name: "Video Ads" },
  //       ],
  //     },
  //   ],
  // });
  let option1 = reactive({
    legend: {
      orient: "vertical",
      left: "left"
      // data: [
      //     'rose1',
      //     'rose2',
      //     'rose3',
      //     'rose4',
      //     'rose5',
      //     'rose6',
      //     'rose7',
      //     'rose8'
      //   ]
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    // toolbox: {
    //   show: true,
    //   feature: {
    //     mark: { show: true },
    //     dataView: { show: true, readOnly: false },
    //     restore: { show: true },
    //     saveAsImage: { show: true }
    //   }
    // },
    series: [
      {
        name: "Radius Mode",
        type: "pie",
        radius: [10, 120],
        center: ["50%", "50%"],
        roseType: "radius",
        itemStyle: {
          borderRadius: 4
        },
        label: {
          show: false
        },
        emphasis: {
          label: {
            show: false
          }
        },
        data: [
          { value: 40, name: "rose 1" },
          { value: 33, name: "rose 2" },
          { value: 28, name: "rose 3" },
          { value: 22, name: "rose 4" },
          { value: 20, name: "rose 5" },
          { value: 15, name: "rose 6" },
          { value: 12, name: "rose 7" },
          { value: 10, name: "rose 8" }
        ]
      }
    ]
  });
  myChart.setOption(option1);
};

onMounted(() => {
  charts1();
  charts2();
  charts3();
  nextTick(() => {
    mianHeight.value = window.innerHeight - 90;
  });
});
</script>

<style lang="scss" scoped>
.bottom-text {
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  height: 25px;
  line-height: 25px;
  text-align: center;
  position: absolute;
  font-weight: 600;
}

.show-header {
  background: #9B766C;
  color: #fff;
  height: 80px;
  border-radius: 5px;
  position: relative;
}

.show-num {
  font-size: 38px;
  font-weight: 600;
  padding: 5px;
}
</style>