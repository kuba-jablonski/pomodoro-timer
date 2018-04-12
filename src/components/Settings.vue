<template>
  <div class="settings">
    <p>Session Timer:</p>
    <settings-control @change="SET_SESSION_DURATION" :value="sessionTimer" :min="sessionMin" :max="sessionMax"/>
    <p>Short Break Timer:</p>
    <settings-control @change="SET_BREAK_DURATION" :value="breakTimer" :min="breakMin" :max="breakMax"/>
    <p>Long Break Timer</p>
    <settings-control @change="SET_LONG_BREAK_DURATION" :value="longBreakTimer" :min="longBreakMin" :max="longBreakMax"/>
  </div>
</template>

<script>
import SettingsControl from './SettingsControl'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    SettingsControl
  },
  data () {
    return {
      sessionMin: 15 * 60,
      sessionMax: 60 * 60,
      breakMin: 1 * 60,
      breakMax: 15 * 60,
      longBreakMin: 5 * 60,
      longBreakMax: 30 * 60
    }
  },
  computed: {
    ...mapState([
      'sessionTimer',
      'breakTimer',
      'longBreakTimer'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_SESSION_DURATION',
      'SET_BREAK_DURATION',
      'SET_LONG_BREAK_DURATION'
    ])
  }
}
</script>
