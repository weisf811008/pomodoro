<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const { isShow } = storeToRefs(todoStore)

const router = useRouter()
</script>
<template>
  <div>
    <img
      class="list"
      src="../assets/icon-list.svg"
      alt="list"
      @click="() => (isShow = !isShow)"
    />
  </div>
</template>
<style lang="scss" scoped>
div {
  display: flex;
  background-color: #e8e8e8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 80px;

  img {
    width: 40px;
    height: 40px;
    padding: 20px;

    &:hover {
      background-color: white;
      cursor: pointer;
    }
  }
}
</style>
