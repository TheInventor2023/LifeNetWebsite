<template>
  <div class="flex flex-col items-center justify-center h-[88vh] bg-gray-800">
    <div class="text-6xl text-gray-200 font-bold">404</div>
    <div class="text-xl text-gray-300 mt-4">Thread Not Found</div>
    <div class="text-gray-300 mt-2 text-center">
      Oops! The thread you're looking for doesn't seem to exist.
    </div>
    <div class="mt-6 flex space-x-4">
      <router-link
          to="/"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Home
      </router-link>
      <router-link
          to="/forums"
          class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Forums
      </router-link>
    </div>
    <div class="text-gray-500 mt-4">
      Still need help? <a href="mailto:support@cytonic.net" class="text-blue-500 underline">Contact Support</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ThreadNotFound',
};
</script>
