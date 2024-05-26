<template>
  <div v-if="this.$store.state.user && adminAccess().includes(this.$store.state.user.role)" class="text-white">
    <div class="bg-gray-800 p-2 rounded items-center h-[9vh]">
      <div class="flex">
        <h1 class="text-3xl font-title max-sm:ml-10">User-Generated Reports</h1>
        <button class="mx-4" @click="refreshData">
          <img alt="Refresh" src="@/assets/refresh.svg">
        </button>
      </div>
      <div class="flex-row flex">
        <div class="flex-row flex">
          <p class="mr-3">Filter: </p>
          <div class="relative">
            <select v-model="selected_filter"
                    class="block appearance-none w-full bg-gray-900 border border-gray-800 text-white px-4 pr-8 rounded-lg focus:outline-none focus:bg-gray-800"
                    @change="handleFilterChange">
              <option value="none">None</option>
            </select>
            <div class="absolute inset-y-0 top-[0.56vh] right-0 items-center pr-3 pointer-events-none text-white">
              <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12l-6-6h12z"/>
              </svg>
            </div>
          </div>
        </div>
        <div class="flex-row flex mx-3">
          <p class="mr-3">Sort: </p>
          <div class="relative">
            <select v-model="selected_sort"
                    class="block appearance-none w-full bg-gray-900 border border-gray-800 text-white px-4 pr-8 rounded-lg focus:outline-none focus:bg-gray-800"
                    @change="handleSortChange">
              <option value="none">None</option>
            </select>
            <div class="absolute inset-y-0 top-[0.56vh] right-0 items-center pr-3 pointer-events-none text-white">
              <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12l-6-6h12z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <!--    <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">-->
    <!--      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">-->
    <!--        <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full relative">-->
    <!--          &lt;!&ndash; Close button &ndash;&gt;-->
    <!--          <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"-->
    <!--                  @click="showModal = false; modal_button = null">-->
    <!--            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
    <!--              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>-->
    <!--            </svg>-->
    <!--          </button>-->

    <!--          <h1 class="font-title font-semibold text-xl">Comment report #{{ modalComment.id }}</h1>-->


    <!--          &lt;!&ndash;          Punish the sender of the comment &ndash;&gt;-->
    <!--          <div class="flex justify-center flex-col">-->
    <!--            <p class="text-center">Punish {{ findUser(modalComment.attributes.comment.user_id).attributes.name }}</p>-->
    <!--            <hr class="my-2 w-[75%] m-auto">-->
    <!--            <div class="flex justify-center">-->
    <!--              <button class="bg-green-500 p-2 mx-2 rounded-2xl font-semibold border shadow-md shadow-slate-950">Mute User</button>-->
    <!--              <button class="bg-red-500 p-2 mx-2 rounded-2xl font-semibold border shadow-md shadow-slate-950">Terminate Account</button>-->
    <!--            </div>-->

    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </transition>-->

    <!--    <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">-->
    <!--      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">-->
    <!--        <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full relative shadow-lg">-->
    <!--          &lt;!&ndash; Close button &ndash;&gt;-->
    <!--          <button class="absolute top-4 right-4 text-gray-400" @click="showModal = false">-->
    <!--            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">-->
    <!--              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>-->
    <!--            </svg>-->
    <!--          </button>-->

    <!--          <h1 class="font-title font-semibold text-2xl mb-4">Comment Report #{{ modalComment.id }}</h1>-->

    <!--          <div class="mb-4">-->
    <!--            <p><span class="font-semibold">Reported By:</span> {{ findUser(modalComment.relationships.user.data.id).attributes.name }}</p>-->
    <!--            <p><span class="font-semibold">Reported At:</span> {{ formatDateTime(modalComment.attributes.created_at) }}</p>-->
    <!--            <p><span class="font-semibold">Reason:</span> {{ modalComment.attributes.reason }}</p>-->
    <!--            <p><span class="font-semibold">Comment:</span> {{ modalComment.attributes.comment.body }}</p>-->
    <!--            <p><span class="font-semibold">Deleted:</span> {{ modalComment.attributes.comment.deleted ? 'Yes' : 'No' }}</p>-->
    <!--          </div>-->

    <!--          &lt;!&ndash; Punish the sender of the comment &ndash;&gt;-->
    <!--          <div class="flex flex-col items-center">-->
    <!--            <p class="text-center mb-2">Punish {{ findUser(modalComment.attributes.comment.user_id).attributes.name }}</p>-->
    <!--            <hr class="w-[75%] mb-4">-->
    <!--            <div class="flex space-x-4">-->
    <!--              <button class="bg-yellow-500 px-4 py-2 rounded-xl font-semibold shadow-slate-950 shadow-md">Mute User</button>-->
    <!--              <button class="bg-red-500 px-4 py-2 rounded-xl font-semibold shadow-slate-950 shadow-md">Terminate Account</button>-->
    <!--            </div>-->
    <!--            <button class="bg-green-500 px-2 py-1 rounded-xl font-semibold shadow-slate-950 shadow-md mt-3 italic">Resolve without action</button>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </transition>-->

    <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div class="bg-gray-800 rounded-lg p-8 max-w-md w-full relative shadow-lg">
          <!-- Close button -->
          <button class="absolute top-4 right-4 text-gray-400 hover:text-gray-300 focus:outline-none"
                  @click="showModal = false">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
          </button>
          <div v-if="modalreport.type === 'comment_report'">
            <h1 class="font-title font-semibold text-2xl mb-4">Comment Report #{{ modalreport.id }}</h1>
            <div class="mb-4">
              <p><span class="font-semibold">Reported By:</span>
                {{ findUser(modalreport.relationships.user.data.id).attributes.name }}</p>
              <p><span class="font-semibold">Reported At:</span> {{ formatDateTime(modalreport.attributes.created_at) }}
              </p>
              <p><span class="font-semibold">Reason:</span> {{ modalreport.attributes.reason }}</p>
              <p><span class="font-semibold">Comment:</span> {{ modalreport.attributes.comment.data.attributes.body }}</p>
              <p><span class="font-semibold">Deleted:</span> {{ modalreport.attributes.comment.deleted ? 'Yes' : 'No' }}
              </p>
            </div>

            <!-- Punish the sender of the comment -->
            <div class="flex flex-col items-center">
              <p class="text-center mb-2">Punish {{
                    modalreport.attributes.comment.data.attributes.user.data.attributes.name
                }}</p>
              <hr class="w-[75%] border-gray-600 mb-4">
              <div class="flex space-x-4">
                <button @click="muteUser(modalreport.attributes.comment.data.attributes.user.data.attributes.id); resolveCommentReport(modalreport)"
                        class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold shadow-md text-gray-900 focus:outline-none">
                  Mute User
                </button>
                <button @click="resolveCommentReport(modalreport); terminateUser(modalreport.attributes.comment.data.attributes.user.data.attributes.id)"
                        class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold shadow-md text-gray-900 focus:outline-none">
                  Terminate Account
                </button>
              </div>
              <button @click="resolveCommentReport(modalreport)"
                      class="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-xl font-semibold shadow-md text-gray-900 mt-3 italic focus:outline-none">
                Resolve without action
              </button>
            </div>
          </div>
          <div v-else-if="modalreport.type === 'thread_report'">
            <h1 class="font-title font-semibold text-2xl mb-4">Thread Report #{{ modalreport.id }}</h1>

            <div class="mb-4">
              <p><span class="font-semibold">Reported By:</span>
                {{ modalreport.attributes.user.name }}</p>
              <p><span class="font-semibold">Reported At:</span> {{ formatDateTime(modalreport.attributes.created_at) }}
              </p>
              <p><span class="font-semibold">Reason:</span> {{ modalreport.attributes.reason }}</p>
              <p><span class="font-semibold">Comment:</span> {{ modalreport.attributes.thread.data.attributes.body }}</p>
              <p><span class="font-semibold">Deleted:</span> {{ modalreport.attributes.thread.data.attributes.deleted ? 'Yes' : 'No' }}
              </p>
            </div>

            <!-- Punish the sender of the comment -->
            <div class="flex flex-col items-center">
              <p class="text-center mb-2">Punish {{findUser(modalreport.attributes.thread.data.attributes.user.id).attributes.name}}</p>
              <hr class="w-[75%] border-gray-600 mb-4">
              <div class="flex space-x-4">
                <button @click="muteUser(modalreport.attributes.thread.data.attributes.user.id); resolveThreadReport(modalreport)"
                        class="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl font-semibold shadow-md text-gray-900 focus:outline-none">
                  Mute User
                </button>
                <button @click="resolveThreadReport(modalreport); terminateUser(modalreport.attributes.thread.data.attributes.user.id)"
                        class="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl font-semibold shadow-md text-gray-900 focus:outline-none">
                  Terminate Account
                </button>
              </div>
              <button @click="resolveThreadReport(modalreport)"
                      class="bg-green-500 hover:bg-green-600 px-2 py-1 rounded-xl font-semibold shadow-md text-gray-900 mt-3 italic focus:outline-none">
                Resolve without action
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>


    <div v-if="reports != null && status === 'done'" class="overflow-y-auto max-h-[79vh] p-2">
      <div v-for="report in reports" :key="report.id" class="bg-gray-800 rounded-lg shadow-md p-4 m-4"
           @click="openModal(report)">
        <div v-if="report.type === 'comment_report'">
          <div>
            <h3 class="text-lg font-semibold text-gray-300 mb-2">Comment Report #{{ report.id }} -
              {{ report.attributes.reason }}</h3>
            <p class="text-xs text-gray-400 italic">{{ formatDateTime(report.attributes.created_at) }}</p>
          </div>
          <div class="mt-4">
            <h5 class="text-lg font-semibold mb-2">Comment:</h5>
            <div class="bg-slate-600 rounded-xl p-4 mb-4">
              <p class="text-sm text-gray-300">{{ report.attributes.comment.data.attributes.user.data.attributes.name }} -
                {{ formatDateTime(report.attributes.comment.data.attributes.created_at) }}</p>
              <p class="text-gray-200">{{ report.attributes.comment.data.attributes.body }}</p>
            </div>
            <div class="flex items-center justify-between">
              <h5 class="text-lg font-semibold">Reported by:
                {{ findUser(report.relationships.user.data.id).attributes.name }}</h5>
              <button class="text-xs text-gray-400 italic hover:text-gray-300">Click for more details</button>
            </div>
          </div>
        </div>
        <div v-else-if="report.type === 'thread_report'">
          <div>
            <h3 class="text-lg font-semibold text-gray-300 mb-2">Thread Report #{{ report.id }} -
              {{ report.attributes.reason }}</h3>
            <p class="text-xs text-gray-400 italic">{{ formatDateTime(report.attributes.created_at) }}</p>
          </div>
          <div class="mt-4">
            <h5 class="text-lg font-semibold mb-2">Thread:</h5>
            <div class="bg-slate-600 rounded-xl p-4 mb-4">
              <p class="text-sm text-gray-300">{{ report.attributes.thread.data.attributes.user.name }} -
                {{ formatDateTime(report.attributes.thread.data.attributes.created_at) }}</p>
              <p class="text-gray-200">{{ report.attributes.thread.data.attributes.body }}</p>
            </div>
            <div class="flex items-center justify-between">
              <h5 class="text-lg font-semibold">Reported by:
                {{ findUser(report.relationships.user.data.id).attributes.name }}</h5>
              <button class="text-xs text-gray-400 italic hover:text-gray-300">Click for more details</button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="reports.length <= 0" class="flex items-center justify-center">
        <h1 class="text-3xl font-title text-gray-300">
          None!
        </h1>
      </div>
    </div>
    <div v-else class="flex justify-center mt-10">
      <img alt="Loading ..." src="@/assets/loading.svg">
    </div>

  </div>
  <MustLogIn v-else/>
</template>

<script>
import MustLogIn from "@/components/MustLogIn.vue";
import axios from "@/api.js";
import {useToast} from "vue-toastification";
import * as Utils from "@/Utils.js";
import {adminAccess} from "@/Utils.js";

export default {
  name: "Users",
  components: {MustLogIn},
  data() {
    return {
      noMutUserData: null,
      status: 'loading',
      reports: null,
      included: null,
      modalreport: null,
      showModal: false,
      selected_filter: 'none',
      selected_sort: 'none',
    }
  },
  mounted() {
    // make the api request to fetch the users
    // they are, infact an admin. Don't bother wasting time if they are not
    if (this.$store.state.user) {
      if (adminAccess.includes(this.$store.state.user.role)) {
        if (this.noMutUserData == null) {
          this.refreshData();
        } else {
          console.log("Using cached data. Blah blah refresh")
        }
      } else {
        // boot them over to the 404 page if they are unauthorized
        this.$router.push('/404');
      }
    }
  },
  methods: {
    adminAccess() {
      return adminAccess
    },
    thingo(thing) {
      console.log(thing)
    },
    handleFilterChange() {
      this.reports = this.noMutUserData;
      switch (this.selected_filter) {
        case "none":
          break;
        case "owner": {
          this.reports = this.reports.filter(obj => obj.role === 'owner');
          break;
        }
        case "admin": {
          this.reports = this.reports.filter(obj => obj.role === 'admin');
          break;
        }
        case "moderator": {
          this.reports = this.reports.filter(obj => obj.role === 'moderator');
          break;
        }
        case "helper": {
          this.reports = this.reports.filter(obj => obj.role === 'helper');
          break;
        }
        case "user": {
          this.reports = this.reports.filter(obj => obj.role === 'user');
          break;
        }
        case "banned": {
          break;
        }
        case "terminated": {
          this.reports = this.reports.filter(obj => obj.terminated);
          break;
        }
        case "muted": {
          break;
        }
      }
    },
    handleSortChange() {
      this.reports = this.noMutUserData;
      this.handleFilterChange()

      switch (this.selected_sort) {
        case "none":
          break; // no sorting
        case "id": {
          this.reports.sort((a, b) => a.id - b.id);
          break;
        }
        case "username": {
          this.reports.sort((a, b) => a.name.localeCompare(b.name));
          break;
        }
        case "role": {
          this.reports.sort((a, b) => roleOrder[a.role] - roleOrder[b.role]);
          break;
        }
        case "creation": {
          this.reports.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
          break;
        }
        case "update": {
          this.reports.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
        }
      }
    },
    formatDateTime(data) {
      const date = new Date(data);
      const today = new Date();

      const isSameDay =
          date.getFullYear() === today.getFullYear() &&
          date.getMonth() === today.getMonth() &&
          date.getDate() === today.getDate();

      const isWithinWeek =
          date > new Date(today - 7 * 24 * 60 * 60 * 1000);

      const timeStr = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      });

      if (isSameDay) {
        return `Today at ${timeStr}`;
      } else if (isWithinWeek) {
        const weekdayStr = date.toLocaleDateString("en-US", {
          weekday: "long",
        });
        return `${weekdayStr} at ${timeStr}`;
      } else {
        const dateStr = date.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "2-digit",
        });
        return `${dateStr} at ${timeStr}`;
      }
    },
    formatDateFull(datestr) {
      return new Date(datestr).toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      });
    },
    refreshData() {
      this.noMutUserData = [];
      this.included = [];
      this.reports = [];
      this.status = 'loading';
      axios.get("/reports/comment")
          .then((response) => {
            useToast().success('Successfully fetched comment report data!', {
              timeout: 1000,
            });
            this.noMutUserData.push(...response.data.data);
            this.included.push(...response.data.included);
            this.reports.push(...response.data.data);
            this.status = 'done';
          })
          .catch((error) => {
            if (error.response.data.message === 'Not logged in') {
              Utils.logout(this.$store);
              useToast().error("Your session has expired. Please log in again.", {
                position: 'top-right',
                timeout: 1000,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: 'button',
                icon: false,
                rtl: false,
              });
              this.$router.push('/auth/login?when_done=/admin/home?page=player_reports');
              return;
            } else if (error.response.data.message === 'Access denied') {
              this.$router.push('/404')
              return;
            }
            useToast().error("An error occoured whilst fetching comment report data!", {
              timeout: 2000,
            });
          });

      axios.get("/reports/thread")
          .then((response) => {
            useToast().success('Successfully fetched thread report data!', {
              timeout: 1000,
            });
            this.noMutUserData.push(...response.data.data);
            this.included.push(...response.data.included);
            this.reports.push(...response.data.data);
            this.status = 'done';
          })
          .catch((error) => {
            if (error.response.data.message === 'Not logged in') {
              Utils.logout(this.$store);
              useToast().error("Your session has expired. Please log in again.", {
                position: 'top-right',
                timeout: 1000,
                closeOnClick: false,
                pauseOnFocusLoss: true,
                pauseOnHover: true,
                draggable: true,
                draggablePercent: 0.6,
                showCloseButtonOnHover: false,
                hideProgressBar: true,
                closeButton: 'button',
                icon: false,
                rtl: false,
              });
              this.$router.push('/auth/login?when_done=/admin/home?page=player_reports');
              return;
            } else if (error.response.data.message === 'Access denied') {
              this.$router.push('/404')
              return;
            }
            useToast().error("An error occoured whilst fetching report data!", {
              timeout: 2000,
            });
          });
    },
    findUser(id) {
      return this.included.find(item => item.type === 'safe_user' && item.id === String(id)) || {attributes: {name: 'ERROR'}};
    },
    openModal(report) {
      this.showModal = true;
      this.modalreport = report;
    },
    muteUser(id) {
      axios.put("admin/mute/" + id, )
          .then(() => {
            useToast().success("Success!")
            this.showModal = false;
          })
          .catch(() => {
            useToast().error("An error occurred whilst muting user!")
          });
    },
    terminateUser(id) {
      const data = {
        target: {
          id: id,
          reason: 'This user has been terminated for violating the Term of Service or User Conduct Agreement.',
        }
      }
      axios.post("/admin/users/terminate", data)
          .then((response) => {
            useToast().success(`Successfully terminated the user.`, {timeout: 2000});
            this.showModal = false;
          })
          .catch((error) => {
            if (error.response.data.message === 'You cannot terminate yourself!') {
              useToast().error(`You cannot terminate yourself.`, {timeout: 2500});
              return;
            }
            if (error.response.data.message === 'You cannot terminate an account with more seniority over you!') {
              useToast().error(`You cannot terminate an account with more seniority over you!`, {timeout: 2500});
              return;
            }
            useToast().error(`An error occoured whilst attempting to terminate The user.`, {timeout: 1000});
          })
    },
    resolveCommentReport(report) {
      axios.delete("reports/comment/" + report.id)
          .then(() => {
            useToast().success("Successfully resolved the report!")
            this.reports = this.reports.filter(item => item.id !== report.id || item.type !== report.type);
            this.showModal = false;
          })
          .catch(() => {
            useToast().error("An error occurred whilst resolving the report!")
          });
    },

    resolveThreadReport(report) {
      axios.delete("reports/thread/" + report.id)
          .then(() => {
            useToast().success("Successfully resolved the report!")
            this.reports = this.reports.filter(item => item.id !== report.id || item.type !== report.type);
            this.showModal = false;
          })
          .catch(() => {
            useToast().error("An error occurred whilst resolving the report!")
          });
    },



    // user modal
    beforeEnter(el) {
      el.style.opacity = 0;
      el.style.transform = 'translateY(-50px)';
    },
    enter(el) {
      let opacity = 0;
      let top = -50;
      const opacityInterval = setInterval(() => {
        opacity += 0.25; // Adjust opacity increment for smoother fade-in
        el.style.opacity = opacity;
        if (opacity >= 1) {
          clearInterval(opacityInterval);
        }
      }, 100); // Adjust interval for smoother fade-in

      const flyInterval = setInterval(() => {
        top += 26; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top >= 0) {
          clearInterval(flyInterval);
          //done();
        }
      }, 100); // Adjust interval for smoother movement
    },
    leave(el, done) {
      let top = 0;
      const opacityInterval = setInterval(() => {
        el.style.opacity -= 0.25; // Adjust opacity decrement for smoother fade-out
        if (el.style.opacity <= 0) {
          clearInterval(opacityInterval);
        }
      }, 100); // Adjust interval for smoother fade-out

      const interval = setInterval(() => {
        top -= 10; // Adjust increment for smoother movement
        el.style.transform = `translateY(${top}px)`;
        if (top <= -50) {
          clearInterval(interval);
          done();
        }
      }, 100); // Adjust interval for smoother movement
    }
  }
}
</script>
