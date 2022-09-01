<script setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTodoStore } from '../stores/todoStore'
import checkmarkImg from '../assets/icon-checkmark.png'
import circleImg from '../assets/icon--circle.png'

const todoStore = useTodoStore()
const { todoList, isShow } = storeToRefs(todoStore)
const { addTodo, getTodoList, getDoneTodoList, completeTodo, cancelTodo } =
  todoStore

const todo = ref('')
const completed = ref(false)

const getList = computed(() =>
  completed.value ? getDoneTodoList() : getTodoList()
)

const getIcon = computed(() => (completed.value ? checkmarkImg : circleImg))

const handleClickCompleted = () => (completed.value = true)
const handleClickIncompleted = () => (completed.value = false)

const handleCreate = () => {
  addTodo(todo.value)
  todo.value = ''
}

const handleCompleted = (id) => {
  completeTodo(id)
  getTodoList()
}

const handleBlur = (todo) => {
  todo.isEdit = false
}
</script>
<template>
  <div class="todoList">
    <div class="header">
      <h1>待辦清單</h1>
      <ul>
        <li>
          <button @click="handleClickIncompleted">未完成</button>
        </li>
        <li>
          <button @click="handleClickCompleted">已完成</button>
        </li>
      </ul>
    </div>
    <div class="addTodo">
      <input type="text" v-model="todo" placeholder="新增待辦事項" />
      <button type="button" @click="handleCreate">+</button>
    </div>
    <div>
      <div class="list">
        <ul>
          <li v-for="todo in getList" :key="todo.id">
            <div>
              <img :src="getIcon" @click="handleCompleted(todo.id)" />
              <p v-show="!todo.isEdit">{{ todo.title }}</p>
              <input
                type="text"
                v-model="todo.title"
                @blur="handleBlur(todo)"
                v-show="todo.isEdit"
              />
            </div>
            <div class="tools">
              <img
                v-if="!completed"
                src="../assets/icon-edit.svg"
                alt="edit"
                @click="() => (todo.isEdit = true)"
              />
              <img
                src="../assets/icon-cancel.svg"
                alt="cancel"
                @click="cancelTodo(todo.id)"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.todoList {
  width: 50%;
  height: 100%;
  padding: 20px;
  box-shadow: 5px 0 7px rgba(0, 0, 0, 0.2);

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    ul {
      display: flex;
      list-style: none;
      li {
        font-size: 16px;
        margin-right: 20px;
        border: none;
        text-decoration: none;

        button {
          text-decoration: none;
          background-color: #304030;
          color: #e8e8e8;
          border: 0;
          opacity: 0.5;
          font-size: 16px;

          &:hover {
            color: white;
            cursor: pointer;
            opacity: 1;
          }

          &:focus {
            color: white;
            font-weight: bold;
            opacity: 1;
          }
        }
      }
    }
  }

  .addTodo {
    display: flex;
    justify-content: space-evenly;
    input {
      width: 90%;
      height: 20px;
      border-radius: 20px;
      padding: 10px;
    }
    button {
      width: 40px;
      height: 40px;
      border: 0;
      border-radius: 50%;
      background-color: #f08448;
      color: white;
      font-size: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
  .list {
    ul {
      font-size: 24px;
      list-style: none;
      padding: 0;

      li {
        padding: 10px 0;
        border-top: 1px solid white;
        border-bottom: 1px solid white;
        display: flex;
        justify-content: space-between;

        div {
          display: flex;

          img {
            width: 30px;
            height: 30px;

            &:hover {
              cursor: pointer;
            }
          }
          p {
            margin: 0 0 0 10px;
          }
          input {
            height: 5px;
            border-radius: 20px;
            padding: 10px;
          }
        }
        .tools {
          img {
            padding-right: 10px;

            &:hover {
              color: white;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
