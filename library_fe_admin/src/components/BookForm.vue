<template>
    <Form
        @submit="submitBook"
        :validation-schema="bookFormSchema"
        class="col-4 offset-4"
    >
        <div class="form-group">
            <label for="title">Tên sách (Title)</label>
            <Field
                name="title"
                type="text"
                class="form-control"
                v-model="bookLocal.title"
            />
            <ErrorMessage name="title" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="imageUrl">Link ảnh (imageUrl)</label>
            <Field
                name="imageUrl"
                type="text"
                class="form-control"
                v-model="bookLocal.imageUrl"
            />
            <ErrorMessage name="imageUrl" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="description">Mô tả (Description)</label>
            <Field
                as="textarea"
                rows="5"
                name="description"
                type="text"
                class="form-control"
                v-model="bookLocal.description"
            />
            <ErrorMessage name="description" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="price">Giá (Price)</label>
            <Field
                name="price"
                type="text"
                class="form-control"
                v-model="bookLocal.price"
            />
            <ErrorMessage name="price" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng (Quantity)</label>
            <Field
                name="quantity"
                type="text"
                class="form-control"
                v-model="bookLocal.quantity"
            />
            <ErrorMessage name="quantity" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="pubCompanyId">Nhà Xuất bản (pubCompany)</label>
            <!-- <Field
                name="pubCompanyId"
                type="text"
                class="form-control"
                v-model="bookLocal.pubCompanyId"
            />
            <ErrorMessage name="pubCompanyId" class="error-feedback"></ErrorMessage> -->
            <select class="form-select" 
                    aria-label="Default select example" 
                    v-model="bookLocal.pubCompanyId"
                    name="pubCompanyId"
            >
                <option v-for="(item, index) in pubCompanies"
                :value="item._id"
                > {{ item.name }}</option>
            </select>
        </div>

        <div class="form-group">
            <label for="pubYear">Năm xuất bản (Title)</label>
            <Field
                name="pubYear"
                type="text"
                class="form-control"
                v-model="bookLocal.pubYear"
            />
            <ErrorMessage name="pubYear" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <label for="author">Tác giả (Title)</label>
            <Field
                name="author"
                type="text"
                class="form-control"
                v-model="bookLocal.author"
            />
            <ErrorMessage name="author" class="error-feedback"></ErrorMessage>
        </div>

        <div class="form-group">
            <button class="btn btn-primary mt-3">Lưu
                <i class="fa-solid fa-floppy-disk"></i>
            </button>
        </div>
    </Form>
</template>

<script>
    import * as yup from "yup";
    import { Form, Field, ErrorMessage } from "vee-validate";
    import PubCompanyService from "@/services/pubCompany.service";
    
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:book", "detele:book"],
        props: {
            book: { type: Object, required: true }
        },
        data() {
            const bookFormSchema = yup.object().shape({
                title: yup
                    .string()
                    .required("Tên sách không được trống."),
                imageUrl: yup
                    .string()
                    .required("Ảnh không được trống."),
                description: yup
                    .string()
                    .required("Mô tả không được trống.")
                    .min(2, "Mô tả ít nhất 2 ký tự"),
                price: yup
                    .string()
                    .required("Giá không được trống."),
                quantity: yup
                    .string()
                    .required("Số lượng không được trống."),
                pubYear: yup
                    .string()
                    .required("Năm xuất bản không được trống."),
                author: yup
                    .string()
                    .required("Tác giả không được trống."),
            });
            return {
                bookLocal: this.book,
                bookFormSchema,
                pubCompanies: [],
            };
        },
        methods: {
            submitBook() {
                this.$emit("submit:book", this.bookLocal);
            },
            async retrievePubCompany() {
                try {
                    this.pubCompanies = await PubCompanyService.getAll();
                } catch(error) {
                    console.log(error);
                }
            },
        },
        mounted() {
            this.retrievePubCompany();
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>