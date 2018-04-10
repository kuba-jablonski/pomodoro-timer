<template>
  <overdrive id="element" :duration="200">
    <div class="app">
      <AppNav/>
      <!-- <keep-alive include="timer"> -->
        <router-view/>
      <!-- </keep-alive> -->
    </div>
  </overdrive>
</template>

<script>
import Timer from '@/components/Timer'
import AppNav from '@/components/AppNav'

export default {
  components: {
    Timer,
    AppNav
  }
}
</script>

<style lang="scss" scoped>
.app {
  background-color: $color-primary;
  height: 100vh;
  width: 100%;

  display: grid;
  grid-template-rows: 5rem 1fr;
  grid-gap: 3rem;
}
</style>
