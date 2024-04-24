<template>
  <button @click="handleButton" class="bg-pink-500"> Click me to change a role</button>
  <button @click="fetchUsers" class="bg-blue-400"> Click me to fetch users</button>

</template>

<script>
import axios from "@/api.js";

export default {
  name: "EditUserRoles",
  methods: {
    handleButton() {
      axios.patch('/admin/roles',
          {
            target: {
              id: 4,
              target_role: 'God.',
            },
          })
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
    fetchUsers() {
      axios.get('/admin/users')
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
    },
  },
}
</script>
