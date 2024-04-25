<template>
    <Form
        @submit="submitPubCompany"
        :validation-schema="pubCompanyFormSchema"
        class="col-4 offset-4"
    >
        <div class="form-group">
            <label for="name">Tên nhà xuất bản (Name)</label>
            <Field
                name="name"
                type="text"
                class="form-control"
                v-model="pubCompanyLocal.name"
            />
            <ErrorMessage name="name" class="error-feedback"></ErrorMessage>
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
        emits: ["submit:pubCompany", "detele:pubCompany"],
        props: {
            pubCompany: { type: Object, required: true }
        },
        data() {
            const pubCompanyFormSchema = yup.object().shape({
                name: yup
                    .string()
                    .required("Tên không được trống."),
                
            });
            return {
                pubCompanyLocal: this.pubCompany,
                pubCompanyFormSchema,
                pubCompanies: [],
            };
        },
        methods: {
            submitPubCompany() {
                this.$emit("submit:pubCompany", this.pubCompanyLocal);
            },
        },
    };
</script>

<style scoped>
    @import "@/assets/form.css";
</style>