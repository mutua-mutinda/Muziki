<template>

  <!-- Music Header -->
  <section class="w-full mb-8 py-14 text-center text-white dark:text-gray-300 relative">
    <div class="absolute inset-0 w-full h-full box-border bg-contain music-bg"
      style="background-image: url(/src/assets/img/song-header.png)">
    </div>
    <div class="container mx-auto flex items-center">
      <!-- Play/Pause Button -->
      <button @click.prevent="newSong(song)" type="button" class="z-50 h-16 w-16 text-3xl bg-white text-black rounded-full
        focus:outline-none">
        <i class="fas fa-play "></i>
      </button>
      <div class="z-50 text-left ml-8">
        <!-- Song Info -->
        <div class="text-md font-bold dark:text-gray-300">{{song.modified_name}}</div>
        <div class="text-sm dark:text-gray-300">{{song.genre}}</div>
      </div>
    </div>
  </section>

  <!-- Form -->
  <section class="container mx-auto mt-6">
    <div class="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-500 relative flex flex-col">
      <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-slate-500">
        <!-- Comment Count -->
        <span class="card-title text-sm text-gray-700 dark:text-gray-300">Comments({{song.comment_count}})</span>
        <i class="fa fa-comments float-right text-emerald-400 text-xl"></i>
      </div>
      <div class="p-6">
        <vee-form :validation-schema="schema" @submit="addComment" v-if="userLoggedIn">
          <vee-field as="textarea" name="comment"
            class="block w-full py-1.5 px-3 text-gray-700 dark:text-white text-sm border border-gray-300 dark:border-slate-500 transition
              duration-500 focus:outline-none focus:border-black rounded mb-4 dark:bg-slate-800"
            placeholder="Your comment here..."></vee-field>
            <ErrorMessage name="comment" class="text-red-500"/>
            <div class="inline-block">
                <button v-show="!comment_show_error" type="submit" class=" w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " 
                :class="[ comment_in_submission ? 'bg-gray-400 dark:bg-slate-800 hover:bg-slate-400' : '', ]" :disabled="comment_in_submission" >
                <svg v-if="comment_show_alert" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" ></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                </svg>
                {{ comment_show_alert ? "posting your comment..." : "Submit" }}
                </button>

                <div v-show="comment_show_error" class="mt-5 flex items-center justify-center p-4 rounded-lg bg-red-50 animate-pulse duration-200">
                    <p class="text-red-600 text-sm">Unexepted Error Occurred</p>
                </div>
            </div>
        </vee-form>
        <!-- Sort Comments -->
        <select v-model="sort"
          class="block mt-4 py-1.5  text-gray-700 dark:text-gray-300 dark:bg-slate-700 text-sm border border-gray-300 dark:border-slate-500  transition
          duration-500 focus:outline-none focus:border-black rounded">
          <option value="1">Latest</option>
          <option value="2">Oldest</option>
        </select>
      </div>
    </div>
  </section>
  <!-- Comments -->
  <ul class="container mx-auto rounded-lg rounded-t-none shadow-sm">
    <li  v-for="comment in sortedComments" :key="comment.docID" class="p-3 bg-gray-5 dark:bg-slate-700 border shadow-sm rounded-lg border-gray-100 dark:border-slate-500">
      <!-- Comment Author -->
      <div class="mb-2">
        <div class="font-bold text-sm text-gray-700 dark:text-gray-300">{{comment.name}}</div>
        <time class="text-xs text-gray-700 dark:text-gray-300">{{comment.datePosted}}</time>
      </div>

      <p class="text-gray-700 text-sm dark:text-gray-300"> {{comment.content}}</p>
    </li>
    
  </ul>
  
</template>

<script>
import { songsCollection, auth,commentsCollection } from "/src/includes/firebase"
import { mapState, mapActions } from "vuex";

export default {
    name: 'Song',

    data() {
        return {
            song: {},
            schema: {
                comment: 'required|min:3',
            },
            comment_in_submission: false,
            comment_show_alert: false,
            comment_show_error: false,
            comments:[],
            sort: '1',

        };
    },
    computed: {
      ...mapState(['userLoggedIn']),

      sortedComments() {
        //use slice to return a new array 
        return this.comments.slice().sort((a,b) => {
          if(this.sort === '1') {
            return new Date(b.datePosted) - new Date(a.datePosted); 
          }
            return new Date(a.datePosted) - new Date(b.datePosted); 

        })
      }
    },

    async created() {
        const docSnapshot = await songsCollection.doc(this.$route.params.id).get();
        
        if(!docSnapshot.exists) {
            this.$router.push({name: 'Home'});
            return;
        }

        const {sort} = this.$route.query;

        this.sort = sort === '1' || sort === '2' ? sort : '1';

        this.song = docSnapshot.data();
        this.getComments();
    },
    methods: {
      ...mapActions(['newSong']),

        async addComment(values, {resetForm}) {
            this.comment_in_submission = true;
            this.comment_show_alert = true;

            const comment = {
                content: values.comment,
                datePosted:  new Date().toString(),
                sid: this.$route.params.id,
                name: auth.currentUser.displayName,
                uid: auth.currentUser.uid,
            };

            await commentsCollection.add(comment);

            this.song.comment_count += 1;
            await songsCollection.doc(this.$route.params.id).update({
              comment_count: this.song.comment_count,
            })
 
            this.getComments();

            this.comment_in_submission = false;
            this.comment_show_alert = false;

            resetForm()


        },

        async getComments() {
          const snapshots = await commentsCollection.where('sid', '==', this.$route.params.id).get();

          this.comments = [];

          snapshots.forEach(doc => {
            this.comments.push({
              docID:doc.id,
              ...doc.data(), //returns object of properties -> hence ...
            })
          });
        },
    },
    watch: {
      sort(newVal) {
        if(newVal === this.$route.query.sort) {
          return
        }
        
        this.$router.push({query: {sort: newVal}})
      }
    }

}
</script>
