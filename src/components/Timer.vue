<template>
<div>
  <div class="timer" ref="timer">
  </div>
  <button @click="$store.dispatch('animateTimer')">Start</button>
  <button @click="$store.commit('PAUSE_TIMER')">Stop</button>
  <!-- <input v-model="sessionTimer" type="number"> -->
  <!-- <input v-model="breakTimer" type="number"> -->
</div>

</template>

<script>
export default {
  mounted () {
    this.$store.commit('DRAW_TIMER', this.$refs.timer)
  }
}
</script>

<style lang="scss" scoped>
.timer {
  width: 20rem;
  height: 20rem;
  background-color: black;
}
</style>
