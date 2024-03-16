import { createApp } from 'vue'
import '@/css/app.css'
import App from './App.vue'
import router from "@/router/index.js";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';

import '@/assets/tailwind.css'

library.add (
    faDiscord,
    faGithub
)

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.mount('#app')
