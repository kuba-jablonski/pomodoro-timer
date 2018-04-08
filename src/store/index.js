import Vue from 'vue'
import Vuex from 'vuex'
import ProgressBar from 'progressbar.js'

Vue.use(Vuex)

function convertSecsToTimerString (secs) {
  const min = Math.floor(secs / 60)
  const sec = secs % 60
  
  let secString
  
  if (sec < 10) {
    secString = '0' + sec
  } else {
    secString = sec
  }
  
  return `${min}:${secString}`
}

export default new Vuex.Store({
  state: {
    activeTimer: 'sessionTimer',
    sessionTimer: 1500,
    breakTimer: 300,
    secLeft: null,
    progressBar: null,
    progress: 0,
    interval: null,
    paused: false,
    step: null
  },

  mutations: {
    CALCULATE_STEP (state) {
      if (state.activeTimer === 'sessionTimer') {
        state.step = 1 / state.sessionTimer
      } else if (state.activeTimer === 'breakTimer') {
        state.step = 1 / state.breakTimer
      }
    },

    SET_TIMER (state) { // !!! rename to TOGGLE_TIMER? ot ACTIVATE_TIMER
      if (state.activeTimer === 'sessionTimer' && !state.paused) {
        state.progress = 0
        state.secLeft = state.sessionTimer
      } else if (state.activeTimer === 'breakTimer' && !state.paused) {
        state.progress = 1
        state.secLeft = state.breakTimer
      }
      state.paused = false
      state.circle.set(state.progress)
    },

    DESTROY_TIMER (state) {
      state.circle.destroy()
      clearInterval(state.interval)
      state.interval = null
    },

    PAUSE_TIMER (state) {
      clearInterval(state.interval)
      state.interval = null
      state.paused = true
    },

    DRAW_TIMER (state, element) {
      state.circle = new ProgressBar.Circle(element, {
        color: '#FCB03C',
        strokeWidth: 3,
        trailWidth: 1,
        text: {
          value: convertSecsToTimerString(state.sessionTimer)
        }
      })
    },

    SET_SESSION_DURATION (state, value) {
      state.sessionTimer = value
    },

    SET_BREAK_DURATION (state, value) {
      state.breakTimer = value
    }
  },

  actions: {
    // SHOULD NOT MANIPULATE STATE
    animateTimer ({ commit, state, dispatch }) {
      if (!state.interval) {
        commit('CALCULATE_STEP')
        commit('SET_TIMER')

        state.interval = setInterval(() => {
          state.progress = state.progress + state.step
          state.secLeft = state.secLeft - 1
          state.circle.setText(convertSecsToTimerString(state.secLeft + 1))

          if (state.secLeft < 0) {
            clearInterval(state.interval)
            state.interval = null
            if (state.activeTimer === 'sessionTimer') {
              state.activeTimer = 'breakTimer'
            } else if (state.activeTimer === 'breakTimer') {
              state.activeTimer = 'sessionTimer'
            }
            return dispatch('animateTimer')
          }

          state.circle.animate(state.progress, {
            duration: 1000
          })
        }, 1000)
      }
    },

    resetTimer ({ commit }, element) {
      commit('DESTROY_TIMER')
      commit('DRAW_TIMER', element)
    }

  }
})
