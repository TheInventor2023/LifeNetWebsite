<template>

  <div class="flex flex-col justify-center items-center h-[88vh] bg-gray-900 text-white">
    <h1 class="text-4xl font-bold mb-4">Welcome to CytonicMC!</h1>
    <p class="text-lg mb-8">
      Thank you for registering. Please verify your email to get started.
    </p>
    <div class="flex items-center space-x-4">
      <button
          :class="id ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-500 cursor-not-allowed'"
          class="px-4 py-2 rounded-lg transition-colors duration-200"
          @click="resendEmail"
      >
        Resend Verification Email
      </button>
      <router-link
          class="px-4 py-2 border border-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-200"
          to="/"
      >
        Return to Home
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "@/api.js";
import {useToast} from "vue-toastification";

export default {
  name: "RegistrationLanding",
  data() {
    return {
      id: null,
    }
  },
  methods: {
    resendEmail() {
      if (this.id !== null)
          // POST /resource/confirmation
        axios.post("confirmation", {id: this.id}).then(value => {
          if (value.data.message === 'Confirmation email has been resent.') {
          useToast().success('Successfully re-sent confirmation email!', {
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
        })
            .catch(error => {
              useToast().error('An error occoured whilst attempting to resend the email. Contact support if this issue persists.', {
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
            });
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
    }
    if (this.$route.query.email) {
      this.id = this.$route.query.email;
    }
  }
}
</script>

