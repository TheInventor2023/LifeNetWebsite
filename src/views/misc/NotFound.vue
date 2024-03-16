<template>
  <div class="flex flex-col">
    <h1 class="text-4xl text-white font-title self-center text-center m-8 p-8">
      Not Found :(
    </h1>
    <button @click="goHome" class="self-center justify-center center text-white border px-4 py-2 rounded-3xl drop-shadow-lg shadow-white shadow hover:scale-105 transition">
      Go Home
    </button>
  </div>
</template>
<script>
  export default {
    mounted() {
      if (this.$route.path !== '404') this.$router.push('/404');
    },
    methods: {
      goHome() {
        this.$router.push('/');
      }
    }
  }
</script>