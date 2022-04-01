<template>
  <!-- Auth Modal -->
  <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="{ hidden: !authModalShow }"  >
    <div class=" flex items-end justify-center min-h-screen pt-4 px-4 pb-24  text-center sm:block sm:p-0 " >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" >&#8203;</span >

      <div class=" inline-block align-bottom bg-white dark:bg-slate-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full " >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6 m-4 pb-1">
          <!-- Modal Close Button -->
          <div class="flex justify-end items-center">
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal" >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!--Title-->
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <p v-show="tab === 'login'" class=" mt-6 text-center text-3xl font-extrabold text-stone-500 dark:text-zinc-300 font-sans " > Welcome <span class="text-amber-600">Back</span> </p>
          </div>

           <div class="absolute left-0 right-0 bottom-16">

              <div v-show="tab === 'login'" class="flex-auto text-center">
                <a class=" block rounded py-3 px-4 transition ease-in-out delay-150 dark:text-sky-500 hover:text-sky-600 hover:underline hover:-translate-y-1 hover:scale-110 duration-300 " href="#"
                  @click="tab = 'register'" >Register</a >
              </div>

                <div v-show="tab === 'register'" class="flex-auto text-center relative">
                    <a class=" absolute right-0 left-0 bottom-0 top-3 block rounded px-4 transition ease-in-out delay-150 dark:text-sky-500 hover:text-sky-600 hover:underline hover:-translate-y-1 hover:scale-110 duration-300 "  
                    @click="tab = 'login'" >Login</a >
                </div>
            </div>
          <!-- login form -->
          <LoginForm v-show="tab === 'login'"/>

          <!-- Registration Form -->
          <RegisterForm v-show="tab === 'register'"/>

          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import RegisterForm from './RegisterForm.vue';
import LoginForm from './LoginForm.vue';
import { auth } from '/src/includes/firebase'

export default {
  components: { RegisterForm, LoginForm },
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:17|max_value:101",
        password: "required|min:8|max:32",
        confirmation: "required|confirmed:@password",
      },

      reg_in_submission: false,
      reg_show_alert: false,

      loginSchema: {
        email: "required|min:3|max:100|email",
        password: "required|min:8|max:32",
      },

      login_in_submission: false,
      login_show_alert: false,
    };
  },

  name: "AuthModal",

  computed: {
    ...mapState(["authModalShow"]),
    
   
  },

  methods: {
    ...mapMutations(["toggleAuthModal"]),

    // async fetchUser() {
    //         const guser =  await auth.get()
    //         console.log(guser);

           
    //     },
    

    // login(values) {
    //   this.login_in_submission = true;
    //   this.login_show_alert = true;
    //   console.log(values);
    // },

    // register(values) {
    //   this.reg_in_submission = true;
    //   this.reg_show_alert = true;
    // },
  },
};
</script>

<style>
</style>