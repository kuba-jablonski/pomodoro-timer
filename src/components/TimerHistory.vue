<template>
  <div v-if="!isFreshTimer" class="history">
    <div v-for="(elem, index) in pomodoroHistory" :key=index class="circle" :class="{'circle--full': elem}"></div>
  </div>
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
  height: 100%;
  justify-content: space-around;
  margin-top: auto;
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
</style>
