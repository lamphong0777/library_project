<template>
    <div class="col-md-9">
        <div id="homepage-banner" class="carousel slide">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#homepage-banner" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#homepage-banner" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#homepage-banner" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/1.png" class="banner-img d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/10.png" class="banner-img d-block w-100" alt="...">
            </div>
            <div class="carousel-item">
                <img src="https://thietkelogo.edu.vn/uploads/images/thiet-ke-do-hoa-khac/banner-sach/11.png" class="banner-img d-block w-100" alt="...">
            </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#homepage-banner" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#homepage-banner" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
        <div class="row mt-2">
            <div class="col-md-4">
            <InputSearch v-model="searchText">
            </InputSearch>
            </div>
        </div>
        <div class="mt-2 mb-2 book-gird-title">&nbsp;SÁCH</div>
        <BookGird
            v-if="filteredBooksCount > 0"
            :books="filteredBooks"
        />
        <p v-else>Không có sách để hiển thị!</p>
        <button @click="toTop" class="roll-top-btn"><i class="fa-solid fa-arrow-up"></i></button>
    </div>
</template>

<script>
    import BookService from "@/services/book.service";
    import InputSearch from "@/components/InputSearch.vue";
    import BookGird from "@/components/BookGird.vue";


    export default {
        components: {
            InputSearch,
            BookGird,
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

            async removeAllBooks() {
                if(confirm("Xóa tất cả sách ?")){
                    try {
                        await BookService.deleteAll();
                        this.refreshList();
                    } catch(error) {
                        console.log(error);
                    }
                }
            },
            toTop: function () {
                window.scrollTo({
                top: 0,
                behavior: "smooth"
                });
            },
        },
        mounted() {
            this.retrieveBook();
        },
    }

</script>

<style scoped>
.banner-img {
  height: 300px;
}
.book-gird-title {
    border-left: 2px solid #008000;
    font-size: 22px;
    color: #008000;
    font-weight: bold;
}
.roll-top-btn {
    width:50px;
    height:50px;
    padding: 5px;
    position:fixed;
    z-index:999;
    right: 2px;
    top:90%;
    background: #006400;
    border-radius: 20px;
    cursor:pointer;
    /* opacity:0.6; */
    color:#fff;
    font-size:2.0em;
}
</style>