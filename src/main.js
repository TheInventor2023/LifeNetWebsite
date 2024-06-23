import {createApp} from 'vue'
import '@/css/app.css'
import App from './App.vue'
import router from "@/router/index.js";
import {library} from '@fortawesome/fontawesome-svg-core';
import {faDiscord, faGithub} from '@fortawesome/free-brands-svg-icons';
import {faFlag, faLock, faLockOpen, faPencil, faTrash, faXmark} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import '@/assets/tailwind.css'
import store from "@/store/user.js";
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

library.add(
    faDiscord,
    faGithub,
    faXmark,
    faTrash,
    faPencil,
    faFlag,
    faLock,
    faLockOpen,
)

const app = createApp(App);

app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
});
app.use(FloatingVue)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(store)
app.mount('#app')
