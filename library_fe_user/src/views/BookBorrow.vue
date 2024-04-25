<template>
    <div v-if="id=='-1'" class="col-md-9 text-center"><h1>Bạn chưa đăng nhập</h1></div>
    <div v-else class="col-md-9 text-center"><h3>Sách đang mượn</h3>
        <table class="table table-hover table-bordered text-center">
            <thead>
                <tr>
                <th scope="col">ID</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Người mượn</th>
                <th scope="col">Sách</th>
                <th scope="col">Trạng thái</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="(item, index) in bookBorrow"
                >
                    <td>{{ item._id }}</td>
                    <td>{{ item.borrowedDate }}</td>
                    <td>{{ item.returnDate }}</td>
                    <td>{{ user.firstname+" "+user.lastname }}</td>
                    <td>{{ getNameBook(item.bookId) }}</td>
                    <td>Đang mượn</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import BBookService from "@/services/bBook.service.js";
import BookService from "@/services/book.service";
export default {
    data() {
        return {
            bookBorrow: [],
            user: {},
            books: [],
        }
    },
    props: {
        id: { type: String, required: true},
    },
    methods: {
        async GetBookBorrow() {
            this.user = JSON.parse(localStorage.getItem("user"));
            this.bookBorrow = await BBookService.getByUid(this.id);
            console.log(this.bookBorrow);
            console.log(this.id);
        },
        async GetAllBook() {
            this.books = await BookService.getAll();
        },
        getNameBook(id) {
            let bookName;
            this.books.forEach(item => {
                if (item['_id'] === id) {
                    return bookName = item['title'];
                }
            });
            return bookName;
        }
    },
    mounted() {
        this.GetBookBorrow();
        this.GetAllBook();
    }
}

</script>