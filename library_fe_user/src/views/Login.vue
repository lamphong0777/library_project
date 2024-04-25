<template>
    <div class="page container col-md-9 mb-3">
        <h3 class="text-center"><b>Đăng nhập</b></h3>
        <p class="text-center">Hãy đăng nhập để sử có thể mượn sách</p>
        <Form
        @submit="submitUser"
        :validation-schema="loginFormSchema" 
    >
        <div id="email-area" class="form-group">
            <label for="email">Email:</label>
            <Field
                name="email"
                type="text"
                class="form-control"
                v-model="userLogin.email"
            />
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div id="password-area" class="form-group">
            <label for="password">Mật khẩu:</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="userLogin.password"
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
import UsersService from "@/services/user.service.js";

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
            user: [],
            localUser: [],
            userLogin: [],
            // LogStatus: false,
            loginFormSchema,
        }
    },

    methods: {
        async submitUser() {
            try {
                //Thiếu onSubmit là hiển thị Error message
                this.user = await UsersService.login(this.userLogin.email, this.userLogin.password);
                console.log(this.user);
                if(this.user){
                    alert("Đăng nhập thành công!");
                    // this.LogStatus = true;
                    localStorage.setItem("user", JSON.stringify(this.user));
                    this.localUser = (JSON.parse(localStorage.getItem("user")));
                    // this.$router.push("/");
                    // window.location.reload();
                    this.$router.go("/");
                    //this.$router.push({name: "bookHome"});
                } else {
                    alert("Tài khoản hoặc mật khẩu không đúng.");
                }
            } catch (error) {
                console.error();
                alert("Tài khoản hoặc mật khẩu không đúng.");
            }
        },

        // Lấy danh sách các tài khoản
        async retrieveUsers() {
            try {
                this.users = await UsersService.getAll();
                console.log(this.users);
            } catch (error) {
                console.error();
            }
        },
    },

    // Tự cập nhật danh sách tài khoản khi load trang
    mounted() {
        this.retrieveUsers();
    },
}
</script>


<style scoped>
@import "@/assets/form.css";

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
    background-color: #00FF7F;
    padding: 20px;
    border-radius: 20px;
}
.page{
    max-width: 600px;
    margin: auto;
    margin-top: 30px;
}
</style>