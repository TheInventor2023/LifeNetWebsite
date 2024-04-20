<template>
<div v-if="!hideModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
<div class="bg-gray-800 rounded-lg p-8 max-w-md text-white">
  <h2 class="text-lg font-semibold mb-4">Cookie Policy</h2>
  <p class="mb-4">We use cookies to ensure you get the best experience on our website. We use cookies for session management and cookie acceptance. If you do not consent to cookies, you will not be able to log in.</p>
  <div class="flex justify-end">
    <button @click="acceptCookies" class=" mx-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Accept All</button>
    <button @click="hideModal = true" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Dismiss</button>
  </div>
</div>
</div>
</template>

<script>
import {getCookie} from "@/Utils.js";

export default {
  name: "CookieAnnoyance",
  data() {
    return {
      hideModal: false
    };
  },
  methods: {
    acceptCookies() {
      this.hideModal = true;
      this.setCookie();
    },
    setCookie() {
      // 10 years should be sufficient
      const expirationDate = new Date(Date.now() + (10 * 365 * 24 * 60 * 60));
      document.cookie = `cytonic_accepted_cookies=true; expires=${expirationDate.toUTCString()}; path=/; SameSite=Strict; Secure`;
    },
  },
  mounted() {
    this.hideModal = getCookie("cytonic_accepted_cookies") === "true";
  }
}
</script>
