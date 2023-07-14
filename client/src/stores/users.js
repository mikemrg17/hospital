import { defineStore } from "pinia";
import axios from "axios";

export const use_users_store = defineStore("users", {
  state: () => ({
    user_data: null,
    user_token: null,
  }),
  getters: {},
  actions: {
    async log_in(email, password) {
      try {
        const { data } = await axios.post("http://127.0.0.1:3000/api/login", {
          email,
          password,
        });

        this.user_token = data.token;
        this.user_data = data.user;

        return 200;
      } catch (error) {
        console.error(`Log In error: ${error}`);
      }
    },
  },
});
