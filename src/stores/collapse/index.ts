import { defineStore } from "pinia";
//定义一个store
export const collapseStore = defineStore("collapseStore", {
  state: () => {
    return {
      collapse: true,
    };
  },
  getters: {
    getCollapse(state) {
      return state.collapse;
    },
  },
  actions: {
    setCollapse(collapse: boolean) {
      this.collapse = collapse;
    },
  },
});
