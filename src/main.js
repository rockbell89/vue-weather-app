import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueIcon from 'vue-icon'



// import VueWeatherApp from './components/Weather.vue';

Vue.use(VueResource);
Vue.use(VueIcon, 'v-icon');

// new Vue(VueWeatherApp).$mount('#app'); // el



new Vue({
  el: '#app',
  render: h => h(App)
})
