user<template>
    <div v-if="user" class="page">
        <h2 class="text-center">SỬA ĐỌC GIẢ</h2>
        <p v-if="message" class="update-message text-center" style="color: green;">{{ message }}</p>
        <UserForm
            :user="user"
            @submit:user="updateUser"
        />
    </div>
</template>
<script>
    import UserForm from "@/components/UserForm.vue";
    import UserService from "@/services/user.service";

    export default {
        components: {
            UserForm,
        },
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                user: null,
                message: "",
            };
        },
        methods: {
            async getUser(id) {
                try {
                    this.user = await UserService.get(id);
                    //console.log(this.user);
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

            async updateUser(data) {
                try {
                    await UserService.update(this.user._id, data);
                    this.message = "Cập nhật thành công."
                } catch(error) {
                    console.log(error);
                }
            },
        },
        created() {
            this.getUser(this.id);
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