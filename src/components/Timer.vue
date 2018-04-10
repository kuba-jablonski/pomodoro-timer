<template>
  <div>
    <div class="timer" ref="timer"/>
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
    this.$store.commit('SET_CANVAS_CONTAINER', this.$refs.timer)
    this.$store.commit('DRAW_TIMER')
  }
}
</script>

<style lang="scss" scoped>
.timer {
  max-width: 35rem;
  // margin: 0 auto;
  background-color: transparent;
}
</style>
