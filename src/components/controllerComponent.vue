<script setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTimeStore } from '../stores/timeStore'
import itemList from '../components/ItemList.vue'
import playImg from '../assets/icon-play--orange.svg'
import pauseImg from '../assets/icon-pause--orange.svg'
import breakPlayImg from '../assets/icon-play--green.svg'
import breakPauseImg from '../assets/icon-pause--green.svg'
import bellImg from '../assets/icon-bell.png'
import bellMuteImg from '../assets/icon-bell-mute.png'
import cancelImg from '../assets/icon-cancel.svg'

const timeStore = useTimeStore()
const { currentTime, isWorking, isPlaying, mute } = storeToRefs(timeStore)
const { startCountdown, pauseCountdown, passCountdown } = timeStore

const timeMin = computed(() =>
  Math.floor(currentTime.value / 60)
    .toString()
    .padStart(2, '0')
)
const timeSec = computed(() =>
  (currentTime.value % 60).toString().padStart(2, '0')
)

const getplayImg = computed(() => (isPlaying.value ? pauseImg : playImg))
const getBreakImg = computed(() =>
  isPlaying.value ? breakPauseImg : breakPlayImg
)
const getBellImg = computed(() => (mute.value ? bellMuteImg : bellImg))
const getCountdown = () => {
  isPlaying.value ? pauseCountdown() : startCountdown()
}
</script>
<template>
  <div class="controller">
    <div class="countDown">
      <div class="time">{{ timeMin }}:{{ timeSec }}</div>
      <div>
        <button class="bell" @click="mute = !mute">
          <img :src="getBellImg" alt="bell" />
        </button>
        <button class="play" @click="getCountdown">
          <img v-if="isWorking" :src="getplayImg" alt="working play" />
          <img v-else :src="getBreakImg" alt="break play" />
        </button>
        <button class="cancel" @click="passCountdown">
          <img :src="cancelImg" alt="cancel" />
        </button>
      </div>
    </div>
    <itemList />
  </div>
</template>
<style lang="scss" scoped>
.controller {
  display: flex;
  height: 58%;
  margin-top: 40px;

  .countDown {
    width: 50%;
    text-align: center;

    .time {
      font-size: 200px;
    }
    button {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 1px solid white;
      margin: 10px;
      padding: 10px;
      background-color: #304030;

      img {
        width: 30px;
        height: 30px;
      }

      &:hover {
        cursor: pointer;
      }
    }
    .play {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
