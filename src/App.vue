<template>
  <div id="app">
    <weather-app></weather-app>
  </div>
</template>

<script>
import VueWeatherApp from './components/Weather.vue';

export default {
  name: 'app',
  components: {
    'weather-app' : VueWeatherApp,
  },
}
</script>

<style>
body {padding: 0; margin: 0;}
</style>
