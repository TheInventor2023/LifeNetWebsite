<template>
  <Header/>
  <CookieAnnoyance/>
  <router-view/>
  <Footer/>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue"
import CookieAnnoyance from "@/components/CookieAnnoyance.vue";
</script>
<style>
body {
  background: black;
}

</style>