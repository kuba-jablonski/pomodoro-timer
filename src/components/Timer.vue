<template>
  <div class="timer" :class="{'timer--landscape': landscape}">
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
  data () {
    return {
      landscape: false
    }
  },
  methods: {
    checkOrientation () {
      if (window.innerWidth > window.innerHeight) {
        this.landscape = true
      } else {
        this.landscape = false
      }
    }
  },
  mounted () {
    this.$store.commit('SET_CANVAS_CONTAINER', this.$refs.progress)
    this.$store.commit('DRAW_TIMER')
    this.checkOrientation()
    window.addEventListener('resize', this.checkOrientation)
  },
  destroyed () {
    window.removeEventListener('resize', this.checkOrientation)
  }
}
</script>

<style lang="scss" scoped>
.timer {
  height: 100%;
  display: grid;
  grid-template-rows: min-content min-content 1fr;
  grid-row-gap: 2rem;
  justify-items: center;
  align-items: end;
  padding-top: 3rem;
}

.progress {
  max-width: 35rem;
  width: 90%;
  background-color: transparent;
}

.timer--landscape {
  padding-top: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  justify-items: center;
  align-items: center;

  .progress {
    grid-row: 1 / -1;
    width: 80%;
  }
}
</style>
