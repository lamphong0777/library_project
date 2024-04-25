<template>
    <div v-if="book" class="page">
        <h2 class="text-center">SỬA SÁCH</h2>
        <p v-if="message" class="update-message text-center" style="color: green;">{{ message }}</p>
        <BookForm
            :book="book"
            @submit:book="updateBook"
            @delete:book="deleteBook"
        />
    </div>
</template>
<script>
    import BookForm from "@/components/BookForm.vue";
    import BookService from "@/services/book.service";

    export default {
        components: {
            BookForm,
        },
        props: {
            id: { type: String, required: true},
        },
        data() {
            return {
                book: null,
                message: "",
            };
        },
        methods: {
            async getBook(id) {
                try {
                    this.book = await BookService.get(id);
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

            async updateBook(data) {
                try {
                    await BookService.update(this.book._id, data);
                    this.message = "Cập nhật sách thành công."
                } catch(error) {
                    console.log(error);
                }
            },

            async deleteBook() {
                if(confirm("Do you want to delete this book?")){
                    try {
                        await BookService.delete(this.book._id);
                        this.$router.push({ name: "bookhome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
            } 
        },
        created() {
            this.getBook(this.id);
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