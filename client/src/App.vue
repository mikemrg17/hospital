<template>
  <RouterView v-slot="{ Component }">
    <Transition name="page-slide" mode="out-in">
      <Component :is="Component"></Component>
    </Transition>
  </RouterView>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>
