<template>
  <div class="min-h-[88vh] bg-gray-900 text-white p-6">

    <!--    // modal-->
    <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
        <div class="bg-gray-800 rounded-lg p-4 max-md:max-w-[75vw] max-w-[60vw] w-full relative">
          <h1 class="font-title text-xl">Create New Thread</h1>
          <div class="flex flex-col justify-center mt-2">
            <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                    @click="showModal = false">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
              </svg>
            </button>
            <form @submit.prevent="createThread">
              <div class="mb-4">
                <label class="block text-gray-300" for="title">Title:</label>
                <input id="title" v-model="thread.title"
                       class="bg-slate-700 border border-gray-700 rounded-lg w-full px-3 py-2" required type="text"/>
              </div>

              <div class="mb-4">
                <label class="block text-gray-300" for="body">Body:</label>
                <textarea id="body" v-model="thread.body"
                          class="bg-slate-700 border border-gray-700 rounded-lg w-full px-3 py-2 resize-y" required
                          @input="resizeTextarea" ref="dynamicTextarea"/>
              </div>

              <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition" type="submit">
                Create Thread
              </button>
            </form>
          </div>
        </div>
      </div>
    </transition>


    <div class="flex italic" @click="this.$router.push('/forums')">
      <img alt="<- " src="@/assets/back.svg">
      <router-link to="/forums">Back to Forums</router-link>
    </div>
    <div v-if="loading" class="flex justify-center m-8">
      <img alt="Loading..." src="@/assets/loading.svg">
    </div>
    <div v-else>
      <h1 class="font-title text-xl my-4">Threads in <span class="font-semibold">{{ topic_data.name }}</span>
        {{ topic_data.is_private ? '(Restricted Topic)' : '' }}</h1>
      <div class="flex justify-between items-center mb-4">
        <div class="flex space-x-4">
          <input
              v-model="filter"
              class="bg-gray-800 border border-gray-700 rounded px-3 py-2"
              placeholder="Filter threads"
              type="text"
          />

          <select
              v-model="sort"
              class="bg-gray-800 border border-gray-700 rounded px-3 py-2"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option disabled value="popular">Most Popular</option>
          </select>
        </div>

        <button class="text-white px-4 py-2 rounded"
                :class="canMakeThread ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700 cursor-not-allowed'"
                @click="canMakeThread ? showModal = true : useToast().error('You cannot make threads.')">
          New Thread
        </button>
      </div>

      <div v-if="(!topic_data.is_private || canAccess())">
        <div v-for="thread in filteredThreads" :key="thread.id" class="p-4 bg-gray-800 mb-4 rounded"
             @click="this.$router.push('/forums/threads/' + thread.id)">
          <h3 class="text-lg font-bold">{{ thread.attributes.title }}</h3>
          <p class="text-sm text-gray-400">{{ thread.attributes.user.name }} -
            {{ formatDateTime(thread.attributes.updated_at) }}</p>
          <p class="mt-2">{{ thread.content }}</p>
        </div>
        <div v-if="filteredThreads.length <= 0">
          <h1 class="font-title text-center text-2xl m-6">No Threads! Perhaps you should make one :)</h1>
        </div>
      </div>
      <div v-else-if="!this.$store.state.user">
        <h1 class="text-center m-4 text-lg p-4 bg-red-800 rounded-xl border-red-400 border">You must be logged in to
          view the threads under this topic.</h1>
      </div>
      <div v-else>
        <h1 class="text-center m-4 text-lg p-4 bg-red-800 rounded-xl border-red-400 border">You don't have permission to
          view this topic's threads. Sorry!</h1>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {adminAccess} from "@/Utils.js";
import {useToast} from "vue-toastification";

export default {
  data() {
    return {
      filter: '',
      sort: 'newest',
      threads: [],
      topic: '',
      showModal: false,
      thread: {
        title: '',
        body: '',
        category: '',
        topic: '',
      },
      topic_data: {
        id: '',
        name: '',
        is_private: true,
      },
      loading: true,
    };
  },
  computed: {
    filteredThreads() {
      let threads = this.threads;

      // Filter by text
      if (this.filter) {
        threads = threads.filter(thread =>
            thread.attributes.title.toLowerCase().includes(this.filter.toLowerCase())
        );
      }

      // Sort threads
      if (this.sort === 'newest') {
        threads.sort((a, b) => new Date(b.attributes.updated_at) - new Date(a.attributes.updated_at));
      } else if (this.sort === 'oldest') {
        threads.sort((a, b) => new Date(a.attributes.updated_at) - new Date(b.attributes.updated_at));
      }

      return threads;
    },
    canMakeThread() {
      if (!this.$store.state.user) {
        return false;
      }
      if (adminAccess.includes(this.$store.state.user.role)) {
        return true;
      }
      switch (this.topic) {
        case 'NEWS_AND_ANNOUCEMENTS': {
          return false
        }
        case 'DEVLOGS': {
          return false;
        }
        default: {
          return true;
        }
      }
    },
    category() {
      switch (this.topic) {
        case 'NEWS_AND_ANNOUCEMENTS': {
          return 'OFFICIAL_COMMUNICATIONS';
        }
        case 'DEVLOGS': {
          return 'OFFICIAL_COMMUNICATIONS';
        }
        case 'PUNISHMENT_APPEALS': {
          return 'STAFF_CONTACT';
        }
        case 'BUG_REPORTS': {
          return 'STAFF_CONTACT';
        }
        case 'GILDED_GORGE': {
          return 'GAMES';
        }
        default: {
          return 'NONE';
        }
      }
    },
  },
  methods: {
    resizeTextarea() {
      if (this.showModal) {
        const textarea = this.$refs.dynamicTextarea;
        textarea.style.height = 'auto'; // Reset height to calculate the new height
        const newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.4);
        textarea.style.height = `${newHeight}px`;
      }
    },
    useToast,
    createThread() {
      this.thread.topic = this.topic;
      this.thread.category = this.category;
      axios.post('forums/threads', this.thread).then(value => {
        useToast().success("Your thread has been created!")
        this.$router.push('/forums/threads/' + value.data.threadData.data.id)
      }).catch(reason => {
        useToast().error("Your thread could not be created!")
      })
    },
    canAccess() {
      if (this.topic_data.is_private) {
        if (this.$store.state.user) {
          return adminAccess.includes(this.$store.state.user.role)
        } else return false;
      } else return true;
    },
    formatDateTime(dateString) {
      const date = new Date(dateString);
      const today = new Date();

      const isSameDay =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();

      if (isSameDay) {
        // Return time in local format if same day
        return date.toLocaleTimeString();
      } else {
        // Return date in mm/dd/yy format
        return date.toLocaleDateString('en-US', {
          month: '2-digit',
          day: '2-digit',
          year: '2-digit',
        });
      }
    },

    // Modal translations
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(-50px)';
    },
    enter(el) {
      let opacity = 0;
      let top = -50;
      const opacityInterval = setInterval(() => {
        opacity += 0.025; // Adjust opacity increment for smoother fade-in
        el.style.opacity = opacity;
        if (opacity >= 1) {
          clearInterval(opacityInterval);
        }
      }, 1); // Adjust interval for smoother fade-in

      const flyInterval = setInterval(() => {
        top += 1; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top >= 0) {
          clearInterval(flyInterval);
          //done();
        }
      }, 1); // Adjust interval for smoother movement
    },
    leave(el, done) {
      let top = 0;
      const opacityInterval = setInterval(() => {
        el.style.opacity -= 0.025; // Adjust opacity decrement for smoother fade-out
        if (el.style.opacity <= 0) {
          clearInterval(opacityInterval);
        }
      }, 1); // Adjust interval for smoother fade-out

      const interval = setInterval(() => {
        top -= .1; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top <= -50) {
          clearInterval(interval);
          done();
        }
      }, 1); // Adjust interval for smoother movement
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.topic = this.$route.params.id
    } else {
      this.$router.push('/forums')
      return;
    }

    this.resizeTextarea();

    axios.get('/forums/topics/' + this.topic)
        .then(reponse => {
          this.topic_data = reponse.data;
          // if(reponse.data.is_private && this.$store.state.user) {

          // the topic is private and the user is logged. So try to fetch the user's threads.
          axios.get('/forums/threads/?topic=' + this.topic).then(value => {
            this.threads = value.data.data;
            this.loading = false;
          }).catch(value => {
            this.loading = false;
          })
          // } else {
          //   this.loading = false;
          // }
        })
        .catch(reason => {
        })

  }
};
</script>
