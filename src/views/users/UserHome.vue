<template>
  <div v-if="this.$store.state.user">
    <div v-if="deletionPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-gray-800 rounded-lg p-8 max-w-md text-white relative">
        <font-awesome-icon class="absolute top-2.5 right-3" icon="fa-solid fa-xmark" size="xl" @click="hidePopup"/>
        <h2 class="text-lg font-semibold mb-4">Delete Your Account</h2>
        <p class="mb-4">Deleting your account will instantly delete all of your data. You will not be able to log in.
          This action <span class="font-bold text-red-600"> cannot</span> be undone. If you accept these terms and wish
          to continue please type <span class="font-bold">DELETE</span>.</p>
        <form class="flex justify-center m-4">
          <input v-model="deletionConfirmation"
                 class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900"
                 type="text">
        </form>
        <div class="flex justify-center">
          <div v-if="deletionConfirmation === 'DELETE'">
            <button
                class="mx-2 px-4 py-2 btn-red text-white rounded hover:bg-transparent border border-[#e53e3e] transition"
                @click="deleteAccount">
              I Understand, Delete my account.
            </button>
          </div>
          <button v-else
                  class="mx-2 px-4 py-2 btn-blue text-white rounded hover:bg-transparent border border-[#3182ce] transition"
                  @click="hidePopup">
            Nevermind, Go Back!
          </button>
        </div>
      </div>
    </div>

    <div class="bg-black text-white min-h-screen flex justify-center items-center flex-wrap flex-row">
      <div class="max-w-2xl">
        <div class="grid grid-flow-row auto-cols-auto gap-4">
          <!-- Log Out Panel -->
          <div class="p-4 bg-gray-900 rounded-lg shadow-xl sm:min-w-[20vw] sm:max-w-[40vw] max-w-[80vw]">
            <h2 class="text-xl font-semibold mb-4">Log Out</h2>
            <p>Terminates your current session. You will have to log in again if you wish to continue accessing certain
              portions of the website.</p>
            <button class="btn btn-blue mt-2" @click="logout">Log Out</button>
          </div>

          <!-- Change Avatar Panel -->
          <div class="p-4 bg-gray-900 rounded-lg shadow-xl sm:min-w-[20vw] sm:max-w-[40vw] max-w-[80vw]">
            <h2 class="text-xl font-semibold mb-4">Change Avatar</h2>
            <form @submit.prevent="changeAvatar">
              <label class="block mb-2" for="avatar">Upload a New Avatar</label>
              <input id="avatar" accept="image/*"
                     class="block w-full mb-5 text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                     type="file" @change="setAvatar">

              <button v-if="avatar" class="btn btn-blue" :style="avatarBtn" >Change Avatar</button>
              <button v-else class="btn btn-grey">Upload an image!</button>

            </form>
          </div>
          <!-- Change Username Panel -->
          <div class="p-4 bg-gray-900 rounded-lg shadow-xl sm:min-w-[20vw] sm:max-w-[40vw] max-w-[80vw]">
            <h2 class="text-xl font-semibold mb-4">Change Username</h2>
            <form @submit.prevent="changeUsername">
              <label class="block mb-2">New Username</label>
              <input v-model="username"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 mb-2"
                     placeholder="New Username" type="text">
              <button class="btn btn-blue">Change Username</button>
            </form>
          </div>
          <!-- Change Password Panel -->
          <div class="p-4 bg-gray-900 rounded-lg shadow-xl sm:min-w-[20vw] sm:max-w-[40vw] max-w-[80vw]">
            <h2 class="text-xl font-semibold mb-4">Change Password</h2>
            <form @submit.prevent="changePassword">
              <label class="block mb-2">Current Password</label>
              <input v-model="currentPassword"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 mb-2"
                     placeholder="Current Password" type="password">
              <label class="block mb-2">New Password</label>
              <input v-model="newPassword"
                     class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 mb-2"
                     placeholder="New Password" type="password">
              <label class="block mb-2">Confirm New Password</label>
              <input v-model="confirmPassword" class="shadow
  appearance-none border rounded w-full py-2 px-3 text-gray-300 leading-tight focus:outline-none focus:shadow-outline bg-gray-900 mb-2"
                     placeholder="Confirm New Password" type="password">

              <button class="btn btn-blue">Change Password</button>
            </form>
          </div>
          <!-- Delete Account Panel -->
          <div class="p-4 bg-gray-900 rounded-lg shadow-xl sm:min-w-[20vw] sm:max-w-[40vw] max-w-[80vw]">
            <h2 class="text-xl font-semibold mb-4">Delete Account</h2>
            <p class="">Permanently deletes your account and any data associated with it.</p>
            <button class="btn btn-red mt-2" @click="openPopup">Delete My Account</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MustLogIn v-else/>
</template>

<script>
import axios from "@/api.js";
import {deleteCookie} from "@/Utils.js";
import {useToast} from "vue-toastification";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import MustLogIn from "@/components/MustLogIn.vue";
import * as Utils from "@/Utils.js";

export default {
  components: {
    FontAwesomeIcon,
    MustLogIn,
  },
  data() {
    return {
      deletionPopup: false,
      deletionConfirmation: '',
      avatar: '',
      username: '',
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  },
  methods: {
    setAvatar(event){
      this.avatar = event.target.files[0];
      console.log(this.avatar)
    },
    deleteAccount() {
      axios
          .delete("/signup").then((response) => {
        if (response.status === 200) { // successful account deletion
          deleteCookie("authToken");
          this.$store.commit('clear');
          this.$router.push('/goodbye');
        }
      })
          .catch(() => {
            useToast().error('An error occurred whilst deleting you account! Check the console for more details.', {
              position: 'top-right',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          })
    },
    hidePopup() {
      this.deletionPopup = false;
      this.deletionConfirmation = '';
    },
    openPopup() {
      this.deletionPopup = true;
    },
    changeAvatar() {
      const data = new FormData();
      console.log(this.avatar)
      data.append('user', this.$store.state.user)
      data.append('avatar', this.avatar);
      axios({
        method: 'put',
        url: "/users/avatars",
        data: data,
        headers: {"Content-Type": "multipart/form-data"},
      })
          .then(() => {
            useToast().success('Your avatar was successfully changed.', {
              position: 'top-right',
              timeout: 1000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              ccloseButton: 'button',
              icon: false,
              rtl: false,
            });
          })
          .catch(() => {
            useToast().error('An error occurred whilst changing your avatar! Check the console for more details.', {
              position: 'top-right',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          });

    },
    changeUsername() {
      axios.patch("/usernames/edit", {
        user: {
          username: this.username,
        }
      }).then((response) => {
        if (response.status === 200) {
          useToast().success('Your username was successfully changed.', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: false,
            rtl: false,
          });
        }
      })
          .catch(() => {
            useToast().error('An error occurred whilst changing your username! Check the console for more details.', {
              position: 'top-right',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          })
    },
    changePassword() {
      if(this.confirmPassword !== this.newPassword) {
        useToast().error('The new passwords must match!', {
          position: 'top-right',
          timeout: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: true,
          pauseOnHover: true,
          draggable: true,
          draggablePercent: 0.6,
          showCloseButtonOnHover: false,
          hideProgressBar: false,
          closeButton: 'button',
          icon: false,
          rtl: false,
        });
        return;
      }
      axios.patch("/signup", {
        user: {
          current_password: this.currentPassword,
          password: this.newPassword,
          password_confirmation: this.confirmPassword,
        }
      })
          .then((response) => {
        if (response.status === 200) { // successful password change (Log out afterward)
          deleteCookie("authToken");
          this.$store.commit('clear');
          this.$router.push('/auth/login');

          useToast().success('Your password was successfully changed! You have been logged out as a result.', {
            position: 'top-right',
            timeout: 2000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: false,
            closeButton: 'button',
            icon: false,
            rtl: false,
          });
        }
      })
          .catch((error) => {
            console.log(error.response.data)
            if(error.response.data.current_password) {
              if(error.response.data.current_password[0] === 'is invalid') {
                useToast().error('Your current password is invalid', {
                  position: 'top-right',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: false,
                  rtl: false,
                });
                return;
              }
            }
            if(error.response.data.password) {
              if(error.response.data.password[0] === 'is too short (minimum 6 characters)') {
                useToast().error('Your password must be at least 6 characters!', {
                  position: 'top-right',
                  timeout: 5000,
                  closeOnClick: true,
                  pauseOnFocusLoss: true,
                  pauseOnHover: true,
                  draggable: true,
                  draggablePercent: 0.6,
                  showCloseButtonOnHover: false,
                  hideProgressBar: false,
                  closeButton: 'button',
                  icon: false,
                  rtl: false,
                });
                return;
              }
            }

            useToast().error('An error occurred whilst changing your password! Check the console for more details.', {
              position: 'top-right',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          })
    },
    logout() {
      axios.delete("/logout").then((response) => {
        if (response.status === 200) { // successful logout
          Utils.logout(this.$store);
          this.$router.push('/');
        }
      })
          .catch((error) => {
            console.log(error);
            if(error.response.message === 'No Authenticaion Token Provided.') {
              Utils.logout(this.$store);
              this.$router.push('/');
              return;
            }
            useToast().error('An error occurred whilst logging you out! Check the console for more details.', {
              position: 'top-right',
              timeout: 5000,
              closeOnClick: true,
              pauseOnFocusLoss: true,
              pauseOnHover: true,
              draggable: true,
              draggablePercent: 0.6,
              showCloseButtonOnHover: false,
              hideProgressBar: false,
              closeButton: 'button',
              icon: false,
              rtl: false,
            });
          })
    },
  },
};
</script>

<style>
.btn {
  padding: 8px 12px;
  border-radius: 4px;
}

.btn-red {
  background-color: #e53e3e;
  cursor: pointer;
}

.btn-blue {
  background-color: #3182ce;
  cursor: pointer;
}

.btn-grey {
  background-color: #9ca3af;
  cursor: not-allowed;
}

</style>
