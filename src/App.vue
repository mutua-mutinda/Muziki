<template>
  <AppHeader />
  <router-view></router-view>

  <!-- Player -->
  <AppPlayer/>

  <AuthModal />
</template>

<script>
import { mapGetters } from 'vuex';
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
 beforeMount() {
    this.$store.dispatch("initTheme");
  },
  created() {
    this.$store.dispatch('init_login')

  },
  computed: {
    ...mapGetters({ theme: "getTheme" }),
  },
    watch: {
    theme(newTheme, oldTheme) {
      newTheme === "light"
        ? document.querySelector("html").classList.remove("dark")
        : document.querySelector("html").classList.add("dark");
    },
  },

 
};
</script>