import { createApp } from 'vue';
import router from './router';

// Vuetify
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
// Import CSS của Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import JavaScript của Bootstrap (nếu cần)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import store from './store';
// Components
import App from './App.vue';
//import './style.css';

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(vuetify).use(store).use(router).mount('#app');
