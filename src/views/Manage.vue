<template>
  
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <div class="col-span-1">
        <!-- using ref -->
        <!-- <app-upload ref="upload"></app-upload> -->
        <AppUpload :addSong="addSong" />      
      </div>
      <div class="col-span-2">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <composition-items v-for="(song, i) in songs" 
            :key="song.docId" 
            :song="song" 
            :updateSong="updateSong" 
            :index="i" 
            :removeSong="removeSong"
            :updateUnsavedFlag="updateUnsavedFlag" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Player -->
  <div class="fixed bottom-0 left-0 bg-white p-5 pb-4 text-left align-top w-full h-16">
    <div class="relative">
      <!-- Play/Pause Button -->
      <div class="float-left w-7 h-7 leading-3">
        <button type="button">
          <i class="fa fa-play text-gray-500 text-xl"></i>
        </button>
      </div>
      <!-- Current Position -->
      <div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-5 mt-1">
        <span class="player-currenttime">00:00</span>
      </div>
      <!-- Scrub -->
      <div class="float-left w-7 h-7 leading-3 ml-7 mt-2 player-scrub">
        <div class="absolute left-0 right-0 text-lg text-center mx-auto player-song-info">
          <span class="song-title">Song Title</span> by
          <span class="song-artist">Artist</span>
        </div>
        <span class="block w-full h-2 rounded m-1 mt-2 bg-gray-200 relative cursor-pointer">
          <span class="absolute top-neg-8 text-gray-800	text-lg" style="left: 50%;">
            <i class="fas fa-circle"></i>
          </span>
          <span class="block h-2 rounded bg-gradient-to-r from-green-500 to-green-400"
            style="width: 50%;"></span>
        </span>
      </div>
      <!-- Duration -->
      <div class="float-left w-7 h-7 leading-3 text-gray-400 mt-0 text-lg w-14 ml-8 mt-1">
        <span class="player-duration">03:06</span>
      </div>
    </div>
  </div>
</template>
<script>
import CompositionItems from '../components/CompositionItems.vue'
import AppUpload from "/src/components/Upload.vue"
import {songsCollection, auth} from "/src/includes/firebase"
export default {
  name: 'manage',
  components: {AppUpload,CompositionItems},

  data() {
    return {
      songs: [],
      unsavedFlag:false
    }
  },

  async created() {
    const snapshot = await songsCollection.where('uid', '==', auth.currentUser.uid).get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(i, values) {
      this.songs[i].modified_name = values.modified_name;
      this.songs[i].genre = values.genre
    },
    removeSong(i) {
      this.songs.splice(i,1);
    },
    addSong(document) {
       const song = {
        ...document.data(),
        docID: document.id
      };

      this.songs.push(song);
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to,from,next) {
    if(!this.unsavedFlag) {
      next();
    }else {
      //eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?')
      next(leave);
    }
  }

// beforeRouteLeave(to, from, next) {
//   this.$refs.upload.cancelUploads();
//   next()
// }

}
</script>