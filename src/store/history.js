export default {
  state: {
    task: 'Placeholder',
    startTime: null,
    endTime: null,
    currentPomodoro: [],
    fullHistory: []
  },

  mutations: {
    SET_START_TIME (state, value) {
      state.startTime = value
    },

    SET_END_TIME (state, value) {
      state.endTime = value
    },

    ADD_TO_POMODORO_HISTORY (state) {
      state.currentPomodoro.push({
        task: state.task,
        startTime: state.startTime,
        endTime: state.endTime
      })
    },

    ADD_POMODORO_TO_FULL_HISTORY (state) {
      state.fullHistory.push(state.currentPomodoro)
    },

    RESET_CURRENT_POMODORO_HISTORY (state) {
      state.currentPomodoro = []
    }
  }
}