import { ref } from 'vue'
import { defineStore } from 'pinia'
import { nanoid } from 'nanoid'

export const useTodoStore = defineStore('todoStore', () => {
  const todoList = ref([])
  const isShow = ref(false)

  //取得完成狀態的todoList
  const getDoneTodoList = () => todoList.value.filter((todo) => todo.done)

  //取得未完成狀態的todoList
  const getTodoList = () => todoList.value.filter((todo) => !todo.done)

  //新增todo
  const addTodo = (todo) => {
    if (todo.trim() !== '')
      todoList.value.push({
        id: nanoid(),
        title: todo.trim(),
        done: false,
        isEdit: false,
      })
  }

  //修改todo
  const updateTodo = (id, text) => {
    todoList.value = todoList.value.map((t) =>
      t.id === id ? { ...t, title: text } : t
    )
  }

  //完成todo
  const completeTodo = (id) => {
    const todo = todoList.value.find((t) => t.id === id)
    todo.done = true
  }

  //取消todo
  const cancelTodo = (id) => {
    todoList.value = todoList.value.filter((t) => t.id !== id)
  }

  return {
    todoList,
    isShow,
    getDoneTodoList,
    getTodoList,
    addTodo,
    updateTodo,
    completeTodo,
    cancelTodo,
  }
})
