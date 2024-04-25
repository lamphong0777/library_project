<template>
    <div class="page">
        <h2 class="text-center">THÊM NHÀ XUẤT BẢN</h2>
        <p v-if="message" class="update-message text-center" style="color: green;">{{ message }}</p>
        <PubCompanyForm
            :pubCompany="pubCompany"
            @submit:pubCompany="updatePubCompany"
        />
    </div>
</template>
<script>
    import PubCompanyForm from "@/components/PubComForm.vue";
    import PubCompanyService from "@/services/pubCompany.service";

    export default {
        components: {
            PubCompanyForm,
        },
        // props: {
        //     id: { type: String, required: true},
        // },
        data() {
            return {
                pubCompany: {},
                message: "",
            };
        },
        methods: {
            async updatePubCompany(data) {
                try {
                    await PubCompanyService.create(data);
                    this.message = "Thêm thành công."
                } catch(error) {
                    console.log(error);
                }
            },
        },
        created() {
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