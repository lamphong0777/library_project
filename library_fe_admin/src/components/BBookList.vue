<template>
<div class="row">
    <div class="">
    <table class="table table-hover table-bordered text-center">
    <thead>
        <tr>
        <th scope="col">ID</th>
        <th scope="col">Ngày mượn</th>
        <th scope="col">Ngày trả</th>
        <th scope="col">Người mượn</th>
        <th scope="col">Sách</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Quản lý</th>
        </tr>
    </thead>
    <tbody>
        <tr 
            v-for="(item, index) in bBooks"
        >
            <td>{{ item._id }}</td>
            <td>{{ item.borrowedDate }}</td>
            <td>{{ item.returnDate }}</td>
            <td>{{ getUserName(item.userId) }}</td>
            <td>{{ getBookName(item.bookId) }}</td>
            <td>Đang mượn</td>
            <td>
            <span>
                <!-- <router-link
                    :to="{
                        name: 'bBook.edit',
                        params: { id: item._id},
                    }"
                >
                    <span class="mt-2 btn btn-warning me-2">
                        <i class="fas fa-edit"></i> Sửa
                    </span>
                </router-link> -->
                <button @click="deleteBBook(item._id)" class="mt-2 btn btn-danger">
                    <i class="fas fa-trash"></i> Xóa
                </button>
            </span>
        </td>
        </tr>
    </tbody>
</table>
    </div>
</div>
</template>

<script>
import BBookService from "@/services/bBook.service";
import BookService from "@/services/book.service";
import UserService from "@/services/user.service";
export default {
        props: {
            bBooks: { type: Array, default: [] },
            activeIndex: { type: Number, default: -1 },
        },
        data() {
            return {
                bookName: [],
                userName: [],
            }
        },
        methods: {
            updateActiveIndex(index) {
                this.$emit("update:activeIndex", index);
            },
            async deleteBBook(id) {
                if(confirm("Bạn muốn xóa đơn mượn này?")){
                    try {
                        await BBookService.delete(id);
                        this.$router.push({ name: "bBookHome" });
                    }catch(error) {
                        console.log(error);
                    }
                }
                this.$router.push({ name: "bBookHome" });
            },
            async getBook() {
                try {
                    this.bookName = await BookService.getAll();
                    console.log(this.bookName);  
                }catch(error) {
                    console.log(error);
                }
            },
            async getUser() {
                try {
                    this.userName = await UserService.getAll();
                    console.log(this.userName); 
                }catch(error) {
                    console.log(error);
                }
            },
            getBookName(id) {
                let name;
                //console.log(id);
                this.bookName.forEach(element => {
                    //console.log(element['_id']);
                    if (element['_id'] == id) {
                        return name = element['title'];
                    }
                });
                return name;
            },
            getUserName(id) {
                let name;
                //console.log(id);
                this.userName.forEach(element => {
                    //console.log(element['_id']);
                    if (element['_id'] == id) {
                        return name = element['firstname'] + ' ' + element['lastname'];
                    }
                });
                return name;
            }
        },
        mounted() {
            this.getBook();
            this.getUser();
        }
    };
</script>

<style>

</style>