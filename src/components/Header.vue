<template>
  <div class="bg-black h-[6vh]"></div>
  <div class="h-[6vh] fixed backdrop-blur-sm bg-black bg-opacity-50 flex-row flex top-0 w-full justify-between z-50">
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

      <div v-if="this.$store.state.user" class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/my-account"> My Account</router-link>
      </div>
      <div v-else class="mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/auth/login">Log In</router-link>
      </div>

      <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)" class=" mx-6 self-center text-gray-300 hover:text-white transition">
        <router-link to="/admin/home">Admin Dashboard</router-link>
      </div>

    </div>
    <div class="flex">
      <div class="self-center text-gray-300 hover:text-white transition">
        <a href="https://discord.gg/Jq7FwX6hqW" target="_blank">
          <font-awesome-icon class="text-white" icon="fa-brands fa-discord" size="xl"/>
        </a>
      </div>
      <div class="mx-7 self-center text-gray-300 hover:text-white transition">
        <a href="https://github.com/cytonicmc" target="_blank">
          <font-awesome-icon class="text-white" icon="fa-brands fa-github" size="xl"/>
        </a>
      </div>
    </div>
  </div>
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
    }
  },
  data() {
    return {
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
    if(getCookie('authToken') !== '') {
      if(this.$store.state.user) {
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
              this.user =  response.data.data.user;
            })
            .catch((error) => {
              console.log(error)
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
      if(value.data.message === 'No active banner') {
        return;
      }
      this.banner = value.data.data.banner;
      this.banner.show = true;
    }).catch(() => {});
  }
}
</script>