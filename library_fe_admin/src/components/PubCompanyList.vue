<template>
<div class="row">
    <div class="">
        <table class="table table-hover table-bordered text-center">
    <thead>
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Tên nhà xuất bản</th>
        <th scope="col">Quản lý</th>
        </tr>
    </thead>
    <tbody>
        <tr 
            v-for="(item, index) in pubCompanies"
        >
            <td>
                {{ item._id }}
            </td>
            <td>
                {{ item.name }}
            </td>
            <td>
            <span>
                <router-link
                    :to="{
                        name: 'pubcompany.edit',
                        params: { id: item._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link>
                <button @click="deletePubCompany(item._id)" class="mt-2 btn btn-danger">
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
import PubCompanyService from "@/services/pubCompany.service";
export default {
        props: {
            pubCompanies: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async deletePubCompany(id) {
                if(confirm("Bạn muốn xóa nhà xuất bản này?")){
                    try {
                        await PubCompanyService.delete(id);
                        this.$router.push({ name: "pubcompanyhome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
                this.$router.push({ name: "pubcompanyhome" });
            }
        },
    };
</script>

<style>

</style>