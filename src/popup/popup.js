import Vue from 'vue';
import App from './App';
import vuetify from '../plugins/vuetify'; // path to vuetify export

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify,
  render: h => h(App),
});
