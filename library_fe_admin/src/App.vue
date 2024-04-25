<script>
import AppHeader from "@/components/AppHeader.vue";
  import Login from "./views/Login.vue";
  export default {
    components: {
      AppHeader,
      Login,
  },
  data() {
    return {
      checkUser: [],
    }
  },
  methods: {
    checkUserExist() {
      this.checkUser = (JSON.parse(localStorage.getItem("staff")));
    }
  },
  mounted() {
    this.checkUserExist();
  }
  }
</script>

<template>
  <div id="app" v-if="checkUser">
    <AppHeader/>
    <div class="mt-3">
      <router-view>
      </router-view>
    </div>
  </div>
  <div id="app" v-else>
    <Login></Login>
  </div>
</template>

<style>
  .page {
    /* max-width: 400px; */
    margin: auto;
  }
  *{
    font-family: 'Noto Serif', serif;
  }
</style>