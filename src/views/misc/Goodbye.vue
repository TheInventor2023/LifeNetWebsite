<template>
  <div class="flex items-center justify-center h-screen bg-black">
    <div class="text-center text-white">
      <h2 class="text-3xl font-semibold mb-4">Goodbye :(</h2>
      <p class="text-lg mb-4">Your account has been successfully deleted.</p>
      <router-link to="/" class="bg-blue-400 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300">Go Home</router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Goodbye"
}
</script>
