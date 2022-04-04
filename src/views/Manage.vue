<template>
  <main>
      <!-- Main Content -->
      <section class="container mx-auto mt-6">
        <div class="md:grid md:grid-cols-3 md:gap-4">
          <div class="col-span-1">
            <!-- using ref -->
            <!-- <app-upload ref="upload"></app-upload> -->
            <AppUpload :addSong="addSong" />      
          </div>
          <div class="col-span-2">
            <div class="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-400  dark:text-gray-300 relative flex flex-col">
              <div class="px-6 pt-6 pb-5 font-bold rounded-full border-b border-gray-200 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300">
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

  </main>
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