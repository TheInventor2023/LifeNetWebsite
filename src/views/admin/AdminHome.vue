<template>
  <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)">
    <div v-if="user">
      <div class="flex h-[88vh]">
        <!-- Sidebar -->
        <div class="max-sm:hidden bg-gray-900 text-white w-64 flex-none">
          <div class="p-4">
            <h2 class="text-2xl font-semibold">Admin Dashboard</h2>
            <p class="text-gray-400 mt-2">Hey {{ user.name }}, {{ getRandomInspirationalMessage() }}</p>
          </div>
          <!-- Navigation Links -->
          <nav class="mt-6 justify-between flex-col flex">
            <div class="flex flex-col">
              <div v-for="(element, index) in nav" :key="element.id">
                <button
                    :id="element.name"
                    :class="{ 'bg-blue-500': activeButtonIndex === index }"
                    class="flex items-center px-4 py-2 text-md font-medium text-gray-300 hover:text-white rounded-3xl w-[90%] hover:bg-blue-500 ml-3 my-1 transition duration-200"
                    @click="changeContent(element.component, index)">
                  <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"
                          stroke-width="2"></path>
                  </svg>
                  {{ element.name }}
                </button>
              </div>
            </div>
          </nav>
          <!-- Personal Card -->
          <div class="flex m-2 fixed hover:bg-gray-800 rounded-2xl px-2 py-1 bottom-[7vh] min-w-60 max-w-60">
            <img v-if="this.$store.state.user.avatar_url !== null" :src="this.$store.state.user.avatar_url"
                 alt="Your avatar" class="max-h-12 min-h-12 min-w-12 max-w-12 mr-2 rounded-2xl">
            <img v-else alt="Default Avatar" class="max-h-12 min-h-12 min-w-12 max-w-12 mr-2" src="/favicon.svg">
            <span>
            <h1>{{ this.$store.state.user.name }}</h1>
            <p class="italic text-gray-400"> {{ this.$store.state.user.role }} </p>
          </span>
          </div>
        </div>

        <!-- Mobile Sidebar -->
        <div class="sm:hidden">
          <transition name="admin-nav" @enter="enter" @leave="leave" @before-enter="beforeEnter">
            <div v-if="mobile.show" class="z-40 bg-gray-900 text-white w-[66vw] h-[100vh] fixed">
              <button class="right-0 absolute m-2.5" @click="mobile.show = false">
                <img alt="Close" src="@/assets/close.svg">
              </button>
              <div class="p-4">
                <h2 class="text-2xl font-semibold">Admin Dashboard</h2>
                <p class="text-gray-400 mt-2">Hey {{ user.name }}, {{ getRandomInspirationalMessage() }}</p>
              </div>
              <!-- Navigation Links -->
              <nav class="mt-6 justify-between flex-col flex">
                <div class="flex flex-col">
                  <div v-for="(element, index) in nav" :key="element.id">
                    <button
                        :id="element.name"
                        :class="{ 'bg-blue-500': activeButtonIndex === index }"
                        class="flex items-center px-4 py-2 text-md font-medium text-gray-300 hover:text-white rounded-3xl w-[90%] hover:bg-blue-500 ml-3 my-1 transition duration-200"
                        @click="changeContent(element.component, index)">
                      <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 6h16M4 12h16M4 18h16" stroke-linecap="round" stroke-linejoin="round"
                              stroke-width="2"></path>
                      </svg>
                      {{ element.name }}
                    </button>
                  </div>
                </div>
              </nav>
              <!-- Personal Card -->
              <div class="flex m-2 fixed hover:bg-gray-800 rounded-2xl px-2 py-1 bottom-[7vh] min-w-60 max-w-60">
                <!--TODO: Add user avatars and put them here-->
                <img v-if="this.$store.state.user.avatar_url !== null" :src="this.$store.state.user.avatar_url"
                     alt="Your avatar" class="max-h-12 min-h-12 min-w-12 max-w-12 mr-2 rounded-2xl">
                <img v-else alt="Default Avatar" class="max-h-12 min-h-12 min-w-12 max-w-12 mr-2" src="/favicon.svg">
                <span>
            <h1>{{ this.$store.state.user.name }}</h1>
            <p class="italic text-gray-400"> {{ this.$store.state.user.role }} </p>
          </span>
              </div>
            </div>
          </transition>

          <button v-if="mobile.show_open" class="absolute p-3" @click="mobile.show = true">
            <svg width="24" height="24" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 20 L70 50 L30 80" stroke="white" stroke-width="10" fill="none"/>
            </svg>
          </button>
        </div>



        <!-- Main Content -->
        <div class="flex-1">
          <home v-if="currentPage === 'home'"/>
          <users v-if="currentPage === 'users'"/>
          <settings v-if="currentPage === 'settings'"/>
          <ComingSoon v-if="comingSoon.includes(currentPage)"/>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center m-16">
      <p class="absolute hidden"> {{ loadUser() }} </p>
      <svg height="100" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" fill="none" r="40" stroke="#000" stroke-width="4"/>
        <circle cx="50" cy="50" fill="none" r="40" stroke="#f5c842" stroke-dasharray="180,200" stroke-width="4">
          <animateTransform attributeName="transform" attributeType="XML" dur=".75s" from="0 50 50"
                            repeatCount="indefinite"
                            to="360 50 50" type="rotate"/>
        </circle>
      </svg>
    </div>
  </div>
  <LogIn v-else/>
</template>
<script>
import LogIn from "@/components/MustLogIn.vue";
import Home from "@/components/admin/Home.vue";
import Users from "@/components/admin/Users.vue";
import {adminAccess} from '@/Utils.js'
import ComingSoon from "@/components/admin/ComingSoon.vue";
import Settings from "@/components/admin/Settings.vue";

const comingSoon = ['player_reports', 'statistics', 'bug_reports', 'audit_log', 'appeals'];
const inspirationalMessages = [
  "Dream big.",
  "Stay positive.",
  "You are enough.",
  "Keep going.",
  "Believe in yourself.",
  "Embrace change.",
  "Never give up.",
  "Seize the day.",
  "Be fearless.",
  "Find joy.",
  "Stay hopeful.",
  "Live boldly.",
  "Chase your dreams.",
  "Focus on progress.",
  "Love yourself.",
  "Trust the journey.",
  "Make it happen.",
  "Rise above.",
  "You've got this.",
  "Stay resilient."
];

export default {
  name: "AdminHome",
  computed: {
    comingSoon() {
      return comingSoon
    }
  },
  components: {Settings, ComingSoon, Users, Home, LogIn},
  data() {
    return {
      mobile: {
        show: true,
        show_open: false,
      },
      user: this.$store.state.user,
      currentPage: "home",
      activeButtonIndex: 0,
      nav: [
        {
          id: 0,
          name: 'Home',
          component: 'home'
        },
        {
          id: 1,
          name: 'Users', // title is User Management
          component: 'users'
        },
        {
          id: 2,
          name: 'Settings',
          component: 'settings' // todo: Use cookies to store personal settings?
        },
        {
          id: 3,
          name: 'Player Reports',
          component: 'player_reports'
        },
        {
          id: 4,
          name: 'Statistics', //Todo: use highcharts for graphs
          component: 'statistics'
        },
        {
          id: 5,
          name: 'Bug Reports', //Todo: use highcharts for graphs
          component: 'bug_reports'
        },
        {
          id: 6,
          name: 'Appeals', //Todo: use highcharts for graphs
          component: 'appeals'
        },
        {
          id: 7,
          name: 'Audit Log', //Todo: use highcharts for graphs
          component: 'audit_log'
        },
      ],
    }
  },
  methods: {
    loadUser() {
      if (this.$store.state.user) {
        this.user = this.$store.state.user;
        return;
      } else setTimeout(function () {
        this.loadUser();
      }, 500);
    },
    adminAccess() {
      return adminAccess
    },
    changeContent(newpg, btnIndex) {
      this.mobile.show = false;
      this.activeButtonIndex = btnIndex;
      this.currentPage = newpg;
    },
    getRandomInspirationalMessage() {
      return inspirationalMessages[Math.floor(Math.random() * inspirationalMessages.length)];
    },

    // transitions
    beforeEnter(el) {
      el.style.transform = 'translateX(-200px)';
    },
    enter(el, done) {
      this.mobile.show_open = false;
      let top = -200;
      const flyInterval = setInterval(() => {
        top += 5;
        el.style.transform = `translateX(${top * 1.1}px)`;
        if (top >= 0) {
          clearInterval(flyInterval);
          done();
        }
      }, 5);
    },
    leave(el, done) {
      let top = 0;

      const interval = setInterval(() => {
        top -= 1; // Adjust increment for smoother movement
        el.style.transform = `translateX(${top * -top}px)`;
        if (top <= -20) {
          clearInterval(interval);
          done();
          this.mobile.show_open = true;
        }
      }, 20); // Adjust interval for smoother movement
    },

  },
  mounted() {
    if (this.$store.state.user) {
      if (!adminAccess.includes(this.$store.state.user.role)) {
        this.$router.push('/404');
        return;
      }
      this.user = this.$store.state.user;
    }


    if (this.$route.query.page) {
      this.currentPage = this.$route.query.page;
    }
  },
}
</script>
