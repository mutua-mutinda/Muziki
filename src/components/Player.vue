<template>
   <div class=" fixed bottom-0 left-0 bg-sky-50 dark:bg-slate-800 p-5 pb-4  text-left align-top w-full h-20 " >
    <div class="relative max-w-xl mx-auto mt-3 ">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button" @click.prevent="toggleAudio">
          <i :class="{'fa-play': !playing, 'fa-pause': playing}" class="fa text-gray-700 text-lg dark:text-gray-300"></i>
        </button>
      </div>
      <!-- Current Position -->
      <div class=" float-left w-7 h-7 leading-3 text-gray-600 dark:text-gray-300 mt-0 text-lg w-14 ml-5 " >
        <span class="player-currenttime">00:00</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7  player-scrub">
        <div class=" absolute left-0 right-0 text-base text-gray-700 dark:text-gray-300 text-center mx-auto player-song-info " >
          <span class="song-title ">Song Title</span> by
          <span class="song-artist ">Artist</span>
        </div>
        <!-- Scrub Container  -->
        <span class=" block w-full h-2 rounded m-1 mt-2 bg-gray-300 relative cursor-pointer " >
          <!-- Player Ball -->
          <span class="absolute top-neg-8 text-gray-800 text-lg dark:text-gray-400" style="left: 50%" >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span class=" block h-2 rounded bg-gradient-to-r from-emerald-600 to-emerald-500 " style="width: 50%" ></span>
        </span>
      </div>
      <!-- Duration -->
      <div class=" float-left w-7 h-7 leading-3 text-gray-700 mt-0 text-lg w-14 ml-8 " >
        <span class="player-duration dark:text-gray-300">03:06</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex"
export default {
name: 'Player',

computed: {
    ...mapGetters(['playing'])
},

methods:{
    ...mapActions(['toggleAudio'])
    
}

}
</script>
