<template>
  <div class="bg-black h-16"></div>
  <div class="h-16 fixed backdrop-blur-sm bg-black bg-opacity-50 flex-row flex top-0 w-full justify-between z-50">
    <div class="flex">
      <div class="m-1 mx-6">
        <img alt="Cytonic's Logo" class="h-14 mb-2" src="@/assets/icon.svg">
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
</template>
<script>
</script>