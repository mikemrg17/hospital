import { defineStore } from "pinia";

export const use_users_store = defineStore("users", {
  state: () => ({
    user: {},
  }),
  getters: {},
});
