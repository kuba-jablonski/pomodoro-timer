<template>
<div>
  <div class="timer" ref="timer">
  </div>
  <button @click="$store.dispatch('animateTimer')">Start</button>
  <button @click="$store.dispatch('pauseTimer')">Stop</button>
  <button @click="$store.dispatch('resetTimer', $refs.timer)">Reset</button>
  <!-- <input v-model="sessionTimer" type="number"> -->
  <!-- <input v-model="breakTimer" type="number"> -->
</div>

</template>

<script>
export default {
  name: 'timer',
  mounted () {
    this.$store.commit('DRAW_TIMER', this.$refs.timer)
  }
}
</script>

<style lang="scss" scoped>
.timer {
  max-width: 35rem;
  margin: 0 auto;
  background-color: transparent;
}
</style>
