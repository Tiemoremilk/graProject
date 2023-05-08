import { defineStore } from "pinia";
//定义一个store
export const loginStore = defineStore("loginStore", {
  state: () => {
    return {
      token: "",
      userId: ""
    };
  },
  getters: {
    getToken(state) {
      return state.token;
    },
    getUserId(state) {
      return state.userId;
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserId(userId: string) {
      this.userId = userId;
    }
  }
});