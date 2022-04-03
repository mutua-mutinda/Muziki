<template>
  <AppHeader />
  <router-view v-slot="{Component}">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>

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
<style>
.fade-enter-from {
  opacity: 0;
}

.fade-enter-active {
  transition: all 0.5s linear;
}

.fade-leave-to {
  transition: all 0.5s linear;
  opacity: 0;
}
</style>