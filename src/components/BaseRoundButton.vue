<template>
  <button class="round-btn">
    <slot/>
  </button>
</template>

<style lang="scss" scoped>
.round-btn {
  height: 7rem;
  width: 7rem;
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
  box-shadow: 2px 3px 3px 0px rgba(#000, .3);
  background-color: #fff;
  transition: all .3s;

  &:hover,
  &:active {
    background-color: darken(#fff, 15%);
  }
}
</style>
