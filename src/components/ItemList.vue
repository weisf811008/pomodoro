<script setup>
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todoStore'
import { useTimeStore } from '../stores/timeStore'
import { computed } from 'vue-demi'

const todoStore = useTodoStore()
const { todoList } = storeToRefs(todoStore)
const {
  getDoneTodoList,
  getTodoList,
  addTodo,
  updateTodo,
  completeTodo,
  cancelTodo,
} = todoStore

const timeStore = useTimeStore()
const { isWorking, isPlaying, mute } = storeToRefs(timeStore)

const getTitle = computed(() =>
  getTodoList().length === 0 ? `無待辦事項` : `待辦事項`
)

const handleCompleted = (id) => {
  completeTodo(id)
  getTodoList()
}
</script>
<template>
  <template v-if="isWorking">
    <div class="checkList">
      <h1>{{ getTitle }}</h1>
      <ul>
        <li
          v-for="todo in getTodoList()"
          :key="todo.id"
          @click="handleCompleted(todo.id)"
        >
          <img src="../assets/icon--circle.png" />
          <p>{{ todo.title }}</p>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <div class="break">
      <h1>休息，</h1>
      <h2>是為了下一次的努力!</h2>
    </div>
  </template>
</template>
<style lang="scss" scoped>
.checkList {
  display: flex;
  width: 50%;

  h1 {
    font-size: 64px;
  }

  ul {
    list-style: none;

    li {
      font-size: 32px;
      display: flex;
      margin: 20px 0;

      img {
        width: 30px;
        height: 30px;

        &:hover {
          color: white;
          cursor: pointer;
        }
      }
      p {
        margin: 0 0 0 10px;
      }
    }
  }
}
.break {
  width: 50%;

  h1 {
    font-size: 64px;
  }
  h2 {
    font-size: 32px;
  }
}
</style>
