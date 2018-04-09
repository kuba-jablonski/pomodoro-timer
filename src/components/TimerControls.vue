<template>
  <div>
    <base-round-button v-if="paused === null || paused === true" @click.native="$store.dispatch('animateTimer')">start</base-round-button>
    <base-round-button v-else @click.native="$store.dispatch('pauseTimer')">Stop</base-round-button>
    <base-round-button @click.native="$store.dispatch('resetTimer')">reset</base-round-button>
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
