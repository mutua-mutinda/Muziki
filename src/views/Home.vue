<template>
  <div class="flex flex-col min-h-full">
        <!-- Introduction -->
      <section class="mb-8 py-20 text-white text-center relative">
        <div class="hidden dark:inline flex-grow absolute inset-0 w-full h-full box-border bg-contain introduction-bg"
          style="background-image: url(/src/assets/img/song-header.png)">
        </div>
        <div class="dark:hidden flex-grow absolute inset-0 w-full h-full bg-cover introduction-bg"
          style="background-image: url(/src/assets/img/header.png)">
          </div>
        <div class="container mx-auto">
          <div class="text-white main-header-content ">
            <h1 class="font-bold text-5xl mb-5 dark:text-gray-300">Listen to Great Music!</h1>
            <p class="w-full md:w-8/12 mx-auto dark:text-gray-300"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus et dolor mollis, congue augue non, venenatis elit. Nunc justo eros, suscipit ac aliquet imperdiet, venenatis et sapien. Duis sed magna pulvinar, fringilla lorem eget, ullamcorper urna. </p>
          </div>
        </div>

        <img class="relative block mx-auto mt-5 -mb-20 w-auto max-w-full" src="/src/assets/img/introduction-music.png" />
      </section>

      <!-- Main Content -->
      <section class="flex-grow container mx-auto">
        <div class="bg-gray-50 dark:bg-slate-800 rounded-lg shadow-sm relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold ">
            <span class="card-title text-md text-gray-700 dark:text-gray-300">Songs</span>
            <!-- Icon -->
            <i class="fa fa-headphones-alt float-right text-green-400 text-xl"></i>
          </div>
          <!-- Playlist -->
          <div id="playlist" class="mx-auto grid grid-cols-1 sm:grid sm:grid-cols-6 gap-4 px-4 py-2">
           <app-song-item v-for="song in songs" :key="song.docID" :song="song"/>
          </div>
          <!-- .. end Playlist -->
        </div>
      </section>
  </div>
</template>
<script>
import AppSongItem from '../components/SongItem.vue'
import { songsCollection } from "/src/includes/firebase"
export default {
  components: { AppSongItem },
  name: 'Home',

  data() {
    return {
      songs: [],
      maxPerPage:20,
      pendingRequest:false,
    }
  },

  async created() {
    this.getSongs();

    window.addEventListener('scroll', this.handleScroll)
    
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },

  methods: {
    handleScroll() {
      const {scrollTop, offsetHeight} = document.documentElement;
      const {innerHeight} = window;

      // returns bool
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if(bottomOfWindow) {
        this.getSongs();
        console.log('bottomOfWindow');
      }
      

    },
    async getSongs() {

      if(this.pendingRequest) return;

      this.pendingRequest = true;


      let snapshots;
      if(this.songs.length) {
         const lastDoc = await songsCollection.doc(this.songs[this.songs.length -1].docID).get();

         snapshots = await songsCollection.orderBy('modified_name').startAfter(lastDoc).limit(this.maxPerPage).get()
      }else {
         snapshots = await songsCollection.orderBy('modified_name').limit(this.maxPerPage).get()

      }

      snapshots.forEach(document => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
        
      });

      

      this.pendingRequest = false;

    }
  }
}
</script>