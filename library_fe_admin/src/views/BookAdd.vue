<script>
    import BookForm from "@/components/BookForm.vue";
    import BookService from "@/services/book.service";

    export default {
        components: {
            BookForm,
        },
        data() {
            return {
                book: {},
                message: ""
            };
        },
        methods: {
            async createNewBook(data) {
                try {
                    await BookService.create(data);
                    this.message = "Thêm sách thành công!"
                } catch(error) {
                    console.log(error);
                }
            }
        }
    }
</script>

<template>
    <div class="page">
        <h2 class="text-center">THÊM SÁCH</h2>
        <p v-if="message" class="create-message text-center" style="color: green;">{{ message }}</p>
        <BookForm 
            :book="book"
            @submit:book="createNewBook"
        />
    </div>
</template>

<style>
.create-message {
    background-color: greenyellow;
    max-width: 500px;
    margin: auto;
    height: 30px;
    align-items: center;
    border-radius: 15px;
}
</style>