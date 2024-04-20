<template>
  <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)" class="text-white m-3 overflow-y-auto max-h-[91vh]">
    <div class="bg-black min-h-[92vh]">
      <!-- Welcome Section -->
      <section class="py-12 text-center">
        <div class="m-6">
          <h1 class="font-title text-xl">Hi {{this.$store.state.user.name}},</h1>
          <p>Welcome back!</p>
        </div>
      </section>

      <!-- Snapshot Panels Section -->
      <section class="container mx-auto pb-12">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <!-- Panel 1: User Activity -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">User Activity</h2>
            <p class="text-gray-600">Real-time overview of user interactions.</p>
            <!-- Add Vue data for user activity here -->
          </div>

          <!-- Panel 2: Revenue Insights -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">Revenue Insights</h2>
            <p class="text-gray-600">Track revenue trends with graphical representations.</p>
            <!-- Add Vue data for revenue insights here -->
          </div>

          <!-- Panel 3: Flagged Content -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">Flagged Content</h2>
            <p class="text-gray-600">View content flagged as potentially in violation of the rules.</p>
            <!-- Add Vue data for content performance here -->
          </div>

          <!-- Panel 4: System Health -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">System Health</h2>
            <p class="text-gray-600">Keep an eye on the health of system infrastructure.</p>
            <!-- Add Vue data for system health here -->
          </div>

          <!-- Panel 5: Player Reports -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">Player Reports</h2>
            <p class="text-gray-600">View, manage, and respond to player generated reports.</p>
            <!-- Add Vue data for customer support here -->
          </div>

          <!-- Panel 6: Player Support -->
          <div class="bg-gray-950 p-6 rounded-lg shadow-md shadow-gray-900">
            <h2 class="text-xl font-semibold mb-2">Player Support</h2>
            <p class="text-gray-600">View, interact, and respond to player inquiries and support tickets.</p>
            <!-- Add Vue data for customer support here -->
          </div>
        </div>
      </section>
    </div>
  </div>
  <MustLogIn v-else/>
</template>
<script>
import MustLogIn from "@/components/MustLogIn.vue";
import {adminAccess} from "@/Utils.js";
export default {
  methods: {
    adminAccess() {
      return adminAccess
    }
  },
  components: {
    MustLogIn,
  },
  name: "Home"
}
</script>

