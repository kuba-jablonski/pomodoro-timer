<template>
  <overdrive id="element" :duration="200">
    <div class="about">
      <Timer/>
    </div>
  </overdrive>
</template>

<script>
import Timer from '@/components/Timer'

export default {
  components: {
    Timer
  }
}
</script>

<style lang="scss" scoped>
.about {
  background-color: red;
  height: 100vh;
  width: 100%;
}
</style>
