<template>
  <div class="timer-controls">
    <base-round-button v-if="paused === null || paused === true" @click.native="$store.dispatch('animateTimer')">
      <svg class="icon">
        <use xlink:href="/static/sprite.svg#icon-play3"></use>
      </svg>
    </base-round-button>
    <base-round-button v-else @click.native="$store.dispatch('pauseTimer')">
      <svg class="icon">
        <use xlink:href="/static/sprite.svg#icon-pause2"></use>
      </svg>
    </base-round-button>
    <base-round-button @click.native="$store.dispatch('resetTimer')">
      <svg class="icon">
        <use xlink:href="/static/sprite.svg#icon-stop2"></use>
      </svg>
    </base-round-button>
  </div>
</template>

<script>
import BaseRoundButton from './BaseRoundButton'

export default {
  components: {
    BaseRoundButton
  },
  computed: {
    paused () {
      return this.$store.state.paused
    }
  }
}
</script>

<style lang="scss" scoped>
.timer-controls {
  width: 100%;
  display: grid;
  grid-template-columns: min-content min-content;
  grid-column-gap: 3rem;
  justify-content: center;
}

.icon {
  height: 2.7rem;
  width: 2.7rem;
  fill: $color-primary;
}
</style>
