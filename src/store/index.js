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
    sessionTimer: 1500,  //1500 = 25min
    breakTimer: 300,  // 300 = 5 min
    secLeft: null,
    circle: null,
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

    SET_PROGRESS (state, value) {
      state.progress = value
    },

    DESTROY_TIMER (state) {
      state.circle.destroy()
      clearInterval(state.interval)
      state.interval = null
    },

    SET_PAUSE_STATE (state, bool) {
      state.paused = bool
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
      state.circle.set(state.progress)
      if (state.interval) {
        state.circle.setText(convertSecsToTimerString(state.secLeft + 1))
      }
    },

    SET_SESSION_DURATION (state, value) {
      state.sessionTimer = value
    },

    SET_BREAK_DURATION (state, value) {
      state.breakTimer = value
    },

    SET_TIME_LEFT (state, value) {
      state.secLeft = value
    },

    SET_INTERVAL (state, value) {
      if (value) {
        state.interval = value
      } else {
        clearInterval(state.interval)
        state.interval = null        
      }
    },

    SET_ACTIVE_TIMER (state, value) {
      state.activeTimer = value
    }
  },

  actions: {
    animateTimer ({ commit, state, dispatch }) {
      if (!state.interval) {
        commit('CALCULATE_STEP')
        dispatch('activateTimer')

        commit('SET_INTERVAL', setInterval(() => {
          commit('SET_PROGRESS', state.progress + state.step)
          commit('SET_TIME_LEFT', state.secLeft - 1)
          state.circle.setText(convertSecsToTimerString(state.secLeft + 1))

          if (state.secLeft < 0) {
            commit('SET_INTERVAL', null)
            if (state.activeTimer === 'sessionTimer') {
              commit('SET_ACTIVE_TIMER', 'breakTimer')
            } else if (state.activeTimer === 'breakTimer') {
              commit('SET_ACTIVE_TIMER', 'sessionTimer')
            }
            return dispatch('animateTimer')
          }

          state.circle.animate(state.progress, {
            duration: 1000
          })
        }, 1000))
      }
    },

    resetTimer ({ commit }, element) {
      commit('DESTROY_TIMER')
      commit('DRAW_TIMER', element)
    },

    activateTimer ({ commit, state }) {
      if (state.activeTimer === 'sessionTimer' && !state.paused) {
        commit('SET_PROGRESS', 0)
        commit('SET_TIME_LEFT', state.sessionTimer)
      } else if (state.activeTimer === 'breakTimer' && !state.paused) {
        commit('SET_PROGRESS', 1)
        commit('SET_TIME_LEFT', state.breakTimer)
      }
      commit('SET_PAUSE_STATE', false)
      state.circle.set(state.progress)
    },

    pauseTimer ({ commit }) {
      commit('SET_INTERVAL', null)
      commit('SET_PAUSE_STATE', true)
    }
  }
})
