<template>
  <div class="text-white p-6 shadow-md bg-gray-800 lg:max-w-[60vw] mx-auto">
    <div v-if="loading" class="flex justify-center items-center py-6">
      <svg
          class="animate-spin h-8 w-8 text-white"
          fill="none"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
      >
        <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
        />
        <path
            class="opacity-75"
            d="M4.93 4.93a10 10 0 0114.14 0l-1.42 1.42a8 8 0 00-11.3 0l-1.42-1.42z"
            fill="currentColor"
        />
      </svg>
    </div>
    <div v-else class="">
      <div id="modals">
        <!--   Delete comment modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.deleteComment"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.deleteComment = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Are you sure?</h1>
              <p> Deleting this comment will remove it from this thread.</p>
              <p class="text-gray-400 italic text-xs">Deleted comments are still visible to CytonicMC
                administrators.</p>
              <div class="flex justify-between items-center px-4 py-2">
                <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                        @click="modals.deleteComment = false">Cancel
                </button>
                <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                        @click="deleteComment(targeted_comment)">Delete
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   Admin delete comment modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.adminDeleteComment"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.deleteComment = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Are you sure?</h1>
              <p> You are using administrative privileges to delete this comment.</p>
              <div class="flex justify-between items-center px-4 py-2">
                <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                        @click="modals.adminDeleteComment = false">Cancel
                </button>
                <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                        @click="deleteComment(targeted_comment)">Delete
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   Delete thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.deleteThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.deleteThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Are you sure?</h1>
              <p> Deleting this thread will remove it from the forums!</p>
              <p class="text-gray-400 italic text-xs">Deleted threads are still visible to CytonicMC administrators.</p>
              <div class="flex justify-between items-center px-4 py-2">
                <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                        @click="modals.thread.deleteThread = false">Cancel
                </button>
                <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                        @click="deleteThread(targeted_comment)">Delete
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   Admin delete thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.adminDeleteThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.adminDeleteThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Are you sure?</h1>
              <p> You are using administrative privileges to delete this thread.</p>
              <div class="flex justify-between items-center px-4 py-2">
                <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                        @click="modals.thread.adminDeleteThread = false">Cancel
                </button>
                <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                        @click="deleteThread">Delete
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   report thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.reportThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.reportThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Report a thread</h1>
              <div v-if="reporting.reason === ''" class="flex justify-center items-center flex-col">
                <p>Why are you reporting this thread?</p>
                <form @submit.prevent>
                  <div class="relative inline-block text-left">
                    <select v-model="reporting.reason"
                            class="block appearance-none w-full bg-gray-800 border border-gray-700 text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-900">
                      <option disabled value="">Select a reason</option>
                      <option value="spam">Spam</option>
                      <option value="hate_speech">Hate speech</option>
                      <option value="harassment">Harassment</option>
                      <option value="inappropriate_content">Inappropriate content</option>
                      <option value="illegal_activities">Promoting or engaging in illegal activity</option>
                      <option value="personal_info">Sensitive personal information</option>
                      <option value="malware">Hacks, cheats, phishing or malicious links</option>
                      <option value="too_young">The poster, {{ thread.attributes.user.name }}, is under the age
                        of 13
                      </option>
                      <option value="other">Other</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                      <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M10 19l-7-7h14l-7 7zm0-19L3 7h14l-7-7z" fill-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
              <div v-if="reporting.reason !== ''">
              <span class="m-.5 flex flex-row italic" @click="reporting.reason = ''">
                <img alt="<-" src="@/assets/back.svg">
                Go Back
              </span>
                <h1 class="font-title text-lg">You are reporting {{ thread.attributes.user.name }}</h1>
                <p class="m-1 bg-slate-600 p-2 rounded-2xl">Reason: {{ translatedReason }}</p>
                <p class="text-gray-400 italic text-xs">By clicking 'confirm report' you confirm that this report is
                  truthful and made in good faith. Abuse of the system may result in the termination of your
                  account.</p>
                <div class="flex justify-between items-center px-4 py-2">
                  <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                          @click="modals.thread.reportThread = false">Cancel
                  </button>
                  <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                          @click="reportThread()">Confirm
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!--   report comment modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.reportComment"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-4 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.reportComment = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl">Report a comment</h1>
              <div v-if="reporting.reason === ''" class="flex justify-center items-center flex-col">
                <p>Why are you reporting this comment?</p>
                <form @submit.prevent>
                  <div class="relative inline-block text-left">
                    <select v-model="reporting.reason"
                            class="block appearance-none w-full bg-gray-800 border border-gray-700 text-gray-300 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-900">
                      <option disabled value="">Select a reason</option>
                      <option value="spam">Spam</option>
                      <option value="hate_speech">Hate speech</option>
                      <option value="harassment">Harassment</option>
                      <option value="inappropriate_content">Inappropriate content</option>
                      <option value="illegal_activities">Promoting or engaging in illegal activity</option>
                      <option value="personal_info">Sensitive personal information</option>
                      <option value="malware">Hacks, cheats, phishing or malicious links</option>
                      <option value="too_young">The poster, {{ targeted_comment.attributes.user.data.attributes.name }}, is under the
                        age
                        of 13
                      </option>
                      <option value="other">Other</option>
                    </select>
                    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-300">
                      <svg class="fill-current h-4 w-4" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clip-rule="evenodd" d="M10 19l-7-7h14l-7 7zm0-19L3 7h14l-7-7z" fill-rule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
              <div v-if="reporting.reason !== ''">
              <span class="m-.5 flex flex-row italic" @click="reporting.reason = ''">
                <img alt="<-" src="@/assets/back.svg">
                Go Back
              </span>
                <h1 class="font-title text-lg">You are reporting {{ targeted_comment.attributes.user.name }}</h1>
                <p class="m-1 bg-slate-600 p-2 rounded-2xl">Reason: {{ translatedReason }}</p>
                <p class="text-gray-400 italic text-xs">By clicking 'confirm report' you confirm that this report is
                  truthful and made in good faith. Abuse of the system may result in the termination of your
                  account.</p>
                <div class="flex justify-between items-center px-4 py-2">
                  <button class="px-4 p-2 bg-blue-500 rounded-full font-bold font-protest"
                          @click="modals.reportComment = false">Cancel
                  </button>
                  <button class="px-4 p-2 bg-red-500 rounded-full font-bold font-protest"
                          @click="reportComment(targeted_comment)">Confirm
                    Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!--   Edit comment modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.editComment"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-6 max-md:max-w-[75vw] max-w-[60vw] w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.editComment = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl mb-4 text-white">Edit Comment</h1>
              <textarea v-model="modals.editText" class="w-full p-2 bg-gray-700 rounded-lg text-white" rows="10"/>
              <p class="text-xs italic text-gray-400 mt-1">This editor supports markdown!</p>

              <div class="flex justify-end mt-4">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                        @click="editComment(targeted_comment); modals.editText = ''; modals.editComment = false">Save
                </button>
                <button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                        @click="modals.editComment = false">Cancel
                </button>
              </div>
              <p class="text-sm italic text-gray-400 mt-4">Comment history is stored.</p>
            </div>
          </div>
        </transition>

        <!--   Edit Thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.editThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-6 max-md:max-w-[75vw] max-w-[60vw] w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.editThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl mb-4 text-white">Edit Thread</h1>
              <textarea v-model="modals.thread.threadText" class="w-full p-2 bg-gray-700 rounded-lg text-white"
                        rows="20"/>
              <p class="text-xs italic text-gray-400">This editor supports markdown!</p>
              <div class="flex justify-end mt-4">
                <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                        @click="editThread(); modals.thread.threadText = ''; modals.thread.editThread = false">Save
                </button>
                <button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                        @click="modals.thread.editThread = false">Cancel
                </button>
              </div>
              <p class="text-xs italic text-gray-400 mt-4">Thread history is stored.</p>
            </div>
          </div>
        </transition>

        <!--   Lock Thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.lockThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.lockThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl mb-4 text-white">Are you sure?</h1>
              <div class="flex justify-end mt-4">
                <button class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                        @click="lockThread(); modals.thread.editThread = false">Lock it!
                </button>
                <button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                        @click="modals.thread.lockThread = false">Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!--   Unlock Thread modal   -->
        <transition name="modal" @enter="enter" @leave="leave" @before-enter="beforeEnter">
          <div v-if="modals.thread.unlockThread"
               class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
            <div class="bg-gray-800 rounded-lg p-6 max-w-md w-full relative">
              <!-- Close button -->
              <button class="top-0 absolute right-0 mt-4 mr-4 text-gray-400"
                      @click="modals.thread.unlockThread = false">
                <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M6 18L18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
                </svg>
              </button>
              <h1 class="font-title text-xl mb-4 text-white">Are you sure?</h1>
              <div class="flex justify-end mt-4">
                <button class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mr-2"
                        @click="unlockThread(); modals.thread.unlockThread = false">Unlock it!
                </button>
                <button class="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg"
                        @click="modals.thread.unlockThread = false">Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <div class="flex italic mb-1" @click="this.$router.push('/forums/topics/' + thread.attributes.topic)">
        <img alt="<- " src="@/assets/back.svg">
        <router-link :to="'/forums/topics/' + thread.attributes.topic">Back to {{ translatedTopic }}</router-link>
      </div>

      <!-- The post -->
      <div class="bg-gray-800 border-2 border-gray-600 mb-2">
        <section v-if="locked" class="bg-yellow-500">
          <p class="text-black text-lg font-title text-center p-2">This thread is locked.</p>
        </section>
        <section class="text-gray-400 text-sm flex justify-between px-4 py-2">
          <span> {{ formatDateTime(thread.attributes.created_at) }} </span>
          <span v-if="this.$store.state.user"
                class="flex flex-row justify-between border-gray-500 border m-1 px-2 rounded-full">
<!--              The user can edit their own threads-->
              <button v-if="thread.attributes.user.id === this.$store.state.user.id"
                      v-tooltip="'Edit this thread.'" class="mx-2" @click="showEditThreadModal(thread)">
                <font-awesome-icon icon="pencil"/>
              </button>
            <!--              Both the user AND admins can delete comments-->
              <button v-if="(thread.attributes.user.id === this.$store.state.user.id)"
                      v-tooltip="'Delete this thread.'" class="text-red-500 mx-2"
                      @click="modals.thread.deleteThread = true">
                <font-awesome-icon icon="trash"/>
              </button>
            <!-- Admin aboose -->
               <button
                   v-if="(adminAccess().includes(this.$store.state.user.role)) && !(this.$store.state.user && (thread.attributes.user.id === this.$store.state.user.id))"
                   v-tooltip="'Delete this thread with admin privileges.'"
                   class="text-red-500 mx-2"
                   @click="modals.thread.adminDeleteThread = true">
                <font-awesome-icon icon="trash"/>
              </button>
            <!-- Locking the thread -->
            <button
                v-if="(adminAccess().includes(this.$store.state.user.role) && !locked)"
                v-tooltip="'Lock this thread to prevent futher comments.'"
                class="text-orange-500 mx-2"
                @click="modals.thread.lockThread = true">
                <font-awesome-icon icon="lock"/>
              </button>

            <button
                v-if="(adminAccess().includes(this.$store.state.user.role) && locked)"
                v-tooltip="'Unlock this thread to allow comments.'"
                class="text-orange-500 mx-2"
                @click="modals.thread.unlockThread = true">
                <font-awesome-icon icon="lock-open"/>
              </button>
            <!--              Anyone accept the original poster can report comments-->
              <button v-tooltip="'Report this comment to the forums staff.'"
                      class="mx-2" @click="modals.thread.reportThread = true">
                <font-awesome-icon icon="flag"/>
              </button>
            </span>
          <router-link class="text-blue-500 hover:underline" to="/forums">
            Back to Forums
          </router-link>
        </section>
        <header class="flex justify-between items-center border-b border-gray-700 p-3">
          <h2 class="text-2xl font-bold">{{ thread.attributes.title }} <span v-if="thread.attributes.edited"
                                                                             class="italic text-xs">(edited)</span></h2>
        </header>

        <section class="p-2">
          <div v-html="this.md(sanitize(thread.attributes.body))"/>
        </section>

        <section class="bg-gray-700 px-4 py-2">
          <div class="flex items-center space-x-3">
            <div class="avatar-frame">
              <img
                  :src="avatar"
                  alt="User Avatar"
                  class="h-28 w-28 object-cover rounded-full"
              />
            </div>
            <span class="text-lg font-medium">
            {{ thread.attributes.user.name }}
            <span class="text-sm text-gray-400">
              {{ role }}
            </span>
          </span>
          </div>
        </section>
      </div>

      <!-- The comments-->
      <div class="bg-gray-800">
        <div v-for="comment in comments" :key="comment.id"
             :class="comment.attributes.deleted ? 'bg-red-950 bg-opacity-50' : 'bg-gray-700'"
             class="pl-4 flex border border-gray-500 mb-2">
          <div class="flex-none max-w-[140px]">
            <div class="flex flex-col space-x-3 p-2 pb-0 justify-center">
              <div class="relative m-3 ml-0">
                <img v-if="comment.attributes.user.data.attributes.avatar_url"
                     :src="comment.attributes.user.data.attributes.avatar_url" alt="User Avatar"
                     class="h-28 w-28 object-cover top-0 left-0"/>
                <img v-else alt="User Avatar" class="h-28 w-28 object-cover top-0 left-0" src="@/assets/favicon.svg"/>
                <div class="absolute inset-0 flex items-center justify-center aspect-square h-48 -left-10 -top-8">
                  <img :src="frame(comment.attributes.user.data.attributes)" alt="">
                </div>
              </div>
            </div>
            <span class="text-lg font-medium flex items-center flex-col pb-2">
                {{ comment.attributes.user.data.attributes.name }}
            </span>
            <span class="text-sm flex items-center flex-col text-gray-400">
              {{ formatDateTime(comment.attributes.created_at) }}
              <span v-if="comment.attributes.deleted" class="text-red-500 text-center text-xs">
<!--                This is probably cheating, and there should be a better way to do this. -->
                <!--                {{getUser(comment)}}-->
                <p>Deleted by: {{ comment.attributes.deleted_by_user }}</p>
                <p>Deleted: {{ formatDateTime(comment.attributes.deleted_at) }}</p>
              </span>
            </span>
            <span v-if="!comment.attributes.deleted"
                  class="flex flex-row justify-between border-gray-500 border m-1 px-2 rounded-full">
<!--              The user can edit their own comments-->
              <button v-if="showEditButton(comment)" v-tooltip="'Edit this comment.'" class=""
                      @click="showEditModal(comment)">
                <font-awesome-icon icon="pencil"/>
              </button>
              <!--              Both the user AND admins can delete comments-->
              <button v-if="showDeleteButton(comment)" v-tooltip="'Delete this comment.'"
                      class="text-red-500"
                      @click="modals.deleteComment = true; targeted_comment = comment">
                <font-awesome-icon icon="trash"/>
              </button>
              <!-- Admin aboose -->
               <button v-if="showAdminDeleteButton(comment) && !showDeleteButton(comment)"
                       v-tooltip="'Delete this comment with admin privileges.'"
                       class="text-red-500"
                       @click="modals.adminDeleteComment = true; targeted_comment = comment">
                <font-awesome-icon icon="trash"/>
              </button>
              <!--              Anyone accept the original poster can report comments-->
              <button v-if="showReportButton(comment)" v-tooltip="'Report this comment to the forums staff.'"
                      class=""
                      @click="modals.reportComment = true; targeted_comment = comment">
                <font-awesome-icon icon="flag"/>
              </button>
            </span>
          </div>
          <div :class="comment.attributes.deleted ? 'bg-red-950 bg-opacity-50' : 'bg-gray-800'"
               class="text-lg flex-1 ml-3 border-l border-gray-500">
            <span v-if="comment.attributes.edited"
                  class="text-sm italic text-gray-400 absolute mx-3">Edited - {{
                formatDateTime(comment.attributes.updated_at)
              }}</span>

            <p class="m-3">
              <span v-html="this.md(sanitize(comment.attributes.body))"/>
            </p>
          </div>
        </div>

      </div>

      <!-- The comment form -->
      <div v-if="locked" class="bg-gray-800 border-2 border-gray-600">
        <p class="text-center m-3">This thread has been locked, no further comments can be added.</p>
      </div>
      <div v-else-if="this.$store.state.user && this.$store.state.user.muted"
           class="bg-gray-800 border-2 border-gray-600">
        <p class="text-center m-3">You are currently muted, and cannot comment on threads. <span class="text-blue-500"><router-link
            to="/forums/topics/PUNISHMENT_APPEALS">Appeal Here</router-link></span></p>
      </div>
      <div v-else-if="this.$store.state.user" class="bg-gray-800 border-2 border-gray-600">
        <form @submit.prevent="addComment">
          <div class="p-4">
            <textarea
                v-model="body"
                class="w-full h-32 border-2 border-gray-600 p-2 bg-gray-800 text-gray-400 active:border-none"
                placeholder="Add a comment..."
            ></textarea>
          </div>
          <div class="p-4">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type="submit">
              Add Comment
            </button>
          </div>
        </form>
      </div>
      <div v-else class="bg-gray-800 border-2 border-gray-600">
        <p class="text-center m-3">You must be logged in to post a comment. <span class="text-blue-500"><router-link
            :to="'/auth/login?when_done=' + this.$route.fullPath">Log in</router-link></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/api.js";
import default_avatar from '@/assets/favicon.svg'

// border frames
import owner from '@/assets/borders/owner.svg'
import admin from '@/assets/borders/admin.svg'
import moderator from '@/assets/borders/moderator.svg'
import helper from '@/assets/borders/helper.svg'
import * as Utils from "@/Utils.js";
import {adminAccess} from "@/Utils.js";
import {useToast} from "vue-toastification";


export default {
  name: "ThreadComponent",
  components: {},
  data() {
    return {
      loading: true,
      thread_id: null,
      thread: {},
      locked: false,
      comments: [],
      targeted_comment: null,
      body: "",
      reporting: {
        reason: "",
        show_final_buttons: false,
      },
      modals: {
        thread: {
          editThread: false,
          deleteThread: false,
          adminDeleteThread: false,
          reportThread: false,
          threadText: '',
          lockThread: false,
          unlockThread: false,
        },
        deleteComment: false,
        adminDeleteComment: false,
        editComment: false,
        editText: '',
        reportComment: false,
      }
    };
  },
  computed: {
    Utils() {
      return Utils
    },
    avatar() {
      if (!this.thread.attributes.user.avatar_url) {
        return default_avatar
      }
      return this.thread.attributes.user.avatar_url
    },
    role() {
      return this.thread.attributes.user.role.charAt(0).toUpperCase() + this.thread.attributes.user.role.slice(1);
    },
    translatedReason() {
      switch (this.reporting.reason) {
        case 'spam':
          return 'This content is unsolicited, irrelevant, or inappropriate for the thread.';
        case 'hate_speech':
          return 'This content promotes hatred, discrimination, or violence against individuals or groups based on attributes such as race, ethnicity, religion, gender, or sexual orientation.';
        case 'harassment':
          return 'This content is intended to intimidate, bully, or torment an individual or group.';
        case 'inappropriate_content':
          return 'This content contains material that is not suitable for the platform, including graphic violence, nudity, or sexually explicit content.';
        case 'illegal_activities':
          return 'This content promotes or engages in illegal activities, such as drug trafficking, terrorism, or criminal behavior.';
        case 'personal_info':
          return 'This content contains sensitive personal information, such as addresses, phone numbers, or financial details.';
        case 'malware':
          return 'This content contains malicious links or software designed to harm or exploit users\' devices or personal information.';
        case 'too_young':
          return 'The poster, ' + this.targeted_comment.attributes.user.name + ', is under the age of 13, which violates platform policies.';
        default:
          return 'This content violates platform policies in a way not covered by other reporting options.';
      }
    },
    translatedTopic() {
      return this.thread.attributes.topic
          .toLowerCase() // Convert the string to lowercase
          .split('_') // Split the string by underscores
          .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
          .join(' '); // Join the words with spaces

    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.thread_id = this.$route.params.id;
    } else {
      this.$router.push("/forums/thread/notfound");
      return;
    }

    axios
        .get("/forums/threads/" + this.thread_id)
        .then((response) => {
          this.thread = response.data.data;
          this.locked = this.thread.attributes.locked;
          this.comments = response.data.included
          this.comments.sort((a, b) => new Date(a.attributes.created_at) - new Date(b.attributes.created_at));
          this.loading = false;
        })
        .catch(() => {
          this.$router.push("/forums/thread/notfound");
        });
  },
  methods: {
    sanitize(html) {
      return html.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")
          .replace(/<(?=[^a-zA-Z\/])/g, '&lt;');
    },
    adminAccess() {
      return adminAccess
    },
    addComment() {
      if(this.body === '') {
        useToast().error("You cannot submit an empty comment!", {timeout: 3000});
        return;
      }
      axios
          .post("/forums/comments/", {
            body: this.body,
            thread_id: this.thread_id,
          })
          .then((response) => {
            const temp = response.data.data;
            this.comments.push(temp);
            this.body = "";
          })
          .catch((error) => {
            useToast().error("An error occurred whilst creating the comment!", {timeout: 3000});
          });
    },
    frame(user) {
      switch (user.role) {
        case 'owner': {
          return owner;
        }
        case 'admin': {
          return admin;
        }
        case 'moderator': {
          return moderator;
        }
        case 'helper': {
          return helper;
        }
        default: {
          return null;
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
    deleteComment(comment) {
      axios.delete("/forums/comments/" + comment.id)
          .then(response => {
            useToast().success("Comment successfully deleted.")
            this.modals.deleteComment = false;
            this.modals.adminDeleteComment = false;
            comment.attributes.deleted = true;
          })
          .catch(error => {
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. :)")
          });
    },
    showEditModal(comment) {
      this.targeted_comment = comment;
      this.modals.editComment = true;
      this.modals.editText = this.targeted_comment.attributes.body;
    },
    editComment(comment) {
      const text = this.modals.editText
      axios.put("/forums/comments/" + comment.id, {body: this.modals.editText})
          .then(response => {
            useToast().success("Comment successfully edited.")
            comment.attributes.body = text;
          })
          .catch(error => {
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. :)")
          });
    },
    reportComment(comment) {
      axios.post("/reports/comment/", {id: comment.id, reason: this.reporting.reason})
          .then(() => {
            this.modals.reportComment = false;
            this.reporting.reason = ''
            useToast().success("Comment Successfully Reported!");
          })
          .catch(error => {
            console.log(error.message)
          });
    },
    showEditButton(comment) {
      if (!this.$store.state.user) return false;
      return comment.attributes.user.data.attributes.id === this.$store.state.user.id;
    },
    showDeleteButton(comment) {
      if (!this.$store.state.user) return false;
      return comment.attributes.user.id === this.$store.state.user.id
    },
    showAdminDeleteButton(comment) {
      if (!this.$store.state.user) return false;
      return Utils.adminAccess.includes(this.$store.state.user.role);
    },
    showReportButton(comment) {
      if (!this.$store.state.user) return false;
      return comment.attributes.user.id !== this.$store.state.user.id;
    },

    // thread actions
    showEditThreadModal() {
      this.modals.thread.editThread = true;
      this.modals.thread.threadText = this.thread.attributes.body;
    },
    deleteThread() {
      axios.delete("forums/threads/" + this.thread_id)
          .then(value => {
            useToast().success("Thread successfully deleted.")
            this.$router.push("/forums");
          })
          .catch(reason => {
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. :)")
          })
    },
    editThread() {
      this.thread.attributes.body = this.modals.thread.threadText;
      axios.patch("forums/threads/" + this.thread_id, {body: this.modals.thread.threadText})
          .then(() => {
            useToast().success("Thread successfully edited.")
            this.modals.thread.editThread = false;
          })
          .catch((err) => {
            console.error(err);
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. >:)")
          })
    },
    reportThread() {
      axios.post("/reports/thread/", {id: this.thread_id, reason: this.reporting.reason})
          .then(() => {
            this.modals.thread.reportThread = false;
            this.reporting.reason = ''
            this.reporting.show_final_buttons = false;
            useToast().success("Thread Successfully Reported!");
          })
          .catch(error => {
            console.log(error.message)
            useToast().error("Thread report failed!");
          });
    },
    lockThread() {
      axios.post('/forums/lock/', {id: this.thread_id})
          .then(() => {
            useToast().success("Successfully locked the thread")
            this.locked = true;
            this.modals.thread.lockThread = false;
          })
          .catch(() => {
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. :)")
          })
    },
    unlockThread() {
      axios.delete('/forums/lock/' + this.thread_id)
          .then(() => {
            useToast().success("Successfully unlocked the thread")
            this.locked = false;
            this.modals.thread.unlockThread = false;
          })
          .catch(() => {
            useToast().error("An error occurred, please try again. If this issue persists, contact the Cytonic Admin team. :)")
          })
    },

    //transition stuff
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
    }
  }
};
</script>
