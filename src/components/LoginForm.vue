<template>
    <div v-show="tab === 'login'">
            <div class=" min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 " >
              <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white dark:bg-slate-700 dark:border dark:border-slate-400 py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <vee-form name="name" class="space-y-6" action="#" method="POST" :validation-schema="loginSchema" @submit="login" >
                    <div>
                      <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300" > Email address </label>
                      <div class="mt-1">
                        <vee-field name="email" type="email" autocomplete="email"  class=" appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        <ErrorMessage class="text-red-500" name="email" />
                      </div>
                    </div>

                    <div>
                      <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300" > Password </label>
                      <div class="mt-1">
                        <vee-field name="password" type="password" autocomplete="password"  class=" appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-slate-400 dark:bg-slate-700 dark:text-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                        <ErrorMessage class="text-red-500" name="password" />
                      </div>
                      <!-- <div class="mt-1">
                        <input id="password" name="password" type="password" autocomplete="current-password" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                      </div> -->
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" class=" h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded " />
                        <label for="remember-me" class="ml-2 block text-sm text-gray-900 dark:text-gray-400" > Remember me </label>
                      </div>

                      <div class="text-sm">
                        <a href="#" class=" font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 " > Forgot your password? </a>
                      </div>
                    </div>

                    <div>
                      <button v-show="!login_show_error" type="submit" class=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:text-gray-300 bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 " 
                        :class="[ login_in_submission ? 'bg-gray-400 hover:bg-slate-400' : '', ]" :disabled="login_in_submission" >
                        <svg v-if="login_show_alert" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" ></circle>
                          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                        </svg>
                        {{ login_show_alert ? "Logging..." : "Sign In" }}
                      </button>

                      <div v-show="login_show_error" class="mt-5 flex items-center justify-center p-4 rounded-lg bg-red-50 animate-pulse duration-200">
                      <p class="text-red-600 text-sm">Unexepted Error Occurred</p>
                    </div>
                    </div>
                  </vee-form>

                  <div class="mt-6">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300 dark:border-slate-400" />
                      </div>
                      <div class="relative flex justify-center text-sm">
                        <span class="px-2 py-2 bg-white dark:bg-slate-700 text-gray-500 dark:text-gray-300">
                          New To Muziki?
                        </span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
</template>

<script>
export default {
    name: "LoginForm",

    data() {
    return {
      tab: "login", 

      loginSchema: {
        email: "required|min:3|max:100|email",
        password: "required|min:8|max:32",
      },

      login_in_submission: false,
      login_show_alert: false,
      login_show_error: false
    };
  },
  methods: {

    async login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;

      try {
        await this.$store.dispatch('login', values)

      }catch(error) {
        this.login_in_submission= false;
        this.login_show_alert= false;
        this.login_show_error = true;

        setTimeout(() => {
          this.login_show_error = false;
        }, 3000)

        return;
      }

      window.location.reload();
    },

  },

}
</script>
