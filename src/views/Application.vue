<template>
  <overdrive id="element" :duration="200">
    <div class="app">
      <AppNav/>
      <keep-alive include="timer">
        <router-view/>
      </keep-alive>
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
  background-color: red;
  height: 100vh;
  width: 100%;
}
</style>
