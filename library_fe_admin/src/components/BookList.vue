<template>
<table class="table table-hover table-bordered text-center">
  <thead>
    <tr>
        <th>STT</th>
      <th scope="col">Tiêu đề</th>
      <th scope="col">Ảnh</th>
      <th scope="col">số lượng</th>
      <th scope="col">Nhà xuất bản</th>
      <th scope="col">Năm xuất bản</th>
      <th scope="col">Tác giả</th>
      <th scope="col">Giá</th>
      <th scope="col">Quản lý</th>
    </tr>
  </thead>
  <tbody>
    <tr 
        v-for="(book, index) in books"
        :class="{ active: index === activeIndex }"
        @click="updateActiveIndex(index)"
    >
        <td>{{ index+1 }}</td>
        <td>
            {{ book.title }}
        </td>
        <td>
            <img :src="book.imageUrl" :alt="book.title" width="50px">
        </td>
        <td>
            {{ book.quantity }}
        </td>
        <td>
            <!-- {{ book.pubCompanyId }} -->
            {{ getName(book.pubCompanyId) }}
        </td>
        <td>
            {{ book.pubYear }}
        </td>
        <td>
            {{ book.author }}
        </td>
        <td>
            {{ book.price }}
        </td>
        <td>
            <span>
                <router-link
                    :to="{
                        name: 'book.edit',
                        params: { id: book._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link>
                <button @click="deletePicture(book._id)" class="mt-2 btn btn-danger">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </span>
        </td>
    </tr>
    
  </tbody>
</table>
</template>

<script>
import PubCompanyService from "@/services/pubCompany.service";
import BookService from "@/services/book.service";
export default {
        data() {
            return {
                    pubCompanies: [],
                }
        },
        props: {
            books: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        emits: ["update:activeIndex"],
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async retrievePubCompany() {
                try {
                    this.pubCompanies = await PubCompanyService.getAll();
                } catch(error) {
                    console.log(error);
                }
            },
            getName(id) {
                let name;
                this.pubCompanies.forEach(item => {
                    if (item['_id'] === id) {
                        console.log(item['name']);
                        return name = item['name'];
                    }
                });
                return name;
            },
            async deletePicture(id) {
                if(confirm("Bạn muốn xóa sách này?")){
                    try {
                        await BookService.delete(id);
                        this.$router.push({ name: "bookhome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
                this.$router.push({ name: "bookhome" });
            } 
        },
        mounted() {
            this.retrievePubCompany();
        },
    };
</script>

<style>

</style>