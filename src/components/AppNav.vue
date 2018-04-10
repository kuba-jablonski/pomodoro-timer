<template>
  <nav class="nav">
    <router-link to="/app" tag="a" class="nav__link">
      <svg class="nav__icon">
        <use xlink:href="/static/sprite.svg#icon-alarm"></use>
      </svg>
    </router-link>
    <router-link to="/app/settings" tag="a" class="nav__link">
      <svg class="nav__icon">
        <use xlink:href="/static/sprite.svg#icon-cog"></use>
      </svg>      
    </router-link>
    <router-link to="/app/history" tag="a" class="nav__link">
      <svg class="nav__icon">
        <use xlink:href="/static/sprite.svg#icon-history"></use>
      </svg>        
    </router-link>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex;
  background-color: transparent;

  &__link {
    flex: 1 0;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.4rem;
    border-bottom: 1px solid rgba(#fff, .1);
    cursor: pointer;

    &:not(:last-child) {
      border-right: 1px solid rgba(#fff, .1);
    }
  }

  &__icon {
    height: 3rem;
    width: 3rem;
    fill: #fff;
  }
}
</style>
