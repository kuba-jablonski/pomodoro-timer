<template>
  <div class="timer">
    <div class="progress">
      <div class="progress__canvas" ref="progress"/>
    </div>
    <timer-controls/>
    <timer-history/>
  </div>
</template>

<script>
import TimerControls from './TimerControls'
import TimerHistory from './TimerHistory'

export default {
  name: 'timer',
  components: {
    TimerControls,
    TimerHistory
  },
  mounted () {
    this.$store.commit('SET_CANVAS_CONTAINER', this.$refs.progress)
    this.$store.commit('DRAW_TIMER')
  }
}
</script>

<style lang="scss" scoped>
.timer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content min-content 4rem;
  align-content: space-between;
  justify-items: center;
}

.progress {
  max-width: 35rem;
  width: 90%;
  background-color: transparent;
}

// .timer--landscape {
//   display: grid;
//   grid-template-columns: 1fr 1fr;
//   grid-template-rows: 1fr 1fr;
//   justify-items: center;
//   align-items: center;

//   .progress {
//     grid-row: 1 / -1;
//   }
// }
</style>
