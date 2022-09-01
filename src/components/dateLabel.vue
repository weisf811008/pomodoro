<script setup>
import { computed, ref } from 'vue'
import { format } from 'date-fns'

const now = ref(new Date())

setInterval(() => {
  now.value = new Date()
}, 1000)

const days = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六',
]

const today = computed(() => format(now.value, 'yyyy.MM.dd'))
const day = computed(() => days[now.value.getDay()])
const time = computed(() => format(now.value, 'HH:mm:ss'))
</script>
<template>
  <div class="today">
    <span>{{ today }}</span>
    <span>{{ day }}</span>
    <span>{{ time }}</span>
  </div>
</template>
<style lang="scss" scoped>
.today {
  height: 80px;
  text-align: right;
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 10;

  span {
    margin-right: 30px;
  }
}
</style>
