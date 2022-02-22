<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-amber-300 font-bold uppercase text-3xl mr-4 font-sans" href="#" >Muziki</a >

      <!-- Navigation Links -->
      <div class="flex flex-grow justify-between items-center">
        <div class="flex flex-row mt-1">
          <a class="px-2 text-white" href="/#/manage">Manage</a>
        </div>
        <!-- align right -->
        <div class="">
          <a class="px-2 text-white" href="/#/signin" @click.prevent="toggleAuthModal" >Sign In</a >
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "Header",

  methods: {
    ...mapMutations(["toggleAuthModal"]),
  },
};
</script>