<template>
    <div class="col-md-9">
        <div class="row">
            <div class="col-md-4">
                <img :src="book.imageUrl" alt="" width="100%">
            </div>
            <div class="col-md-8">
                <h3 class="text-start text-uppercase detail-title">{{ book.title }}</h3>
                <p>Tác giả: {{ book.author }}</p>
                <p>Năm xuất bản: {{ book.pubYear }}</p>
                <p>Số lượng: {{ book.quantity }}</p>
                <p>Mô tả:</p>
                <p>{{ book.description }}</p>
                <div v-if="getUser">
                    <div class="d-flex"><button class="btn btn-success mb-3">Thêm vào yêu thích</button></div>
                    <div class="d-flex row">
                        <Form @submit="borrowBook(borrowItem.borrowedDate, borrowItem.returnDate, getUser._id, book._id)"
                            :validation-schema="BorrowFormSchema"
                        >
                            <input type="hidden" v-model="borrowItem.userId" value="{{getUser._id}}">
                            <input type="hidden" v-model="borrowItem.bookId" value="{{book._id}}">
                            <div class="form-group">
                                <label for="borrowedDate">Ngày mượn sách:</label>
                                <Field
                                    name="borrowedDate"
                                    type="date"
                                    class="form-control"
                                    v-model="borrowItem.borrowedDate"
                                />
                                <ErrorMessage name="borrowedDate" class="error-feedback" />
                            </div>
                            <!-- <label for="borrowedDate">Ngày Mượn</label><br>
                            <input type="date" name="borrowedDate" value="" v-model="borrowItem.borrowedDate"><br> -->
                            <!-- <label for="returnDate">Ngày Trả</label><br>
                            <input type="date" name="returnDate" value="" v-model="borrowItem.returnDate"><br> -->
                            <hr>
                            <div class="form-group">
                                <label for="returnDate">Ngày dự kiến trả sách:</label>
                                <Field
                                    name="returnDate"
                                    type="date"
                                    class="form-control"
                                    v-model="borrowItem.returnDate"
                                />
                                <ErrorMessage name="returnDate" class="error-feedback" />
                                <div v-if="showReturnDateError" class="error-feedback">Ngày dự kiến trả không được quá 14 ngày sau ngày mượn.</div>
                            </div>
                            <button type="submit" class="btn btn-warning mt-2">Mượn</button>
                        </Form>
                    </div>
                </div>
                <div v-else>
                    <h4 style="color:red">Bạn cần đăng nhập để mượn sách</h4>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import BookService from "@/services/book.service.js";
import BBookService from "@/services/bBook.service";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        id: { type: String, required: true},
    },
    data() {
        const BorrowFormSchema = yup.object().shape({
        borrowedDate: yup.date().required("Thiếu ngày mượn sách"),
        returnDate: yup
            .date()
            .min(yup.ref("borrowedDate"), "Ngày dự kiến trả không được nhỏ hơn ngày sau ngày mượn")
            .required("Thiếu ngày dự kiến trả sách"),
        });
        return {
            book: {},
            getUser: {},
            borrowItem: {},
            showReturnDateError: false,
            BorrowFormSchema,
            returnDate: "",
        }
    },
    methods: {
        async retrieveBook() {
            try {
                this.book = await BookService.get(this.id);
            } catch(error) {
                    console.log(error);
                    this.$router.push({
                        name: "notFount",
                        params: {
                            pathMatch: this.$route.path.split("/").slice(1)
                        },
                        query: this.$route.query,
                        hash: this.$route.hash,
                    });
                }
        },
        checkUserExist() {
            this.getUser = (JSON.parse(localStorage.getItem("user")));
        },
        async borrowBook(borrowedDate, returnDate, userId, bookId) {
            try {
                await BBookService.create({ userId, bookId, borrowedDate, returnDate });
                alert("Mượn sách thành công!");
            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.retrieveBook();
        this.checkUserExist();
    }
}
</script>
<style>
.error-feedback {
    color: red;
}
</style>