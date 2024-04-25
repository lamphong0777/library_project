<template>
    <Form
        @submit="submitStaff"
        :validation-schema="staffFormSchema"
        class="col-4 offset-4"
    >
        <div class="form-group">
            <label for="name">Tên nhân viên (Name)</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="staffLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="email">Email (Email)</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="staffLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="position">Chức vụ (Position)</label>
            <Field
                name="position"
                type="text"
                class="form-control"
                v-model="staffLocal.position"
            />
            <ErrorMessage name="position" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ (Address)</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="staffLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại (Phone)</label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="staffLocal.phone"
            />
            <ErrorMessage name="phone" class="error-feedback"></ErrorMessage>
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
    
    export default {
        components: {
            Form,
            Field,
            ErrorMessage,
        },
        emits: ["submit:staff"],
        props: {
            staff: { type: Object, required: true }
        },
        data() {
            const staffFormSchema = yup.object().shape({
                name: yup
                    .string()
                    .required("Tên không được trống."),
                email: yup
                    .string()
                    .required("Email không được trống."),
                position: yup
                    .string()
                    .required("Chức vụ không được trống."),
                address: yup
                    .string()
                    .required("Địa chỉ không được trống."),
                phone: yup
                    .string()
                    .required("Điện thoại không được trống"),
                
            });
            return {
                staffLocal: this.staff,
                staffFormSchema,
            };
        },
        methods: {
            submitStaff() {
                this.$emit("submit:staff", this.staffLocal);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>