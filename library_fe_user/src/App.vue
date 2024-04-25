<template>
  <div id="app">
    <header>
    <AppHeader></AppHeader>
    </header>
    <main class="pt-2">
      <div class="row m-0">
      <AppSideBar></AppSideBar>
      <!-- views -->
      <router-view></router-view>
      </div>
    </main>
    <footer>
      <AppFooter></AppFooter>
    </footer>
  </div>

  <!-- <div v-else>
    <Login/>
  </div> -->
</template>

<script>
import AppFooter from './components/AppFooter.vue';
import AppHeader from './components/AppHeader.vue';
import AppSideBar from './components/AppSideBar.vue';
import Login from "./views/Login.vue";
export default {
  components: {
    AppHeader,
    AppSideBar,
    AppFooter,
    Login,
  },
  data() {
    return {
      checkUser: [],
    }
  },
  methods: {
    checkUserExist() {
      this.checkUser = (JSON.parse(localStorage.getItem("user")));
    }
  },
  mounted() {
    this.checkUserExist();
  }
}
</script>

<style scoped>
* {
  padding: 0px;
  font-family: sans-serif;
}
main {
  background-color: #E8E8E8;
}
</style>
