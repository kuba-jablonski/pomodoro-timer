<template>
  <div class="settings">
    <p>Session Timer:</p>
    <settings-control @change="SET_SESSION_DURATION" :value="sessionTimer" :min="sessionMin" :max="sessionMax"/>
    <p>Break Timer:</p>
    <settings-control @change="SET_BREAK_DURATION" :value="breakTimer" :min="breakMin" :max="breakMax"/>
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
      breakMax: 15 * 60
    }
  },
  computed: {
    ...mapState([
      'sessionTimer',
      'breakTimer'
    ])
  },
  methods: {
    ...mapMutations([
      'SET_SESSION_DURATION',
      'SET_BREAK_DURATION'
    ])
  }
}
</script>
