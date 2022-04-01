<template>
    <div class="bg-white dark:bg-slate-700 rounded-lg shadow-sm border border-gray-200 dark:border-slate-400 dark:text-gray-300 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200 dark:border-slate-400 dark:text-gray-300">
            <span class="card-title">Upload</span>
            <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Upload Dropbox -->
            <div class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed
                border-gray-400 dark:border-slate-400 text-gray-400 transition duration-500 hover:text-white
                hover:bg-emerald-400 hover:border-emerald-400 dark:hover:bg-emerald-800 hover:border-solid"

                :class="{'bg-green-400 border-solid border-green-400 text-white': is_dragover}"

                @drag.prevent.stop=""
                @dragstart.prevent.stop=""
                @dragend.prevent.stop="is_dragover = false"
                @dragover.prevent.stop="is_dragover = true"
                @dragenter.prevent.stop="is_dragover = true"
                @dragleave.prevent.stop="is_dragover = false"
                @drop.prevent.stop="upload($event)">
              <h5 class="text-gray-300 text-sm">Drop your files here</h5>
            </div>
            <input type="file" multiple @change="upload($event)">
            <hr class="my-6 dark:bg-slate-400" />
            <!-- Progess Bars -->
            <div class="mb-4" v-for="upload in uploads" :key="upload.name">
              <!-- File Name -->
              <div class="font-bold text-sm" :class="upload.text_class">
                <i :class="upload.icon">&nbsp;</i>
                {{upload.name}}
              </div>
              <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
                <!-- Inner Progress Bar -->
                <div class="transition-all progress-bar bg-blue-400" :class="upload.variant" :style="{width: upload.current_progress + '%'}"></div>
              </div>
            </div>
          </div>
        </div>
</template>

<script>
import {storage, auth, songsCollection} from '/src/includes/firebase.js'
export default {
    name: 'Upload',

    data() {
        return {
            is_dragover: false,
            uploads: []
        }
    },
    props: ['addSong'],
    methods:{
        upload($event) {
            this.is_dragover =  false

            const files  = $event.dataTransfer ? [...$event.dataTransfer.files] : [...$event.target.files]

            console.log(files);


            files.forEach((file) => {
                if(file.type !== 'audio/mpeg') {
                    return;
                } 
                

                const storageRef =  storage.ref();
                const songsRef = storageRef.child(`songs/${file.name}`);
                const task = songsRef.put( file.name, {
                  contentType: 'audio/mpeg'
                } );

                const uploadIdx = this.uploads.push({
                    task,
                    current_progress: 0,
                    name: file.name,
                    variant: 'bg-blue-500',
                    text_class: '',
                    icon: 'fas fa-spinner fa-spin'
                }) - 1; //to get the lastest index

                  
                task.on('state_changed', (snapshot) => {
                  let progress = ((snapshot.bytesTransferred) / (snapshot.totalBytes)) * 100;
                    this.uploads[uploadIdx].current_progress = progress;
                }, (error) => {
                  this.uploads[uploadIdx].variant = 'bg-red-500'
                  this.uploads[uploadIdx].icon = 'fas fa-times'
                  this.uploads[uploadIdx].text_class = 'text-red-500'
                  console.log(error);

                }, async () => {
                  const song = {
                    uid: auth.currentUser.uid,
                    display_name: auth.currentUser.displayName,
                    original_name: task.snapshot.ref.name,
                    modified_name: task.snapshot.ref.name,
                    genre: '',
                    comment_count:0,
                  }


                  song.url = await task.snapshot.ref.getDownloadURL()
                  const songRef = await songsCollection.add(song);

                  const songSnapshot = await songRef.get()

                  this.addSong(songSnapshot);

                  this.uploads[uploadIdx].variant = 'bg-emerald-500'
                  this.uploads[uploadIdx].icon = 'fas fa-check'
                  this.uploads[uploadIdx].text_class = 'text-emerald-500'

                });
                  

            })

        },
          // in case a user navigates away while uploading -> using refs and beforerouteleave
      //   cancelUploads() {
      //   this.uploads.forEach((upload) => {
      //   upload.task.cancel();
      //   console.log('ops cancelled');
      // })
      //   }
    },

    // in case a user navigates away while uploading
    beforeUnmount() {
      this.uploads.forEach((upload) => {
        upload.task.cancel();
        console.log('ops cancelled');
      })
    }

}
</script>
