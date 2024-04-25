<template>
  <nav class="navbar navbar-expand-lg">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Thư Viện</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link :to="{ name: 'bookhome' }" class="nav-link">
            Quản lý sách
            <i class="fas fa-book"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'pubcompanyhome' }" class="nav-link">
            Quản lý Nhà xuất bản
            <i class="fa-solid fa-building"></i>
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Quản lý tài khoản
            <i class="fa-solid fa-users"></i>
          </a>
          <ul class="dropdown-menu">
            <li>
              <router-link :to="{ name: 'staffHome' }" class="nav-link">
                Nhân Viên
              </router-link>
            </li>
            <li>
              <router-link :to="{ name: 'userHome' }" class="nav-link">
                Đọc giả
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'bBookHome' }" class="nav-link">
            Quản lý mượn sách
            <i class="fa-solid fa-book-open-reader"></i>
          </router-link>
        </li>
      </ul>
      <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
      <button class="btn btn-success" @click="logout()">Đăng xuất</button>
    </div>
  </div>
</nav>
</template>
<script>
export default {
  methods: {
    // Đăng xuất
    logout(){
        this.LogStatus = false;
        localStorage.removeItem("staff");
        //this.$router.push({ path: "/"});
        this.$router.go("/");
        // location.reload();
    },
  }
}
</script>
<style>
  .nav-item:hover{
    background-color: #00FF00;
    border-radius: 15px;
  }
  .navbar{
    background-color: #00FFFF;
  }
</style>