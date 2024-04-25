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
                <h2>Quản Lý Mượn/Trả Sách <i class="fa-solid fa-users"></i></h2>
                <button @click="refreshList()" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <!-- <button @click="goToAdd" class="btn btn-sm btn-success">
                    <i class="fas fa-plus"></i> Thêm mới
                </button> -->
                <button @click="removeAll" class="btn btn-sm btn-danger me-5">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <BBookList
                v-if="filteredCount > 0"
                :bBooks="filteredData"
            />
            <p v-else class="home-message">Không có dữ liệu để hiển thị!</p>
        </div>
    </div>
</template>

<script>
    import BBookService from "@/services/bBook.service";
    import InputSearch from "@/components/InputSearch.vue";
    import BBookList from "@/components/BBookList.vue";

    export default {
        components: {
            InputSearch,
            BBookList,
        },
        data() {
            return {
                bBooks: [],
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
            bBookStrings() {
                return this.bBooks.map((bBook) => {
                    const { name } = bBook;
                    return [ name ].join("");
                });
            },
            filteredData() {
                if(!this.searchText) return this.bBooks;
                return this.bBooks.filter((_items, index) => 
                    this.bBookStrings[index].includes(this.searchText)
                );
            },
            filteredCount() {
                return this.filteredData.length;
            },
        },
        methods: {
            async retrieveData() {
                try {
                    this.bBooks = await BBookService.getAll();
                } catch(error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrieveData();
                this.activeIndex = -1;
            },

            async removeAll() {
                if(confirm("Xóa tất cả ?")){
                    try {
                        await BBookService.deleteAll();
                        this.refreshList();
                    } catch(error) {
                        console.log(error);
                    }
                }
            },
            goToAdd() {
                this.$router.push({ name: "bBook.add"});
            },
        },
        mounted() {
            this.refreshList();
        },
    }
</script>

<style scoped>
    .page {
        text-align: left;
        /* max-width: 750px; */
    }
    .home-message{
        text-align: center;
        font-size: large;
        background-color: #FFD700;
    }
</style>