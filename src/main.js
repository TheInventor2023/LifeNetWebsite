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
import {marked} from "marked";
import hljs from "highlight.js";

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

const renderer = new marked.Renderer();

renderer.heading = (text, level) => {
    const baseClass = 'font-bold mb-4';
    const classes = [
        'text-2xl',  // h1
        'text-xl',   // h2
        'text-lg',   // h3
        'text-md',   // h4
        'text-sm',   // h5
        'text-xs'    // h6
    ];
    return `<h${level} class="${baseClass} ${classes[level - 1]}">${text}</h${level}>`;
};

renderer.paragraph = (text) => {
    return `<p class="mb-4 text-wrap break-words">${text}</p>`;
};

renderer.hr = () => {
    return `<hr class="mb-4 mt-2"/>`;
}

renderer.link = (href, title, text) => {
    return `<a href="${href}" title="${title}" class="text-blue-500 hover:underline">${text}</a>`;
};

renderer.list = (body, ordered, depth) => {
    const type = ordered ? 'ol' : 'ul';
    const classes = depth === 1 ? 'list-disc list-inside' : 'list-disc ml-4'; // Adjust margin-left for nested lists
    return `<${type} class="${classes}">${body}</${type}>`; // Adjust margin-bottom to reduce spacing between list items
};

renderer.code = (code, language) => {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    const highlighted = hljs.highlight(code, { language: validLanguage }).value;
    return `<pre class="bg-gray-800 text-white p-4 rounded-md"><code class="hljs ${validLanguage}">${highlighted}</code></pre>`;
};

renderer.codespan = (code) => {
    return `<code class="bg-gray-200 text-red-600 px-1 rounded">${code}</code>`;
};

renderer.blockquote = (quote) => {
    return `<blockquote class="border-l-4 border-gray-500 pl-4 italic text-gray-400 my-4">${quote}</blockquote>`;
};

// Use the custom renderer
marked.setOptions({
    renderer: renderer,
});


const markedMixin = {
    methods: {
        md: function (text) {
            return marked.parse(text)
        }
    }
}

const app = createApp(App);

app.use(Toast, {
    transition: 'Vue-Toastification__bounce',
    maxToasts: 20,
    newestOnTop: true,
});
app.use(FloatingVue)
app.mixin(markedMixin)
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router)
app.use(store)
app.mount('#app')
