<template>
  <div class="flex justify-center items-center mt-[15vh] bg-black">
    <form class="bg-gray-900 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-md">
      <h1 class="text-center text-gray-300 font-title text-xl">Create An Account</h1>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900" id="email" type="email" placeholder="Email">
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="username">
          Username
        </label>
        <input v-model="username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900" id="username" type="text" placeholder="Username">
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="password">
          Password
        </label>
        <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900" id="password" type="password" placeholder="Password">
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2" for="confirmPassword">
          Confirm Password
        </label>
        <input v-model="confirmPassword" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900" id="confirmPassword" type="password" placeholder="Confirm Password">
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2">
          I am at least 13 years old
          <input v-model="over13" type="checkbox" class="form-checkbox h-4 w-4 text-blue-500 ml-2">
        </label>
      </div>
      <div class="mb-4">
        <label class="block text-gray-300 text-sm font-bold mb-2">
          I agree to the <router-link to="/legal/tos" class="underline text-blue-500">Terms of Service</router-link> and <router-link to="/legal/privacy-policy" class="underline text-blue-500">Privacy Policy</router-link>
          <input v-model="agreedToTerms" type="checkbox" class="form-checkbox h-4 w-4 text-blue-500 ml-2">
        </label>
      </div>
      <div class="flex items-center justify-between">
        <button @click.prevent="handleRegistration" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
          Register
        </button>
      </div>
      <div class="italic text-gray-500 mt-4">
        <p>Already have an account? <router-link to="/auth/login" class="underline text-blue-500">Log In</router-link></p>
      </div>
    </form>
  </div>
</template>

<script>
import {useToast} from "vue-toastification";
import axios from "@/api.js";

export default {
  data() {
    return {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      over13: false,
      agreedToTerms: false,
    };
  },
  methods: {
    handleRegistration() {
      const strRegex = /^[a-zA-Z0-9_]*$/;
      const stringy = typeof this.username === 'string' ? strRegex.test(this.username) : false;
      if (!this.over13) {
        useToast().error('Due to privacy laws, you must be at least thirteen years of age to create an account.', {
          position: 'top-right',
          timeout: 30000,
          closeOnClick: false,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: false,
          rtl: false,
        });
        return;
      }
      if (!stringy) {
        useToast().error('Your username must be alphanumeric! (Only Numbers, Letters, and underscores)', {
          position: 'top-right',
          timeout: 5000,
          closeOnClick: false,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: false,
          rtl: false,
        });
        return;
      }
      if(this.password !== this.confirmPassword) {
        useToast().error('The passwords must match!', {
          position: 'top-right',
          timeout: 5000,
          closeOnClick: false,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: false,
          rtl: false,
        });
        return;
      }

      if(!this.agreedToTerms) {
        useToast().error('You must agree to the Terms of Service and Privacy policy to create an account.', {
          position: 'top-right',
          timeout: 5000,
          closeOnClick: false,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: true,
          closeButton: 'button',
          icon: false,
          rtl: false,
        });
        return;
      }

      axios.post('signup', {
        user: {
          email: this.email,
          name: this.username,
          password: this.password,
          password_confirmation: this.confirmPassword,
        },
      })
          .then((response) => {
            this.$store.commit('set', response);
            useToast().success('Your registration was successful! Please check your email for further instructions.', {
              position: 'top-right',
              timeout: 20000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          })
          .catch((error) => {
            console.log(error);
            if (error) {
              if (error.code === 'ERR_NETWORK') {
                useToast().error('Connection refused. The server may be down or unreachable. Please try again later.', {
                  position: 'top-right',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: false,
                  rtl: false,
                });
              } else if (error.response.status === 500) {
                console.error('Internal Server Error!');
                useToast().error('Internal Server Error!', {
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
              } else {
                console.error('Registration failed');
                console.error(error.response)
                useToast().error('An account by this email or user name already exists!', {
                  position: 'top-right',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: false,
                  rtl: false,
                });
              }
            } else {
              useToast().error('An error occoured!', {
                position: 'top-right',
                timeout: 5000,
                closeOnClick: true,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: false,
                closeButton: 'button',
                icon: false,
                rtl: false,
              });
            }
          });
    }
  }
}
</script>
