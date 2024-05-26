<template>
  <div class="bg-gray-900 min-h-[88vh] text-white p-6">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-bold mb-6">Cytonic Forums</h1>

      <div v-if="!loading" class="space-y-8">
        <!-- Iterate through the categories -->
        <div v-for="category in categories" :key="category.id" class="border border-gray-700 rounded-lg p-6">
          <h2 class="text-2xl font-semibold font-title">{{ category.attributes.name }}</h2>
          <p class="text-gray-400 text-sm mb-3">{{ category.attributes.description }}</p>

          <!-- List the topics in each category -->
          <ul class="space-y-2">
            <li v-for="topic in category.attributes.topics" :key="topic.id"
                class="bg-gray-800 p-4 rounded-md hover:bg-gray-700 transition" @click="this.$router.push('/forums/topics/' + topic.id)">
              <router-link class="text-lg font-medium" :to="'/forums/topics/' + topic.id">{{ topic.name}}</router-link>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="flex justify-center m-6">
        <img src="@/assets/loading.svg" alt="Loading...">
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api.js";

export default {
  name: 'ForumsLanding',
  data() {
    return {
      loading: true,
      categories: [],
      darkMode: false,
    };
  },
  mounted() {
    axios.get('/forums/categories')
        .then(value => {
          this.categories = value.data.data;
          this.loading = false;
        })
        .catch(reason => {})
  }
}
</script>

