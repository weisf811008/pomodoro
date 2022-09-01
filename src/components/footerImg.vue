<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeStore } from '../stores/timeStore'
import tomatoOrangeImg from '../assets/tomato--orange.svg'
import tomatoGreenImg from '../assets/tomato--green.svg'

const timeStore = useTimeStore()
const { isWorking, isPlaying } = storeToRefs(timeStore)

const getTomatoImg = computed(() =>
  isWorking.value ? tomatoOrangeImg : tomatoGreenImg
)
</script>
<template>
  <footer>
    <img :src="getTomatoImg" alt="tomato" />
  </footer>
</template>

<style lang="scss" scoped>
footer {
  display: flex;
  justify-content: center;
}
</style>
