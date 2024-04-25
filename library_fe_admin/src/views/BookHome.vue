<template>
    <div class="page row">
        <div class="row">
            <div class="col-md-4 offset-md-8">
            <InputSearch v-model="searchText">
            </InputSearch>
            </div>
        </div>
        <div class="mt-3 col-md-12">
            <div class="d-flex justify-content-between mb-3">
                <h2>Quản Lý sách <i class="fas fa-book"></i></h2>
                <button @click="refeshList()" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button @click="goToAddBook" class="btn btn-sm btn-success">
                    <i class="fas fa-plus"></i> Thêm sách
                </button>
                <button @click="removeAllBooks" class="btn btn-sm btn-danger me-5">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <BookList
                v-if="filteredBooksCount > 0"
                :books="filteredBooks"
            />
            <p v-else>Không có sách để hiển thị!</p>
        </div>
        <!-- <div class="mt-3 col-md-6">
            <div
                v-if="activeBook"
            >
                <h4>
                    Book Details:
                    <i class="fas fa-address-card"></i>
                </h4>
                <BookCard :book="activeBook"/>
                <router-link
                    :to="{
                        name: 'book.edit',
                        params: { id: activeBook._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning">
                        <i class="fas fa-edit"></i> Edit
                    </span>
                </router-link>
            </div>
        </div> -->
    </div>
</template>

<script>
    import BookService from "@/services/book.service";
    import InputSearch from "@/components/InputSearch.vue";
    import BookList from "@/components/BookList.vue";


    export default {
        components: {
            InputSearch,
            BookList,
        },
        data() {
            return {
                books: [],
                activeIndex: -1,
                searchText: "",
            };
        },
        watch: {
            searchText() {
                this.activeIndex = -1;
            },
        },
        computed: {
            bookStrings() {
                return this.books.map((book) => {
                    const { title } = book;
                    return [ title ].join("");
                });
            },
            filteredBooks() {
                if(!this.searchText) return this.books;
                return this.books.filter((_book, index) => 
                    this.bookStrings[index].includes(this.searchText)
                );
            },
            filteredBooksCount() {
                return this.filteredBooks.length;
            },
        },
        methods: {
            async retrieveBook() {
                try {
                    this.books = await BookService.getAll();
                } catch(error) {
                    console.log(error);
                }
            },

            refeshList() {
                this.retrieveBook();
                this.activeIndex = -1;
            },

            async removeAllBooks() {
                if(confirm("Xóa tất cả sách ?")){
                    try {
                        await BookService.deleteAll();
                        this.refeshList();
                    } catch(error) {
                        console.log(error);
                    }
                }
            },
            goToAddBook() {
                this.$router.push({ name: "book.add"});
            },
        },
        mounted() {
            this.refeshList();
        },
    }

</script>

<style scoped>
    .page {
        text-align: left;
        /* max-width: 750px; */
    }
</style>