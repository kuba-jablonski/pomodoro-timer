<template>
  <div class="home">
    <div class="logo">
      <img class="logo__img" src="@/assets/tomato.png" alt="Tomato image">
      <h1 class="logo__title">
        <span>Pomodoro</span>
        <span>Timer</span>
      </h1>
    </div>
    <overdrive id="element" :duration="200">
      <router-link :style="style" to="/app" tag="a" @click="move" class="btn">Button</router-link>
    </overdrive>
  </div>
</template>

<script>
// import tomato from '@/assets/tomato.svg'
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  data () {
    return {
      style: ''
    }
  },
  beforeRouteLeave (to, from, next) {
    this.style = 'color: transparent;'
    setTimeout(() => {
      next()
    }, 10)
  }
}
</script>

<style lang="scss" scoped>

.home {
}

.logo {
  display: flex;
  justify-content: center;

  &__img {
    width: 6.8rem;
    height: 6.8rem;
  }

  &__title {
    font-family: "Lobster", serif;
    color: $color-primary;
    line-height: 1;

    span {
      display: block;

      &:first-of-type {
        font-size: 4rem;
      }

      &:last-of-type {
        font-size: 3rem;
      }
    }
  }
}

.btn {
  background-color: red;
  text-decoration: none;
  color: #fff;
  font-size: 2rem;
  width: 20rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin: 5rem auto 0 auto;
  transition: all 0.01s;
}
</style>
