<template>
  <div class="text-white bg-black">
    <div id="banner" class="bg-banner w-screen h-1/2 bg-cover bg-center text-white">
      <div class="h-full w-full min-h-[45vh] self-center bg-black bg-opacity-20 flex flex-col items-center justify-center">
        <h1 class="lg:text-6xl text-4xl font-title">We are Cytonic</h1>
        <hr>
        <span class="text-lg font-title">Minecraft, reimagined.</span>
      </div>
    </div>
    <!--  Meet Us  -->
    <div class="bg-black text-white">
      <h1 class="lg:text-4xl text-2xl font-title p-4 m-4 text-center"> Meet the Team </h1>
      <div class="flex-wrap flex justify-center">
        <div v-for="item in staff" :key="item.id"
             class="border border-black hover:border-zinc-50 flex-row flex justify-center m-6 min-w-[300px] max-w-[200px] rounded p-3 overflow-ellipsis flex-grow transform transition duration-100">
          <div>
            <img :alt="item.name + '\'s avatar'" :src="item.avatar"
                 class="max-h-16 min-h-16 min-w-16 max-w-16 rounded-3xl">
          </div>
          <div class="flex flex-col justify-center items-center">
            <h1 class="px-2">{{ item.name }}</h1>
            <p class="px-2 font-protest text-gray-400">{{ item.position }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center my-5">
      <hr class="w-1/3 justify-center self-center text-center">
    </div>
    <!-- FAQ -->
    <div class="bg-black text-white">
      <h1 class="lg:text-4xl text-2xl font-title p-4 m-4 text-center"> Frequently Asked Questions </h1>

      <div class="flex flex-col justify-center items-center self-center w-full h-full">
        <div v-for="item in faq" :key="item.id" class="flex-col flex justify-center m-6 p-3 overflow-ellipsis transform transition duration-100 max-w-[75vw] center">
            <h1 class="px-2 text-center text-lg">{{ item.q }}</h1>
            <p class="px-2 text-gray-400 text-center">{{ item.a }}</p>
        </div>
      </div>

    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      staff: [
        {
          id: 1,
          name: "Webhead1104",
          position: "CEO",
          avatar: "https://cdn.discordapp.com/avatars/1109098229800382584/806114e2e8570b51c53c89a2c80d1b24?size=1024"
        },
        {
          id: 2,
          name: "Foxikle",
          position: "Network Developer",
          avatar: "https://cdn.discordapp.com/avatars/384445411307421717/4f0cdec7e450ce9515f6c803d77a1164?size=1024"
        },
        {
          id: 3,
          name: "PrinceLegacy",
          position: "Manager",
          avatar: "https://cdn.discordapp.com/avatars/1039887622216089682/0f3cc4378c11d877a43ffd9e3e1fde74?size=1024"
        },
        {
          id: 4,
          name: "MomadXD",
          position: "Junior Developer",
          avatar: "https://cdn.discordapp.com/avatars/352425244985917442/a688e4b2870f67bce810665006b96a4e.png?size=2048"
        },
        {
          id: 5,
          name: "Yello",
          position: "Mod",
          avatar: "https://cdn.discordapp.com/avatars/916642284810936380/8a0974eda5abd6a64fdb9fc8e360a6fc?size=1024"
        },
        {
          id: 6,
          name: "LZ",
          position: "Helper",
          avatar: "https://cdn.discordapp.com/avatars/828916510646468630/09b902b34376ee668442e1e7f15babe1?size=1024"
        },
      ],
      faq: [
        {
          id: 1,
          q: 'Why Cytonic?',
          a: 'Cytonic is a fresh take on Minecraft. With exceptional attention to detail and a fine eye for quality, we aim to provide the best possible player experience.'
        },
        {
          id: 2,
          q: 'When will it release?',
          a: 'Unfortunately, we do not have a release date.'
        },
        {
          id: 3,
          q: 'How can I get involved?',
          a: 'We are currently looking for people! For an exhaustive list of open positions, join our Discord Server!'
        }
      ]
    }
  }
}
</script>
