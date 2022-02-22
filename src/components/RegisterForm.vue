<template>
   <div v-show="tab === 'register'">
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <vee-form name="name" class="space-y-6" action="#" method="POST" :validation-schema="schema" @submit="register" >
                  <div>
                    <label for="name" class="block text-sm font-medium text-gray-700" > Name </label>
                    <div class="mt-1">
                      <vee-field name="name" type="text" autocomplete="name" placeholder="Enter Name" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                      <ErrorMessage class="text-red-600" name="name" />
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700" > Email address </label>
                    <div class="mt-1">
                      <vee-field name="email" type="email" autocomplete="email" placeholder="muziki@killertunes.com" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                      <ErrorMessage class="text-red-600" name="email" />
                    </div>
                  </div>

                  <div>
                    <label for="email" class="block text-sm font-medium text-gray-700" > Age </label>
                    <div class="mt-1">
                      <vee-field name="age" type="number" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                      <ErrorMessage class="text-red-600" name="age" />
                    </div>
                  </div>

                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700" >
                      Password
                    </label>
                    <div class="mt-1">
                      <vee-field name="password" :bails="false" v-slot="{ field, errors }" >
                        <input type="password" v-bind="field" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " placeholder="Enter password" />
                        <div class="text-red-600" v-for="error in errors" :key="error" > {{ error }} </div>
                      </vee-field>
                      <!-- <ErrorMessage class="text-red-600" name="password" /> -->
                    </div>
                  </div>

                  <div>
                    <label for="password" class="block text-sm font-medium text-gray-700" > Confirm Password </label>
                    <div class="mt-1">
                      <vee-field name="confirmation" type="password" placeholder="confirm password" class=" appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm " />
                      <ErrorMessage class="text-red-600" name="confirmation" />
                    </div>
                  </div>

                  <div>
                    <button type="submit" class=" w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm                        font-medium                        text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
                      :class="[ reg_in_submission ? 'bg-gray-400 hover:bg-slate-400' : '', ]"
                      :disabled="reg_in_submission" >
                      <svg v-if="reg_show_alert" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" ></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" ></path>
                      </svg>
                      {{ reg_show_alert ? "Processing..." : "Register" }}
                    </button>
                  </div>
                </vee-form>

                <div class="mt-6">
                  <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                      <div class="w-full border-t border-gray-300" />
                    </div>
                    <div class="relative flex justify-center text-sm">
                      <span class="px-2 py-2 bg-white text-gray-500">
                        Already a Streamer?
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
</template>

<script>
export default {
    name: 'RegisterForm',
   
      data() {
    return {
      tab: "register",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:17|max_value:101",
        password: "required|min:8|max:32",
        confirmation: "required|confirmed:@password",
      },

      reg_in_submission: false,
      reg_show_alert: false,

    };
    }, 
    methods: {

    register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
    },
  },

}
</script>
