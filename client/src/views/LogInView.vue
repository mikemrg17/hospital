<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        Log in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div>
        <label
          for="curp"
          class="block text-sm font-medium leading-6 text-gray-900"
          >Email</label
        >
        <div class="mt-2">
          <input
            name="email"
            type="email"
            class="block w-full rounded-md py-1.5 px-1.5 ring-1 ring-gray-300 focus:ring-1 sm:text-sm sm:leading-6"
            v-model="email"
          />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >Password</label
          >
          <div class="text-sm">
            <a
              class="font-semibold text-main-blue hover:brightness-75 cursor-pointer"
              >Forgot password?</a
            >
          </div>
        </div>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            v-model="password"
            class="block w-full rounded-md py-1.5 px-1.5 ring-1 ring-gray-300 focus:ring-1 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div class="mt-10">
        <button
          @click="log_in"
          class="flex w-full justify-center rounded-md bg-main-blue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:brightness-110"
        >
          Log in
        </button>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ " " }}
        <RouterLink to="/signup">
          <span
            class="font-semibold leading-6 text-main-blue hover:brightness-75"
          >
            Sign up
          </span>
        </RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup>
import { RouterLink, useRouter } from "vue-router";
import { use_users_store } from "../stores/users";
import { ref } from "vue";

const email = ref("miguel@gmail.com");
const password = ref("01234567");

const users_store = use_users_store();
const router = useRouter();

const log_in = async () => {
  try {
    const status = await users_store.log_in(email.value, password.value);
    if (status === 200) router.push({ name: "home" });
  } catch (error) {
    console.error(error);
  }
};
</script>
