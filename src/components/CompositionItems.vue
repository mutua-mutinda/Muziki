<template>
    <div class="border border-gray-200 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300 p-3 mb-4 rounded-lg shadow-sm">
        <div v-show="!showForm">
            <h4 :title="song.modified_name" class="inline-block text-md font-medium text-gray-700 dark:text-gray-300 capitalize truncate overflow-visible max-w-lg">{{song.modified_name}}</h4>
            <button @click.prevent="deleteSong"  class="ml-1 py-1 px-2 text-sm rounded-full text-white bg-red-500 float-right">
                <i class="fa fa-times"></i>
            </button>
            <button @click.prevent="showForm = true" class="ml-1 py-1 px-2 text-sm rounded-full text-white bg-sky-400 float-right">
                <i class="fa fa-pencil-alt"></i>
            </button>
        </div>
        <div v-show="showForm">
            <vee-form :validation-schema="schema" :initial-values="song" @submit="edit">
                <div class="mb-3">
                <label class="inline-block mb-2 text-gray-700 dark:text-gray-300 text-sm">Song Title</label>
                <vee-field type="text" name="modified_name" @input="updateUnsavedFlag(true)"
                    class="block w-full py-1.5 px-3 text-gray-700 text-sm border border-gray-300 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Song Title" />
                    <ErrorMessage class="text-red-500" name="modified_name"/>
                </div>
                <div class="mb-3">
                <label class="inline-block mb-2 text-gray-700 dark:text-gray-300 text-sm">Genre</label>
                <vee-field type="text" name="genre" @input="updateUnsavedFlag(true)"
                    class="block w-full py-1.5 px-3 text-gray-700 text-sm border border-gray-300 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300
                    transition duration-500 focus:outline-none focus:border-black rounded"
                    placeholder="Enter Genre" />
                    <ErrorMessage class="text-red-500" name="genre"/>
                </div>
                <div class="flex items-center space-x-4">
                    <!-- submit -->
                    <div>
                        <button v-show="!show_error" type="submit" class="flex justify-center py-1 px-4 border border-transparent cursor-pointer rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 " 
                            :class="[in_submission ? 'bg-gray-400 hover:bg-slate-400 cursor-wait' : '', ]" :disabled="in_submission" >
                            <svg v-if="show_alert" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white cursor-wait" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" ></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                            </svg>
                            {{ show_alert ? "Updating song info..." : "Submit" }}
                        </button>

                        <div v-show="show_error" class="flex items-center justify-center p-2 rounded-lg bg-red-50 animate-pulse duration-200">
                            <p class="text-red-600 text-sm">Unexepted Error Occurred</p>
                        </div>
                    </div>

                    <button type="button" @click.prevent="showForm = false" :disabled="in_submission" class="py-1.5 px-4 rounded-lg text-white text-sm bg-gray-600 cursor-pointer">
                    Go Back
                    </button>
                </div>
            </vee-form>
        </div>
    </div>
</template>

<script>
import { songsCollection,storage } from "/src/includes/firebase"
export default {
    name:'compositionItem',

    props: {
        song: {
            type: Object,
            required: true
        },
        updateSong: {
            type: Function,
            required: true,
        },
        index: {
            type: Number,
            required:true
        },
        removeSong: { 
            type: Function,
            required:true
        },
        updateUnsavedFlag: {
            type: Function,
        }
    },

    data() {
        return {
            showForm: false,
            schema: {
                modified_name: 'required',
                genre: 'alpha_spaces',

            },
            in_submission: false,
            show_alert: false,
            show_error: false
        }
    },
    methods: {
        async edit(values) {
            this.in_submission = true;
            this.show_alert = true;

            try {
                await songsCollection.doc(this.song.docID).update(values);  
            }catch(error) {
                this.in_submission = false;
                this.show_alert = false;
                this.show_error = true;

                 setTimeout(() => {
                     this.show_error = false;
                }, 3000);

                return;
            };

            this.updateSong(this.index, values);

            this.updateUnsavedFlag(false);

             this.in_submission = false;
            this.show_alert = false;
            this.show_error = false;


           
        },
        async deleteSong() {
            const storageRef = storage.ref();
            const songRef = storageRef.child(`songs/${this.song.original_name}`)

            await songRef.delete()

            await songsCollection.doc(this.song.docID).delete();

            this.removeSong(this.index);
        }
    }

}
</script>
 