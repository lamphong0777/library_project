staff<template>
    <div v-if="staff" class="page">
        <h2 class="text-center">SỬA NHÂN VIÊN</h2>
        <p v-if="message" class="update-message text-center" style="color: green;">{{ message }}</p>
        <StaffForm
            :staff="staff"
            @submit:staff="updateStaff"
        />
    </div>
</template>
<script>
    import StaffForm from "@/components/StaffForm.vue";
    import StaffService from "@/services/staff.service";

    export default {
        components: {
            StaffForm,
        },
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                staff: null,
                message: "",
            };
        },
        methods: {
            async getStaff(id) {
                try {
                    this.staff = await StaffService.get(id);
                    //console.log(this.staff);
                } catch(error) {
                    console.log(error);
                    this.$router.push({
                        name: "notfound",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
            },

            async updateStaff(data) {
                try {
                    await StaffService.update(this.staff._id, data);
                    this.message = "Cập nhật thành công."
                } catch(error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getStaff(this.id);
            this.message="";
        },
    }
</script>
<style>
.update-message {
    background-color: greenyellow;
    max-width: 500px;
    margin: auto;
    height: 30px;
    align-items: center;
    border-radius: 15px;
}
</style>