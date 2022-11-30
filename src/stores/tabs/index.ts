import { defineStore } from "pinia";
export type Tab = {
  title: string;
  path: string;
  closable: boolean;
};
export type TabState = {
  tabList: Tab[];
};
export const tabStore = defineStore("tabStore", {
  state: (): TabState => {
    return {
      tabList: [
        {
          title: "首页",
          path: "/home",
          closable: false,
        },
      ],
    };
  },
  getters: {
    getTabs(state) {
      return state.tabList;
    },
  },
  actions: {
    addTab(tab: Tab) {
      if (this.tabList.some((item) => item.path === tab.path)) return;
      this.tabList.push(tab);
    },
  },
});
