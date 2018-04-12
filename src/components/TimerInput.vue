<template>
  <input @focus="maybeClearTask" @blur="maybeResetTask" class="input" type="text" v-model="task" :style="italicText">
</template>

<script>
export default {
  data () {
    return {
      taskDefaultValue: 'Set task...'
    }
  },
  computed: {
    task: {
      get () {
        return this.$store.state.history.task
      },
      set (value) {
        this.$store.commit('SET_TASK', value)
      }
    },
    italicText () {
      if (this.task === this.taskDefaultValue) {
        return 'font-style: italic;'
      }
    }
  },
  methods: {
    maybeResetTask () {
      if (this.task.trim() === '') {
        this.$store.commit('SET_TASK', this.taskDefaultValue)
      }
    },
    maybeClearTask () {
      if (this.task === this.taskDefaultValue) {
        this.$store.commit('SET_TASK', '')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  font-size: 2rem;
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  text-align: center;
}
</style>
