<template>
  <div class="settings-control">
    <button @click="$emit('change', value - 60)" class="settings-control__button">&lt;</button>
    <span class="settings-control__display">{{ value | secToMin }}</span>
    <button @click="$emit('change', value + 60)" class="settings-control__button">&gt;</button>
  </div>
</template>

<script>
export default {
  props: ['value', 'min', 'max'],
  filters: {
    secToMin (value) {
      return value / 60
    }
  }
}
</script>
