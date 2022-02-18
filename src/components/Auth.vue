<template>
  <!-- Auth Modal -->
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    :class="{ hidden: !authModalShow }"
  >
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        pt-4
        px-4
        pb-20
        text-center
        sm:block sm:p-0
      "
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          sm:my-8 sm:align-middle sm:max-w-lg sm:w-full
        "
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6 m-4">
          <!-- Modal Close Button -->
          <div class="flex justify-end items-center">
            <div
              class="modal-close cursor-pointer z-50"
              @click.prevent="toggleAuthModal"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
          <!--Title-->
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <p
              v-show="tab === 'login'"
              class="
                mt-6
                text-center text-3xl
                font-extrabold
                text-stone-500
                font-sans
              "
            >
              Welcome <span class="text-amber-600">Mutua</span>
            </p>
          </div>

          <div v-show="tab === 'login'">
            <div
              class="
                min-h-full
                flex flex-col
                justify-center
                py-12
                sm:px-6
                lg:px-8
              "
            >
              <div class="mt-2 sm:mx-auto sm:w-full sm:max-w-md">
                <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                  <vee-form
                    name="name"
                    class="space-y-6"
                    action="#"
                    method="POST"
                    :validation-schema="schema"
                    @submit="login"
                  >
                    <div>
                      <label
                        for="email"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <div class="mt-1">
                        <vee-field
                          name="email"
                          type="email"
                          autocomplete="email"
                          required=""
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            rounded-md
                            shadow-sm
                            placeholder-gray-400
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          "
                        />
                        <ErrorMessage class="text-red-500" name="email" />
                      </div>
                    </div>

                    <div>
                      <label
                        for="password"
                        class="block text-sm font-medium text-gray-700"
                      >
                        Password
                      </label>
                      <vee-field
                        name="password"
                        :bails="false"
                        v-slot="{ field, errors }"
                      >
                        <input
                          type="password"
                          v-bind="field"
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            rounded-md
                            shadow-sm
                            placeholder-gray-400
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          "
                          placeholder="Enter password"
                        />
                        <div
                          class="text-red-600"
                          v-for="error in errors"
                          :key="error"
                        >
                          {{ error }}
                        </div>
                      </vee-field>
                      <!-- <div class="mt-1">
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autocomplete="current-password"
                          required=""
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            rounded-md
                            shadow-sm
                            placeholder-gray-400
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          "
                        />
                      </div> -->
                    </div>

                    <div class="flex items-center justify-between">
                      <div class="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          class="
                            h-4
                            w-4
                            text-indigo-600
                            focus:ring-indigo-500
                            border-gray-300
                            rounded
                          "
                        />
                        <label
                          for="remember-me"
                          class="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      <div class="text-sm">
                        <a
                          href="#"
                          class="
                            font-medium
                            text-indigo-600
                            hover:text-indigo-500
                          "
                        >
                          Forgot your password?
                        </a>
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        class="
                          w-full
                          flex
                          justify-center
                          py-2
                          px-4
                          border border-transparent
                          rounded-md
                          shadow-sm
                          text-sm
                          font-medium
                          text-white
                          bg-indigo-600
                          hover:bg-indigo-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        "
                        :class="[
                          login_in_submission
                            ? 'bg-gray-400 hover:bg-slate-400'
                            : '',
                        ]"
                        :disabled="login_in_submission"
                      >
                        <svg
                          v-if="login_show_alert"
                          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                          ></circle>
                          <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {{ login_show_alert ? "Processing..." : "Sign In" }}
                      </button>

                      <!-- <button
                        type="submit"
                        class="
                          w-full
                          flex
                          justify-center
                          py-2
                          px-4
                          border border-transparent
                          rounded-md
                          shadow-sm
                          text-sm
                          font-medium
                          text-white
                          bg-indigo-600
                          hover:bg-indigo-700
                          focus:outline-none
                          focus:ring-2
                          focus:ring-offset-2
                          focus:ring-indigo-500
                        "
                      >
                        Sign in
                      </button> -->
                    </div>
                  </vee-form>

                  <div class="mt-6">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">
                          New To Muziki?
                        </span>
                      </div>
                    </div>
                  </div>
                  <ul>
                    <li class="flex-auto text-center">
                      <a
                        class="
                          block
                          rounded
                          py-3
                          px-4
                          transition
                          ease-in-out
                          delay-150
                          hover:text-sky-600
                          hover:underline
                          hover:-translate-y-1
                          hover:scale-110
                          duration-300
                        "
                        href="#"
                        @click="tab = 'register'"
                        >Register</a
                      >
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- Registration Form -->
          <div v-show="tab === 'register'">
            <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <vee-form
                  name="name"
                  class="space-y-6"
                  action="#"
                  method="POST"
                  :validation-schema="schema"
                  @submit="register"
                >
                  <div>
                    <label
                      for="name"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div class="mt-1">
                      <vee-field
                        name="name"
                        type="text"
                        autocomplete="name"
                        placeholder="Enter Name"
                        class="
                          appearance-none
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          rounded-md
                          shadow-sm
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          sm:text-sm
                        "
                      />
                      <ErrorMessage class="text-red-600" name="name" />
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div class="mt-1">
                      <vee-field
                        name="email"
                        type="email"
                        autocomplete="email"
                        placeholder="muziki@killertunes.com"
                        class="
                          appearance-none
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          rounded-md
                          shadow-sm
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          sm:text-sm
                        "
                      />
                      <ErrorMessage class="text-red-600" name="email" />
                    </div>
                  </div>

                  <div>
                    <label
                      for="email"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <div class="mt-1">
                      <vee-field
                        name="age"
                        type="number"
                        required=""
                        class="
                          appearance-none
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          rounded-md
                          shadow-sm
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          sm:text-sm
                        "
                      />
                      <ErrorMessage class="text-red-600" name="age" />
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div class="mt-1">
                      <vee-field
                        name="password"
                        :bails="false"
                        v-slot="{ field, errors }"
                      >
                        <input
                          type="password"
                          v-bind="field"
                          class="
                            appearance-none
                            block
                            w-full
                            px-3
                            py-2
                            border border-gray-300
                            rounded-md
                            shadow-sm
                            placeholder-gray-400
                            focus:outline-none
                            focus:ring-indigo-500
                            focus:border-indigo-500
                            sm:text-sm
                          "
                          placeholder="Enter password"
                        />
                        <div
                          class="text-red-600"
                          v-for="error in errors"
                          :key="error"
                        >
                          {{ error }}
                        </div>
                      </vee-field>
                      <!-- <ErrorMessage class="text-red-600" name="password" /> -->
                    </div>
                  </div>

                  <div>
                    <label
                      for="password"
                      class="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password
                    </label>
                    <div class="mt-1">
                      <vee-field
                        name="confirmation"
                        type="password"
                        autocomplete="current-password"
                        placeholder="confirm password"
                        class="
                          appearance-none
                          block
                          w-full
                          px-3
                          py-2
                          border border-gray-300
                          rounded-md
                          shadow-sm
                          placeholder-gray-400
                          focus:outline-none
                          focus:ring-indigo-500
                          focus:border-indigo-500
                          sm:text-sm
                        "
                      />
                      <ErrorMessage class="text-red-600" name="confirmation" />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      class="
                        w-full
                        flex
                        justify-center
                        py-2
                        px-4
                        border border-transparent
                        rounded-md
                        shadow-sm
                        text-sm
                        font-medium
                        text-white
                        bg-indigo-600
                        hover:bg-indigo-700
                        focus:outline-none
                        focus:ring-2
                        focus:ring-offset-2
                        focus:ring-indigo-500
                      "
                      :class="[
                        reg_in_submission
                          ? 'bg-gray-400 hover:bg-slate-400'
                          : '',
                      ]"
                      :disabled="reg_in_submission"
                    >
                      <svg
                        v-if="reg_show_alert"
                        class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          class="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          stroke-width="4"
                        ></circle>
                        <path
                          class="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
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
                      <span class="px-2 bg-white text-gray-500">
                        Already a Streamer?
                      </span>
                    </div>
                  </div>
                </div>
                <ul>
                  <li class="flex-auto text-center">
                    <a
                      class="
                        block
                        rounded
                        py-3
                        px-4
                        transition
                        ease-in-out
                        delay-150
                        hover:text-sky-600
                        hover:underline
                        hover:-translate-y-1
                        hover:scale-110
                        duration-300
                      "
                      href="#"
                      @click="tab = 'login'"
                      >Login</a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      tab: "login",
      schema: {
        name: "required|min:3|max:100|alpha_spaces",
        email: "required|min:3|max:100|email",
        age: "required|min_value:17|max_value:101",
        password: "required|min:8",
        confirmation: "required|confirmed:@password",
      },
      login_in_submission: false,
      login_show_alert: false,

      reg_in_submission: false,
      reg_show_alert: false,
    };
  },

  name: "AuthModal",

  computed: {
    ...mapState(["authModalShow"]),
  },

  methods: {
    ...mapMutations(["toggleAuthModal"]),

    login(values) {
      this.login_in_submission = true;
      this.login_show_alert = true;
      console.log(values);
    },

    register(values) {
      this.reg_in_submission = true;
      this.reg_show_alert = true;
    },
  },
};
</script>

<style>
</style>