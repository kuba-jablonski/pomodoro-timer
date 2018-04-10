<template>
  <transition name="slide">
    <div v-if="!isFreshTimer" class="history">
      <div v-for="(elem, index) in pomodoroHistory" :key="index" class="circle" :class="{'circle--full': elem}"></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'pomodoroHistory',
      'isFreshTimer'
    ])
  }
}
</script>

<style lang="scss" scoped>
.history {
  display: flex;
  width: 100%;
  height: 5rem;
  justify-content: space-around;
  align-items: center;
}

.circle {
  height: 3rem;
  width: 3rem;
  border: 2px solid #fff;
  border-radius: 50%;

  &--full {
    background-color: #fff;
  }
}

.slide-enter-active, .slide-leave-active {
  transition: all .3s ease-out;
}
.slide-enter, .slide-leave-to {
  transform: translateY(4rem);
  opacity: 0;
}
</style>
