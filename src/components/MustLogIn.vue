<template>
  <div>
    <h1 class="text-white text-center text-lg m-12">You must be logged in to view this page. <br>
      <router-link class="underline text-blue-500" to="/auth/login">Log In</router-link>
    </h1>
  </div>
</template>
<script>
export default {
  name: "LogIn"
}
</script>
