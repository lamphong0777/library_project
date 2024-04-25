//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap/js/dist/util";
import "bootstrap/dist/js/bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from "./router";

createApp(App).use(router).mount('#app')