<template>
<div class="row">
    <div class="">
        <table class="table table-hover table-bordered text-center">
    <thead>
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Họ lót</th>
        <th scope="col">Tên</th>
        <th scope="col">Giới tính</th>
        <th scope="col">Ngày sinh</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Email</th>
        <th scope="col">Số điện thoại</th>
        </tr>
    </thead>
    <tbody>
        <tr 
            v-for="(item, index) in users"
        >
            <td>{{ item._id }}</td>
            <td>{{ item.firstname }}</td>
            <td>{{ item.lastname }}</td>
            <td>{{ item.sex }}</td>
            <td>{{ item.dayofbirth }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>
            <span>
                <router-link
                    :to="{
                        name: 'user.edit',
                        params: { id: item._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link>
                <button @click="deleteUser(item._id)" class="mt-2 btn btn-danger">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </span>
        </td>
        </tr>
    </tbody>
</table>
    </div>
</div>
</template>

<script>
import UserService from "@/services/user.service";
export default {
        props: {
            users: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async deleteUser(id) {
                if(confirm("Bạn muốn xóa đọc giả này?")){
                    try {
                        await UserService.delete(id);
                        this.$router.push({ name: "userHome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
                this.$router.push({ name: "userHome" });
            }
        },
    };
</script>

<style>

</style>