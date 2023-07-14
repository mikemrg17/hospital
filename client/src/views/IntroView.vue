<template>
  <main class="w-screen">
    <div class="h-screen grid grid-cols-2">
      <div class="p-20">
        <img src="../assets/hospital.png" alt="" />
      </div>
      <div class="flex flex-col items-center justify-center">
        <h1 class="text-5xl text-main-blue">Welcome to Hosp!</h1>
        <div class="w-[60%] mt-10 grid grid-cols-2">
          <RouterLink to="/login">
            <button
              class="w-[60%] m-auto flex justify-center bg-main-blue text-white py-3 rounded-md hover:brightness-110"
            >
              Log in
            </button>
          </RouterLink>
          <RouterLink to="/signup">
            <button
              class="w-[60%] m-auto flex justify-center border-2 border-main-blue text-main-blue py-3 rounded-md hover:bg-light-blue"
            >
              Sign up
            </button>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>
