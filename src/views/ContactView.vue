<template>
  <div class="text-white bg-black">
    <!--  Meet Us  -->
    <div class="bg-black text-white">
      <h1 class="lg:text-4xl text-4xl font-title p-4 m-4 text-center"> Contact Us </h1>
      <div class="flex-wrap flex justify-center">
        <div v-for="item in contacts" :key="item.id"
             class="border border-zinc-500 flex-row flex justify-center m-6 my-3 xl:min-w-[30vw] lg:min-w-[80vw] lg:max-w-[60vw] md:min-w-[60vw] min-w-[75vw] max-w-[75vw] rounded p-3 overflow-ellipsis flex-grow transform transition duration-100
              bg-zinc-800 lg:min-h-[15vh] min-h-[15vh] xl:min-h-[20vh]">
          <div class="bg-zinc-800 rounded-xl px-5 py-3 flex flex-col justify-center items-center">
            <h1 class="px-2 font-title text-xl">{{ item.name }}</h1>
            <p class="px-2 text-gray-300">{{ item.message }}</p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      contacts: [
        {
          id: 1,
          name: "Support",
          message: "support@cytonic.net",
        },
        {
          id: 2,
          name: "Billing",
          message: "billing@cytonic.net",
        },
        {
          id: 3,
          name: "Partners",
          message: "partners@cytonic.net",
        },
      ]
    }
  }
}
</script>