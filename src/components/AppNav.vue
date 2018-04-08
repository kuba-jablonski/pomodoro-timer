<template>
  <nav class="nav">
    <router-link to="/app" tag="a" class="nav__link">App</router-link>
    <router-link to="/app/settings" tag="a" class="nav__link">Settings</router-link>
    <router-link to="/app/history" tag="a" class="nav__link">History</router-link>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  height: 4rem;
  background-color: #fff;

  &__link {
    flex: 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1px solid #ccc;
    }
  }
}
</style>
