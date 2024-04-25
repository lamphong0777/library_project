<template>
    <Form
        @submit="submitUser"
        :validation-schema="userFormSchema"
        class="col-4 offset-4"
    >
        <div class="form-group">
            <label for="firstname">Họ lót (First name)</label>
            <Field
                name="firstname"
                type="text"
                class="form-control"
                v-model="userLocal.firstname"
            />
            <ErrorMessage name="firstname" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="lastname">Tên (Last name)</label>
            <Field
                name="lastname"
                type="text"
                class="form-control"
                v-model="userLocal.lastname"
            />
            <ErrorMessage name="lastname" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="email">Email (Email)</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="userLocal.email"
            />
            <ErrorMessage name="email" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="sex">Giới tính (Sex)</label>
            <select name="sex" id="sex" v-model="userLocal.sex" class="form-select">
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
            </select>
        </div>
        <div class="form-group">
            <label for="dayofbirth">Ngày sinh (Day of birth)</label>
            <Field
                name="dayofbirth"
                type="date"
                class="form-control"
                v-model="userLocal.dayofbirth"
            />
            <ErrorMessage name="dayofbirth" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="address">Địa chỉ (Address)</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="userLocal.address"
            />
            <ErrorMessage name="address" class="error-feedback"></ErrorMessage>
        </div>
        <div class="form-group">
            <label for="phone">Điện thoại (Phone)</label>
            <Field
                name="phone"
                type="text"
                class="form-control"
                v-model="userLocal.phone"
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
        emits: ["submit:user"],
        props: {
            user: { type: Object, required: true }
        },
        data() {
            const userFormSchema = yup.object().shape({
                firstname: yup
                    .string()
                    .required("Họ lót được trống."),
                lastname: yup
                    .string()
                    .required("Tên không được trống."),
                email: yup
                    .string()
                    .required("Email không được trống."),
                address: yup
                    .string()
                    .required("Địa chỉ không được trống."),
                phone: yup
                    .string()
                    .required("Điện thoại không được trống"),
                
            });
            return {
                userLocal: this.user,
                userFormSchema,
            };
        },
        methods: {
            submitUser() {
                this.$emit("submit:user", this.userLocal);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>