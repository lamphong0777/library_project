<template>
    <div v-if="pubCompany" class="page">
        <h2 class="text-center">SỬA NHÀ XUẤT BẢN</h2>
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
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                pubCompany: null,
                message: "",
            };
        },
        methods: {
            async getPubCompany(id) {
                try {
                    this.pubCompany = await PubCompanyService.get(id);
                    //console.log(this.pubCompany);
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

            async updatePubCompany(data) {
                try {
                    await PubCompanyService.update(this.pubCompany._id, data);
                    this.message = "Cập nhật thành công."
                } catch(error) {
                    console.log(error);
                }
            },

            // async deletePubCompany() {
            //     if(confirm("Do you want to delete this pubCompany?")){
            //         try {
            //             await PubCompanyService.delete(this.pubCompany._id);
            //             this.$router.push({ name: "pubCompanyhome" });
            //         }catch(error) {
            //             console.log(error);
            //         }
            //     }
            // } 
        },
        created() {
            this.getPubCompany(this.id);
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