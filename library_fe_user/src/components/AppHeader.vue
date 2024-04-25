<template>
    <div class="app-header d-flex m-0 justify-content-between">
        <div class="p-2">
            <div class="">
                <img src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/c46c7f62556223.5a945f059c90e.png" alt="" width="80px" class="logo">
                <router-link :to="{ name: 'bookHome' }" class="app-title">
                    <span>Library</span>
                </router-link>
            </div>
        </div>
        <div v-if="!checkUser" class="d-flex">
            <div class="p-2">
            <button class="btn btn-primary" @click="gotoLogin"><i class="fa-solid fa-right-to-bracket"></i> Đăng Nhập</button>
            </div>
            <div class="p-2">
                <button class="btn btn-primary" @click="gotoRegister"><i class="fa-solid fa-registered"></i> Đăng Ký</button>
            </div>
        </div>
        
        <div class="p-2 d-flex" v-else>
            <button class="btn btn-outline-warning me-3">{{ checkUser.firstname+' '+checkUser.lastname}}</button>
            <button class="btn btn-warning" @click="logout"><i class="fa-solid fa-right-from-bracket"></i> Đăng xuất</button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
    return {
      checkUser: {},
    }
    },
    methods: {
        // Đăng xuất
        logout(){
            this.LogStatus = false;
            localStorage.removeItem("user");
            //this.$router.push({ path: "/"});
            this.$router.go("/");
            // location.reload();
        },
        checkUserExist() {
            this.checkUser = (JSON.parse(localStorage.getItem("user")));
        },
        gotoLogin() {
            this.$router.push("/login");
        },
        gotoRegister() {
            this.$router.push("/register");
        }
        
    },
    mounted() {
        this.checkUserExist();
    }
}
</script>
<style>
    .app-header {
        background-image: linear-gradient(to right, #00FF7F, #008000);;
    }
    .logo{
        border-radius: 20px;
        margin-right: 8px;
    }
    .app-title {
        text-decoration: none;
        font-size: 24px;
        font-weight: bold;
        color: #ffff
    }
</style>