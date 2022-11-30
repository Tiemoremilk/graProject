<template>
  <el-tabs
    v-model="activeTab"
    type="card"
    class="demo-tabs"
    @tab-remove="removeTab"
    @tab-click="clickBtn"
  >
    <el-tab-pane
      v-for="item in tabList"
      :key="item.path"
      :label="item.title"
      :name="item.path"
      :closable="item.closable"
    >
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { tabStore, type Tab } from "@/stores/tabs";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const store = tabStore();
const route = useRoute();
const router = useRouter();
const activeTab = ref("");
const tabList = computed(() => {
  return store.getTabs;
});
//激活
const setActiveTab = () => {
  activeTab.value = route.path;
};
//移除
const removeTab = (targetName: string) => {
  if (targetName == "/home") return;
  const tabs = tabList.value;
  let activeName = activeTab.value;
  if (activeName === targetName) {
    tabs.forEach((tab, index) => {
      if (tab.path === targetName) {
        const nextTab = tabs[index + 1] || tabs[index - 1];
        if (nextTab) {
          activeName = nextTab.path;
        }
      }
    });
  }

  activeTab.value = activeName;
  store.tabList = tabs.filter((tab) => tab.path !== targetName);
  router.push({ path: activeName });
};
//增加
const addTab = () => {
  const { path, meta } = route;
  const tab: Tab = {
    path: path,
    title: meta.title as string,
    //首页固定项不可操作
    closable: path != "/home",
  };
  store.addTab(tab);
};

//点击
const clickBtn = (tab: any) => {
  const { props } = tab;
  router.push({ path: props.name });
};
//刷新数据丢失问题
const befortRefresh = () => {
  window.addEventListener("beforeunload", () => {
    sessionStorage.setItem("tabsView", JSON.stringify(tabList.value));
  });
  let tabSession = sessionStorage.getItem("tabsView");
  if (tabSession) {
    let OldTabSession = JSON.parse(tabSession);
    if (OldTabSession.length > 0) {
      store.tabList = OldTabSession;
    }
  }
};
onMounted(() => {
  befortRefresh();
  setActiveTab();
  addTab();
}),
  watch(
    () => route.path,
    () => {
      setActiveTab();
      addTab();
    }
  );
</script>

<style scoped lang="scss">
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
:deep(.el-tabs__item) {
  background: linear-gradient(to bottom, #74655d, #653c30, #b69788);
  border-bottom-color: #dfd8d2 !important;
  color: #fff;
}
:deep(.is-active) {
  color: #e27b5b !important;
  border-bottom-color: #e27b5b !important;
}
:deep(.el-tabs__item:hover) {
  color: #e27b5b !important;
}
:deep(.el-tabs) {
  height: 35px !important;
}
</style>
