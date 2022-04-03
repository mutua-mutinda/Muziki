<template>
     <section class="flex flex-col">

      <div class="h-24 w-56 sm:h-72 bg-white dark:bg-slate-700  shadow-lg rounded p-2">
        <div class="py-2 flex items-center justify-between">
            <div class="flex items-center">
                <p class="flex text-gray-400 text-sm justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </p>
                <p class="text-sm text-blue-600 px-2">324</p>
            
            </div>
              <div class="flex items-center">
                <router-link custom :to="{name: 'song', params: {id: song.docID}, hash: '#comments'}" v-slot="{navigate}">
                  <p @click="navigate" class="flex text-gray-400 text-sm justify-center cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </p>
                  <p class="text-sm text-blue-500  px-2">{{song.comment_count}}</p>
                
                </router-link> 
              </div>
            <div class="flex items-center">
                <p class="flex text-gray-400 text-sm justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </p>
                <p class="text-sm text-blue-600 px-2">295</p>
            
            </div>
        </div>
        <div class="group relative pb-1.5">
              <img class="hidden sm:block" src="src/assets/img/profile-pic.jpg" alt="">
          <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 duration-700 transition justify-evenly">
            
            <button class="hover:scale-110 text-white outline-none  opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
              </svg>
            </button>

            <button @click.prevent="newSong(song)"  class="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <i :class="{'fa-play': !playing, 'fa-pause': playing}" class="fa flex items-center justify-center text-md text-gray-800 rounded-full bg-white w-10 h-10"></i>
            </button>

            <button class="hover:scale-110 text-white outline-none opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div class="px-2 ">
            <router-link :to="{name: 'song', params: {id: song.docID}}" class="font-medium flex text-sm lowercase  text-zinc-600 dark:text-gray-300 group-hover:text-amber-600 ">{{song.modified_name}}</router-link>
    
        </div>
      </div>

    </section>


</template>

<script>
import { mapActions,mapGetters } from "vuex"
export default {
  name:'SongItem',

  props:['song'],

  computed: {
      ...mapGetters(['playing'])
  },

  methods:{
    ...mapActions(['newSong']),
      ...mapActions(['toggleAudio']),
      


      
  }

}
</script>
