<template>
<div class="row">
    <div class="">
        <table class="table table-hover table-bordered text-center">
    <thead>
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Tên nhân viên</th>
        <th scope="col">Email</th>
        <th scope="col">Chức vụ</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Số điện thoại</th>
        </tr>
    </thead>
    <tbody>
        <tr 
            v-for="(item, index) in staffs"
        >
            <td>{{ item._id }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.position }}</td>
            <td>{{ item.address }}</td>
            <td>{{ item.phone }}</td>
            <td>
            <span>
                <router-link
                    :to="{
                        name: 'staff.edit',
                        params: { id: item._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link>
                <button @click="deleteStaff(item._id)" class="mt-2 btn btn-danger">
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
import StaffService from "@/services/staff.service";
export default {
        props: {
            staffs: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async deleteStaff(id) {
                if(confirm("Bạn muốn xóa nhà xuất bản này?")){
                    try {
                        await StaffService.delete(id);
                        this.$router.push({ name: "staffHome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
                this.$router.push({ name: "staffHome" });
            }
        },
    };
</script>

<style>

</style>