import { ref } from 'vue'
import { defineStore } from 'pinia'
import audioAlarm from '../assets/audio/alarm.mp3'

export const useTimeStore = defineStore('timeStore', () => {
  const isWorking = ref(true)
  const isPlaying = ref(false)
  const currentTime = ref(import.meta.env.VITE_TIME)
  const mute = ref(false)
  const alarm = new Audio(audioAlarm)
  let timer = null

  const startCountdown = () => {
    isPlaying.value = true

    timer = setInterval(() => {
      currentTime.value--

      if (currentTime.value <= 0) {
        clearInterval(timer)

        if (!mute.value) {
          alarm.play()
        }

        isPlaying.value = false

        if (isWorking.value) {
          isWorking.value = false
          currentTime.value = import.meta.env.VITE_TIMEBREAK
        } else {
          isWorking.value = true
          currentTime.value = import.meta.env.VITE_TIME
        }
      }
    }, 1000)
  }

  const pauseCountdown = () => {
    isPlaying.value = false
    clearInterval(timer)
  }

  const passCountdown = () => {
    clearInterval(timer)
    mute.value = false
    alarm.pause()
    isPlaying.value = false
    isWorking.value = !isWorking.value
    isWorking.value
      ? (currentTime.value = import.meta.env.VITE_TIME)
      : (currentTime.value = import.meta.env.VITE_TIMEBREAK)
  }

  return {
    alarm,
    isWorking,
    isPlaying,
    currentTime,
    mute,
    startCountdown,
    pauseCountdown,
    passCountdown,
  }
})
