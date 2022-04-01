<template>
  <AppHeader />
  <router-view></router-view>

  <!-- Player -->
  <AppPlayer/>

  <AuthModal />
</template>

<script>
import AuthModal from "./components/Auth.vue";
import AppHeader from "./components/Header.vue";
import AppPlayer from "./components/Player.vue";
export default {
  name: "App",
  components: {
    AppHeader,
    AuthModal,
    AppPlayer
},
  created() {
    this.$store.dispatch('init_login')

  },

 
};
</script>