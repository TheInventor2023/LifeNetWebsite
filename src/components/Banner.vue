<template>
  <div v-if="show" :class="this.pos_style" class="w-[100%] text-white">
    <div :class="this.bg_style" class="rounded-md m-3 p-3 drop-shadow-2xl">
      <button class="top-0 absolute right-0 mt-4 mr-4 text-black"
              @click="hide">
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
        </svg>
      </button>
      <h1 class="text-2xl font-title">{{title}}</h1>
      <p>{{body}}</p>
    </div>
  </div>
</template>

<script>
import {getCookie} from "@/Utils.js";

export default {
  name: "Banner",
  props: {
    type: {
      type: String,
      default: 'INFO', // possible values are "INFO", "WARNING", "ERROR"
    },
    title: {
      type: String,
      default: 'This is a demo banner.',
    },
    body: {
      type: String,
      default: 'This is some demo banner content!',
    },
    embeded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: true,
      bg_style: 'bg-pink-500',
      pos_style: 'absolute',
    }
  },
  methods: {
    toJson() {
      return {
        body: this.body,
        title: this.title,
        type: this.type
      }
    },
    hide() {
      this.show = false
      if(getCookie('cytonic_accepted_cookies')) { // only do it if the user has accepted to cookies
        const expirationDate = new Date(Date.now() + 30 * 60 * 60 * 1000);
        const cookieValue = `${encodeURIComponent(JSON.stringify(this.toJson()))}; expires=${expirationDate.toUTCString()}; path=/`;
        document.cookie = `banner=${cookieValue}; SameSite=Strict; Secure`;
      }
    },
  },
  updated() {
    if (getCookie("banner") === JSON.stringify(this.toJson())) this.show = false;

    if(this.type === 'INFO') {
      this.bg_style = "bg-blue-500";
    } else if(this.type === 'WARNING') {
      this.bg_style = "bg-yellow-500";
    } else if(this.type === 'ERROR') {
      this.bg_style = "bg-red-500";
    }
  },
  mounted() {
    if(this.embeded) {
      this.pos_style = 'relative'
    }

    if(this.type === 'INFO') {
      this.bg_style = "bg-blue-500";
    } else if(this.type === 'WARNING') {
      this.bg_style = "bg-yellow-500";
    } else if(this.type === 'ERROR') {
      this.bg_style = "bg-red-500";
    }
  }
}
</script>
