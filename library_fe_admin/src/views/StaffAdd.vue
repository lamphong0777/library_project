staff<template>
    <div v-if="staff" class="page">
        <h2 class="text-center">THÊM NHÂN VIÊN</h2>
        <p v-if="message" class="update-message text-center" style="color: green;">{{ message }}</p>
        <StaffFormAdd
            :staff="staff"
            @submit:staff="updateStaff"
        />
    </div>
</template>
<script>
    import StaffFormAdd from "@/components/StaffFormAdd.vue";
    import StaffService from "@/services/staff.service";

    export default {
        components: {
            StaffFormAdd,
        },
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                staff: {},
                message: "",
            };
        },
        methods: {

            async updateStaff(data) {
                try {
                    await StaffService.create(data);
                    this.message = "Thêm thành công."
                } catch(error) {
                    console.log(error);
                }
            },
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