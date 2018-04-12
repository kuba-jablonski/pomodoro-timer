<template>
  <table>
    <thead>
      <th>task</th>
      <th>start</th>
      <th>end</th>
    </thead>
    <tbody>
      <tr v-for="session in currentPomodoro" :key="session.startTime">
        <td>{{ session.task }}</td>
        <td>{{ session.startTime }}</td>
        <td>{{ session.endTime }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  computed: {
    currentPomodoro () {
      return this.$store.state.history.currentPomodoro
    }
  }
}
</script>
