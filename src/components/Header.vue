<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex  items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-amber-300 font-bold uppercase text-3xl mr-4 font-sans" href="/#/" >Muziki</a >

      <!-- Navigation Links -->
      <div class="flex flex-grow justify-between items-center">
        
        <div v-show="!userLoggedIn" class="flex flex-grow">
          <span class="sr-ony"></span>
        </div>

        <!-- align right -->
        <div v-show="!userLoggedIn" class="flex flex-row justify-end mt-1">
          <a class="px-2 text-white" href="/#/signin" @click.prevent="toggleAuthModal" >Sign In</a >
        </div>

        <div v-show="userLoggedIn" class="flex flex-row">
          <router-link class="px-2 text-white" to="/manage">Manage</router-link>
        </div>

          <!-- align right -->
        <div v-show="userLoggedIn" class="">
            <a class="px-2 text-white" href="/#/logout" @click.prevent="signout">Logout</a>
        </div>
          

      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "Header",
  
  computed: {
    ...mapState(["userLoggedIn"])
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),


  //if the user logs out, redirect home page
    signout() {
      this.$store.dispatch('signout')

    
      if(this.$route.meta.requiresAuth) {
        this.$router.push({name: 'Home'})
      }
    }
  },
};
</script>