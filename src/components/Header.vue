<template>
  <div class="bg-black h-[6vh]"></div>
  <div
      class="max-sm:hidden h-[6vh] fixed backdrop-blur-sm bg-black bg-opacity-50 flex-row flex top-0 w-full justify-between z-50">
    <div class="flex">
      <div class="m-1 mx-6">
        <img alt="Cytonic's Logo" class="h-[5.5vh] mb-2" src="@/assets/icon.svg">
      </div>

      <div class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/home"> Home</router-link>
      </div>

      <div class="mx-6 self-center text-gray-300 hover:text-white transition">
        <a href="https://store.cytonic.net"> Store </a>
      </div>

      <div class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/contact"> Contact</router-link>
      </div>

      <!-- Not implemented yet
      <div v-if="this.$store.state.user" class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/my-account"> My Account</router-link>
      </div>
      <div v-else class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/auth/login">Log In</router-link>
      </div>

      <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)"
           class=" mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/admin/home">Admin Dashboard</router-link>
      </div>
      -->

    </div>
  </div>
  <div
      class="sm:hidden h-[6vh] fixed backdrop-blur-sm bg-black bg-opacity-50 flex-row flex top-0 w-full justify-between z-50">
    <div class="m-1 mx-6">
      <img alt="Cytonic's Logo" class="h-[5.5vh] mb-2" src="@/assets/icon.svg">
    </div>
    <!-- Open / close the navbar-->
    <div v-if="mobile.show" class="self-center text-gray-300 hover:text-white transition absolute m-7 mt-9 right-0">
      <button @click="mobile.show = false">
        <img alt="Close" src="@/assets/close.svg">
      </button>
    </div>
    <div v-if="!mobile.show" class="self-center text-gray-300 hover:text-white transition m-7 mt-9">
      <button @click="mobile.show = true">
        <img alt="Open Menu" src="@/assets/menu.svg">
      </button>
    </div>
  </div>
  <transition name="navbar" @enter="enter" @leave="leave" @before-enter="beforeEnter">

    <!-- The actual nav links-->
    <div v-if="mobile.show" class="flex flex-col text-left bg-black fixed w-full p-2 top-[5vh] py-4 z-40">
      <div class="mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <router-link to="/home" @click="mobile.show = false"> Home</router-link>
      </div>

      <div class="mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <a href="https://store.cytonic.net" @click="mobile.show = false"> Store </a>
      </div>

      <div class="mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <router-link to="/contact" @click="mobile.show = false"> Contact</router-link>
      </div>

      <!-- Backend isn't deployed yet
      <div v-if="this.$store.state.user" class="mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <router-link to="/my-account" @click="mobile.show = false"> My Account</router-link>
      </div>
      <div v-else class="mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <router-link to="/auth/login" @click="mobile.show = false">Log In</router-link>
      </div>


      <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)"
           class=" mx-6 self-center text-gray-300 hover:text-white transition text-2xl mt-2 font-title">
        <router-link to="/admin/home"  @click="mobile.show = false">Admin Dashboard</router-link>
      </div>
      -->
    </div>

  </transition>
  <banner v-if="banner.show" :body="banner.body" :title="banner.title" :type="banner.style"/>
</template>
<script>
import {adminAccess, getCookie} from "@/Utils.js";
import axios from "@/api.js";
import {useToast} from "vue-toastification";
import Banner from "@/components/Banner.vue";

export default {
  components: {Banner},
  methods: {
    adminAccess() {
      return adminAccess
    },

    // Nav bar on mobile
    beforeEnter(el) {
      el.style.transform = 'translateY(-36px)';
    },
    enter(el) {
      let top = -36;
      const flyInterval = setInterval(() => {
        top += .1125;
        if (top * top < 0) el.style.transform = `translateY(${top * top}px)`;
        else el.style.transform = `translateY(0px)`;
        if (top * top >= 0) {
          clearInterval(flyInterval);
          // done();
        }
      }, 20);
    },
    leave(el, done) {
      let top = 0;

      const interval = setInterval(() => {
        top -= 1; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top * -top}px)`;
        if (top <= -72) {
          clearInterval(interval);
          done();
        }
      }, 20); // Adjust interval for smoother movement
    }
  },
  data() {
    return {
      mobile: {
        show: false,
      },
      user: false,
      banner: {
        show: false,
        title: '',
        body: '',
        style: '',
      },
    }
  },
  mounted() {
    // authenticated
    if (getCookie('authToken') !== '') {
      if (this.$store.state.user) {
        this.user = this.$store.state.user;
      } else {
        axios.get('login', {})
            .then((response) => {
              console.log(response.data)
              this.$store.commit('set', response.data.data.user);
              useToast().success('Logged in!', {
                position: 'top-right',
                timeout: 500,
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
              this.user = response.data.data.user;
            })
            .catch((error) => {
              if (!error || !error.response) return;
              if (error.code === 'ERR_NETWORK') {
                useToast().error('Failed to restore your user session. Please log in again.', {
                  position: 'top-right',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  loseButton: 'button',
                  icon: false,
                  rtl: false,
                });
              }
            });
      }
    } // not logged in

    // fetch banners
    axios.get('banners').then(value => {
      if (value.data.message === 'No active banner') {
        return;
      }
      this.banner = value.data.data.banner;
      this.banner.show = true;
    }).catch(() => {
    });
  },
}
</script>
