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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.progress {
  max-width: 35rem;
  width: 100%;
  padding: 3rem;
  background-color: transparent;
}
</style>
