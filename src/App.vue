<template>
  <Header/>
  <router-view/>
  <Footer/>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"
</script>
<style>
body {
  background: black;
}

.router-link-active {
  text-decoration-color: white;
}
</style>