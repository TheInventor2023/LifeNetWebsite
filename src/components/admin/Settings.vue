<template>
  <div class="bg-gray-800 rounded-2xl text-gray-300 p-2 m-2">
    <div class=" rounded-2xl m-2">
      <div id="header" class="text-center p-2">
        <h1 class="text-white font-title text-2xl text-center ">Website Settings</h1>
        <p class="text-gray-200">Control website related settings.</p>
      </div>
    </div>

    <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
      <div v-if="banner.showmodal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full relative text-white">

          <h1 class="font-title text-2xl text-white">Are you sure?</h1>

          <div class="flex justify-between">
            <button v-if="banner.modalreason === 'deploy'" class="p-2 rounded-xl m-2 w-full bg-green-800" @click="deployBanner">
              Deploy it!
            </button>
            <button v-if="banner.modalreason === 'delete'" class="p-2 rounded-xl m-2 w-full bg-green-800" @click="deleteBanner">
              Delete it!
            </button>
            <button class="p-2 rounded-xl m-2 w-full bg-red-800" @click="banner.showmodal=false">
              Nevermind
            </button>
          </div>

          <!-- Close button -->
          <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                  @click="banner.showmodal = false">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </button>
        </div>
      </div>
    </transition>

    <div class="flex flex-col">
      <div class="dark">
        <h1 class="text-xl px-4">Website Banner</h1>
        <banner embeded :body="banner.body" :title="banner.title" :type="banner.style"/>
        <div class="p-5 mx-4 border border-amber-50 rounded-2xl">
          <label class="text-white" for="title">Title:</label>
          <input id="title" v-model="banner.title"
                 class="block w-full px-4 py-2 mt-1 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-blue-500"
                 type="text">

          <label class="text-white" for="body">Body:</label>
          <input id="body" v-model="banner.body"
                 class="block w-full px-4 py-2 mt-1 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:border-blue-500"
                 type="text">

          <label class="text-white" for="dropdown">Style:</label>
          <select id="dropdown" v-model="banner.style"
                  class="block w-full px-4 py-2 mt-1 bg-gray-900 border border-gray-600 text-white rounded-lg focus:outline-none">
            <option value="INFO">Info</option>
            <option value="WARNING">Warning</option>
            <option value="ERROR">Error</option>
          </select>
          <span class="flex justify-center m-4 mb-0">
            <button @click="banner.showmodal = true; banner.modalreason = 'deploy'"
                class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 mx-2 px-4 rounded-full shadow-lg transition">Deploy Banner</button>
            <button @click="banner.showmodal = true; banner.modalreason = 'delete'"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 mx-2 px-4 rounded-full shadow-lg transition">Delete Banner</button>
          </span>
        </div>
      </div>


    </div>

  </div>
  <div>

  </div>
</template>
<script>
import Banner from "@/components/Banner.vue";
import axios from "@/api.js";
import {useToast} from "vue-toastification";

export default {
  name: "settings",
  components: {Banner},
  data() {
    return {
      banner: {
        style: 'INFO',
        title: 'This is a demo banner title',
        body: 'This is a demo banner body.',
        showmodal: false,
        modalreason: 'deploy',
      },
    }
  },
  methods: {
    deployBanner() {
      const bannerdata = {
        banner: {
          style: this.banner.style,
          title: this.banner.title,
          body: this.banner.body,
        }
      };
      axios.post('banners', bannerdata).then(value => {
        if (value.data.message === 'Successfully created new banner.') {
          this.banner.showmodal = false;
          useToast().success('Success!', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          });
        }
      }).catch(reason => {
        useToast().error('It no workie :(', {
          position: 'top-right',
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: true,
          rtl: false,
        });
      })
    },
    deleteBanner() {
      axios.delete('banners').then(value => {
        if (value.data.message === 'Successfully deleted banner.') {
          this.banner.showmodal = false;
          useToast().success('Success!', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false,
          });
        }
      }).catch(reason => {
        useToast().error('It no workie :(', {
          position: 'top-right',
          timeout: 2000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: true,
          rtl: false,
        });
      })
    },
    // modal
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(-50px)';
    },
    enter(el) {
      let opacity = 0;
      let top = -50;
      const opacityInterval = setInterval(() => {
        opacity += 0.25; // Adjust opacity increment for smoother fade-in
        el.style.opacity = opacity;
        if (opacity >= 1) {
          clearInterval(opacityInterval);
        }
      }, 100); // Adjust interval for smoother fade-in

      const flyInterval = setInterval(() => {
        top += 26; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top >= 0) {
          clearInterval(flyInterval);
          //done();
        }
      }, 100); // Adjust interval for smoother movement
    },
    leave(el, done) {
      let top = 0;
      const opacityInterval = setInterval(() => {
        el.style.opacity -= 0.25; // Adjust opacity decrement for smoother fade-out
        if (el.style.opacity <= 0) {
          clearInterval(opacityInterval);
        }
      }, 100); // Adjust interval for smoother fade-out

      const interval = setInterval(() => {
        top -= 10; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top <= -50) {
          clearInterval(interval);
          done();
        }
      }, 100); // Adjust interval for smoother movement
    }
  },
}
</script>
