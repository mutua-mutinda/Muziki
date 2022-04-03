<template>
   <div class=" fixed bottom-0 left-0 bg-sky-50 dark:bg-slate-800 p-5 pb-4  text-left align-top w-full h-20 " >
    <div class="relative max-w-7xl sm:max-w-2xl mx-auto mt-3 flex items-center">
      <!-- Play/Pause Button -->
      <div class="w-7 leading-3">
        <button type="button" @click.prevent="toggleAudio">
          <i :class="{'fa-play': !playing, 'fa-pause': playing}" class="fa text-gray-700 text-lg dark:text-gray-300"></i>
        </button>
      </div>
      <!-- Current Position -->
      <div class=" w-7 leading-3 text-gray-600 dark:text-gray-300 mt-0 text-lg w-14 ml-2 " >
        <span class="player-currenttime">{{seek}}</span>
      </div>
      <!-- Scrub -->
      <div class="w-7 leading-3 ml-4  player-scrub">
        <div v-if="currentSong.modified_name" class=" absolute left-0 right-0 text-base text-gray-700 dark:text-gray-300 text-center mx-auto player-song-info " >
          <span class="song-title text-sm lowercase">{{currentSong.modified_name}}</span> 
          <!-- <span class="song-artist text-sm lowercase ">(uploaded by {{currentSong.display_name}})</span> -->
        </div>
        <!-- Scrub Container  -->
        <span @click.prevent="updateSeek" class=" block w-full h-2 rounded m-1 mt-2 bg-gray-300 relative cursor-pointer " >
          <!-- Player Ball -->
          <span class="absolute -ml-1 top-neg-8 text-gray-800 text-lg dark:text-gray-400" :style="{left: playerProgress}" >
            <i class="fas fa-circle"></i>
          </span>
          <!-- Player Progress Bar-->
          <span class=" block h-2 rounded bg-gradient-to-r from-emerald-600 to-emerald-500 " :style="{width: playerProgress}" ></span>
        </span>
      </div>
      <!-- Duration -->
      <div class=" w-7 leading-3 text-gray-700 mt-0 text-lg w-14 ml-8 " >
        <span class="player-duration dark:text-gray-300">{{duration}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions,mapGetters, mapState } from "vuex"
export default {
name: 'Player',

computed: {
    ...mapGetters(['playing']),
    ...mapState(['seek', 'duration', 'playerProgress', 'currentSong'])
},

methods:{
    ...mapActions(['toggleAudio', 'updateSeek'])
    
}

}
</script>
