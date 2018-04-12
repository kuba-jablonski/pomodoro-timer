import Vue from 'vue'
import Vuex from 'vuex'
import history from './history'
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
    sessionTimer: 2, // 1500 = 25min
    breakTimer: 1, // 300 = 5 min
    longBreakTimer: 10,
    secLeft: null,
    circle: null,
    progress: 0,
    interval: null,
    paused: null, // null is fresh timer
    step: null,
    canvasContainer: null,
    pomodoroCount: 4
  },

  mutations: {
    CALCULATE_STEP (state) {
      if (state.activeTimer === 'sessionTimer') {
        state.step = 1 / state.sessionTimer
      } else if (state.activeTimer === 'breakTimer') {
        state.step = 1 / state.breakTimer
      } else {
        state.step = 1 / state.longBreakTimer
      }
    },

    SET_PROGRESS (state, value) {
      state.progress = value
    },

    SET_PAUSE_STATE (state, value) {
      state.paused = value
    },

    DRAW_TIMER (state) {
      state.circle = new ProgressBar.Circle(state.canvasContainer, {
        color: '#fff',
        trailColor: 'rgba(0,0,0, .1)',
        strokeWidth: 3,
        trailWidth: 3,
        text: {
          value: convertSecsToTimerString(state.sessionTimer),
          style: {
            fontSize: '6rem',
            position: 'absolute',
            left: '50%',
            top: '50%',
            padding: 0,
            margin: 0,
            transform: {
              prefix: true,
              value: 'translate(-50%, -50%)'
            }
          }
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

    SET_LONG_BREAK_DURATION (state, value) {
      state.longBreakTimer = value
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
    },

    SET_CANVAS_CONTAINER (state, element) {
      state.canvasContainer = element
    },

    SET_POMODORO_COUNT (state, value) {
      state.pomodoroCount = value
    }
  },

  actions: {
    animateTimer ({ commit, state, dispatch }) {
      if (state.pomodoroCount === 0 && state.activeTimer === 'sessionTimer') {
        return dispatch('resetTimer')
      }

      if (!state.interval) {
        if (state.activeTimer === 'sessionTimer') {
          commit('SET_START_TIME', Date.now())
        }
        commit('CALCULATE_STEP')
        dispatch('activateTimer')

        commit('SET_INTERVAL', setInterval(() => {
          commit('SET_PROGRESS', state.progress + state.step)
          commit('SET_TIME_LEFT', state.secLeft - 1)
          state.circle.setText(convertSecsToTimerString(state.secLeft + 1))

          if (state.secLeft < 0) {
            commit('SET_INTERVAL', null)
            if (state.activeTimer === 'sessionTimer') {
              commit('SET_END_TIME', Date.now())
              commit('SET_POMODORO_COUNT', state.pomodoroCount - 1)
              if (state.pomodoroCount > 0) {
                commit('SET_ACTIVE_TIMER', 'breakTimer')
              } else {
                commit('SET_ACTIVE_TIMER', 'longBreakTimer')
              }
              commit('ADD_TO_POMODORO_HISTORY')
            } else if (state.activeTimer === 'breakTimer' || state.activeTimer === 'longBreakTimer') {
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

    resetTimer ({ commit, state }) {
      state.circle.destroy()
      commit('ADD_POMODORO_TO_FULL_HISTORY')
      commit('RESET_CURRENT_POMODORO_HISTORY')
      commit('SET_INTERVAL', null)
      commit('SET_PROGRESS', 0)
      commit('SET_PAUSE_STATE', null)
      commit('SET_POMODORO_COUNT', 4)
      commit('SET_ACTIVE_TIMER', 'sessionTimer')
      commit('DRAW_TIMER')
    },

    activateTimer ({ commit, state }) {
      if (state.activeTimer === 'sessionTimer' && !state.paused) {
        commit('SET_PROGRESS', 0)
        commit('SET_TIME_LEFT', state.sessionTimer)
      } else if (state.activeTimer === 'breakTimer' && !state.paused) {
        commit('SET_PROGRESS', 1)
        commit('SET_TIME_LEFT', state.breakTimer)
      } else {
        commit('SET_PROGRESS', 1)
        commit('SET_TIME_LEFT', state.longBreakTimer)        
      }
      commit('SET_PAUSE_STATE', false)
      state.circle.set(state.progress)
    },

    pauseTimer ({ commit }) {
      commit('SET_INTERVAL', null)
      commit('SET_PAUSE_STATE', true)
    }
  },

  getters: {
    pomodoroHistory (state) {
      let arr = []
      for (let i = 4; i > 0; i--) {
        if (state.pomodoroCount - i >= 0) {
          arr.push(false)
        } else {
          arr.push(true)
        }
      }

      return arr
    },

    isFreshTimer (state) {
      return state.paused === null
    }

  },

  modules: {
    history
  }

})
