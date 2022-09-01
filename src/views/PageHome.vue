<script setup>
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todoStore'
import toggleList from '../components/toggleList.vue'
import dateLabel from '../components/dateLabel.vue'
import todoList from '../components/todoList.vue'
import controllerComponent from '../components/controllerComponent.vue'
import itemList from '../components/ItemList.vue'
import footerImg from '../components/footerImg.vue'

const todoStore = useTodoStore()
const { isShow } = storeToRefs(todoStore)
</script>

<template>
  <div class="container">
    <toggleList />
    <div class="main">
      <dateLabel />
      <todoList v-show="isShow" />
      <controllerComponent />
      <!-- <itemList /> -->
      <footerImg />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .main {
    width: 100%;
    height: 100%;
  }
}
</style>
