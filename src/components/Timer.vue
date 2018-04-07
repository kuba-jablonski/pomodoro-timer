<template>
<div>
  <div class="timer" ref="timer">
  </div>
  <button @click="animate">Start</button>
  <button @click="stop">Stop</button>
</div>

</template>

<script>
var ProgressBar = require('progressbar.js')

export default {
  data () {
    return {
      activeTimer: 'sessionTimer',
      sessionTimer: 10,
      breakTimer: 5,
      secLeft: null,
      circle: null,
      progress: 0,
      interval: null
    }
  },
  computed: {
    step () {
      if (this.activeTimer === 'sessionTimer') {
        return 1 / this.sessionTimer
      } else if (this.activeTimer === 'breakTimer') {
        return 1 / this.breakTimer
      }
    }
  },
  methods: {
    animate () {
      if (!this.interval) {

        if (this.activeTimer === 'sessionTimer') {
          this.progress = 0
          this.secLeft = this.sessionTimer
          console.log('boop')
        } else if (this.activeTimer === 'breakTimer') {
          this.progress = 1
          this.secLeft = this.breakTimer
          console.log('yup')
        }

        this.circle.set(this.progress)

        this.interval = setInterval(() => {
          this.progress = this.progress + this.step
          this.secLeft = this.secLeft - 1
          this.circle.setText((this.secLeft + 1).toString())
          
          if (this.secLeft < 0) {
            clearInterval(this.interval)
            this.interval = null
            this.activeTimer = 'breakTimer'
            return this.animate()
          }

          this.circle.animate(this.progress, {
            duration: 1000
          })

        }, 1000)
      }
    },
    stop () {
      clearInterval(this.interval)
      this.interval = null
    },
    switchTimers () {

    },
    draw () {
      this.circle = new ProgressBar.Circle(this.$refs.timer, {
          color: '#FCB03C',
          strokeWidth: 3,
          trailWidth: 1,
          text: {
              value: '5'
          }
      })
    }
  },
  mounted () {
    console.log(ProgressBar)
    console.log(this.$refs.timer)
    this.draw()
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
