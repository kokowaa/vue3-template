<script setup lang="ts">
import { NConfigProvider, zhCN, dateZhCN } from "naive-ui"

import Home from "./pages/home/index.vue"
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <router-view></router-view>
  </n-config-provider>
</template>

<style scoped>

</style>
