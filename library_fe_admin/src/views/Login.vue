<template>
    <div class="page container">
        <h4 class="text-center">Chào mừng bạn đến với Quản lý thư viện</h4>
        <h3 class="text-center"><b>Đăng nhập</b></h3>
        <p class="text-center">Hãy đăng nhập để sử dụng các chức năng quản lý</p>
        <hr>
        <Form
        @submit="submitStaff"
        :validation-schema="loginFormSchema" 
    >
        <div id="email-area" class="form-group">
            <label for="email">Email:</label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="staffLogin.email"
            />
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div id="password-area" class="form-group">
            <label for="password">Mật khẩu:</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="staffLogin.password"
            />
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div class="form-group">
            <button id="submit" class="btn btn-success">Đăng nhập</button>
        </div>
    </Form>
    </div>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
import StaffsService from "@/services/staff.service.js";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    data(){
        const loginFormSchema = yup.object().shape({
            'email': yup
                .string()
                .required("Email không được trống."),
            'password': yup
                .string()
                .required("Mật khẩu không được trống.")
                .min(5,'Mật khẩu có tối thiểu 5 ký tự'),
        });
        return{
            staff: [],
            localStaff: [],
            staffLogin: [],
            // LogStatus: false,
            loginFormSchema,
        }
    },

    methods: {
        async submitStaff() {
            try {
                //Thiếu onSubmit là hiển thị Error message
                this.staff = await StaffsService.login(this.staffLogin.email, this.staffLogin.password);
                console.log(this.staff);
                if(this.staff){
                    alert("Đăng nhập thành công!");
                // this.LogStatus = true;
                localStorage.setItem("staff", JSON.stringify(this.staff));
                this.localStaff = (JSON.parse(localStorage.getItem("staff")));
                // this.$router.push("/home");
                // window.location.reload();
                    this.$router.go("bookhome");
                } else {
                    throw new Error("Không đúng tài khoản hoặc mật khẩu");
                }
                
            } catch (error) {
                console.error();
                alert("Tài khoản hoặc mật khẩu không đúng.");
            }
        },

        // Lấy danh sách các tài khoản
        async retrieveStaffs() {
            try {
                this.staffs = await StaffsService.getAll();
                console.log(this.staffs);
            } catch (error) {
                console.error();
            }
        },
    },

    // Tự cập nhật danh sách tài khoản khi load trang
    mounted() {
        this.retrieveStaffs();
    },
}
</script>


<style scoped>
@import "@/assets/form.css";
.page{
    max-width: 600px;
    margin: auto;
    margin-top: 30px;
}

.page h4{
    margin-bottom: 30px;
}

#email-area{
    margin-bottom: 40px;
}

#password-area{
    margin-bottom: 40px;
}
.container {
    background-color: aqua;
    padding: 20px;
    border-radius: 20px;
}
</style>