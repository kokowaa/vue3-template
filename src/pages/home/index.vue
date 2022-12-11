<template>
  <div>
    <n-space>
      <n-button>Default</n-button>
      <n-button type="tertiary">
        Tertiary
      </n-button>
      <n-button type="primary">
        Primary
      </n-button>
      <n-button type="info">
        Info
      </n-button>
      <n-button type="success">
        Success
      </n-button>
      <n-button type="warning">
        Warning
      </n-button>
      <n-button type="error">
        Error
      </n-button>
    </n-space>

    <!-- 日期选择器 -->
    <n-date-picker v-model:value="timestamp" type="date" />
  </div>
</template>

<script lang="ts" setup>
import { NButton, NSpace, NDatePicker } from "naive-ui";
import { ref, nextTick } from "vue";

import { useHttp, useEvent } from "@/hooks";

// 日期
const timestamp = ref();

// 全局事件
const event = useEvent();

event.on('init', () => {
  console.log('init事件执行');
});

nextTick(() => {
  setTimeout(() => {
    event.emit('init')
  }, 3000)
});

// 请求
(async function req() {
  const [err, res] = await useHttp({
    url: '/pop',
    method: 'GET'
  })

  if (err) {
    console.log('错误检测', err);
    return
  }
  console.log(res, '结果');
})()

</script>

<style lang="scss" scoped>

</style>