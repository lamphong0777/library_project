<template>
    <div class="col-md-3 p-3">
        <div>
            <h5 class="nav-sidebar-title p-2 text-center m-0">THƯ MỤC</h5>
            <ul class="nav-sidebar">
                <li class="d-flex justify-content-between p-2">
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Nhà Xuất Bản Kim Đồng</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>
                <li class="d-flex justify-content-between p-2">
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Nhà Xuất Bản Trẻ</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>
                <li class="d-flex justify-content-between p-2">
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Nhà Xuất Bản Hội Nhà Văn</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>          
            </ul>
        </div>
        <div>
            <h5 class="nav-sidebar-title p-2 text-center m-0">CHỨC NĂNG</h5>
            <ul class="nav-sidebar">
                <router-link :to="{ name: 'bookBorrow', params: { id: userUid }}" class="router-link" >
                <li class="d-flex justify-content-between p-2">     
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Sách Đang Mượn</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>
                </router-link>
                <li class="d-flex justify-content-between p-2">
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Trang Cá Nhân</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>
                <li class="d-flex justify-content-between p-2">
                    <span><i class="fa-solid fa-book app-bar-icon"></i></span>
                    <span>Sách Yêu Thích</span>
                    <span><i class="fa-solid fa-caret-right app-bar-icon"></i></span>
                </li>          
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userUid: String,
        }
    },
    methods: {
        getUser() {
            const User = JSON.parse(localStorage.getItem("user"));
            if (User) {
                this.userUid = User._id;
                console.log(this.userUid);
            } else {
                this.userUid = "-1"
            }
        }
    },
    mounted() {
        this.getUser();
    }
}
</script>
<style>
.nav-sidebar {
    background-color: #FFFF;
    list-style: none;
    text-align: left;
    padding-left: 0px !important;
}
.nav-sidebar li {
    border-bottom: 1px solid #C0C0C0;
}
.nav-sidebar-title {
    background-color: #3CB371;
    /* border: 1px solid black; */
}
.nav-sidebar li:hover {
    background-color: #B8B8B8;
}
.app-bar-icon {
    color: #3CB371;
    background-color: #E0E0E0;
    padding: 5px;
    border-radius: 20px;
}
.router-link {
    text-decoration: none;
    color: black;
}
</style>