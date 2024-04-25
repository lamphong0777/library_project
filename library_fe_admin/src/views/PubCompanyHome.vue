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
                <h2>Quản Lý Nhà Xuất Bản <i class="fas fa-building"></i></h2>
                <button @click="refreshList()" class="btn btn-sm btn-primary me-2">
                    <i class="fas fa-redo"></i> Làm mới
                </button>
                <button @click="goToAdd" class="btn btn-sm btn-success">
                    <i class="fas fa-plus"></i> Thêm mới
                </button>
                <button @click="removeAll" class="btn btn-sm btn-danger me-5">
                    <i class="fas fa-trash"></i> Xóa tất cả
                </button>
            </div>

            <PubCompanyList
                v-if="filteredCount > 0"
                :pubCompanies="filteredPubCompany"
            />
            <p v-else>Không có dữ liệu để hiển thị!</p>
        </div>
    </div>
</template>

<script>
    import PubCompanyService from "@/services/pubCompany.service";
    import InputSearch from "@/components/InputSearch.vue";
    import PubCompanyList from "@/components/PubCompanyList.vue";


    export default {
        components: {
            InputSearch,
            PubCompanyList,
        },
        data() {
            return {
                pubCompanies: [],
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
            pubComStrings() {
                return this.pubCompanies.map((pubCom) => {
                    const { name } = pubCom;
                    return [ name ].join("");
                });
            },
            filteredPubCompany() {
                if(!this.searchText) return this.pubCompanies;
                return this.pubCompanies.filter((_items, index) => 
                    this.pubComStrings[index].includes(this.searchText)
                );
            },
            filteredCount() {
                return this.filteredPubCompany.length;
            },
        },
        methods: {
            async retrievePubCompany() {
                try {
                    this.pubCompanies = await PubCompanyService.getAll();
                } catch(error) {
                    console.log(error);
                }
            },
            refreshList() {
                this.retrievePubCompany();
                this.activeIndex = -1;
            },

            async removeAll() {
                if(confirm("Xóa tất cả nhà xuất bản ?")){
                    try {
                        await PubCompanyService.deleteAll();
                        this.refreshList();
                    } catch(error) {
                        console.log(error);
                    }
                }
            },
            goToAdd() {
                this.$router.push({ name: "pubcompany.add"});
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
</style>