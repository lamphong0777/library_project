<template>
    <div class="page container col-md-9 mb-3">
        <h3 class="text-center"><b>Đăng ký</b></h3>
        <Form
        @submit="submitUser(userInfo.address,userInfo.lastname, userInfo.phone, userInfo.password, userInfo.dayofbirth, userInfo.sex, userInfo.email,userInfo.firstname)"
        :validation-schema="loginFormSchema" 
        class="row"
        >
        <div class="col-md-6">
            <div id="" class="form-group">
            <label for="email">Email:</label>
            <Field
                name="email"
                type="email"
                class="form-control"
                v-model="userInfo.email"
            />
            <ErrorMessage name="email" class="error-feedback"/>
        </div>
        <div id="" class="form-group">
            <label for="password">Mật khẩu:</label>
            <Field
                name="password"
                type="password"
                class="form-control"
                v-model="userInfo.password"
            />
            <ErrorMessage name="password" class="error-feedback"/>
        </div>
        <div id="" class="form-group">
            <label for="confirmPassword">Xác nhận mật khẩu:</label>
            <Field
                name="confirmPassword"
                type="password"
                class="form-control"
                v-model="userInfo.confirmPassword"
            />
            <ErrorMessage name="confirmPassword" class="error-feedback"/>
        </div>
        <div id="" class="form-group">
            <label for="address">Địa chỉ:</label>
            <Field
                name="address"
                type="text"
                class="form-control"
                v-model="userInfo.address"
            />
            <ErrorMessage name="address" class="error-feedback"/>
        </div>
        <div id="" class="form-group">
            <label for="sex">Giới tính:</label>
            <!-- <Field
                name="sex"
                type="text"
                class="form-control"
                v-model="userInfo.sex"
            /> -->
            <!-- <ErrorMessage name="sex" class="error-feedback"/> -->
            <select class="form-select" 
                    aria-label="Default select example" 
                    v-model="userInfo.sex"
                    name="sex"
            >
                <option value="nam"> Nam</option>
                <option value="nu"> Nữ</option>
            </select>
        </div>
        </div>
        <div class="col-md-6">
            <div id="" class="form-group">
            <label for="dayofbirth">Ngày Sinh:</label>
            <Field
                name="dayofbirth"
                type="date"
                class="form-control"
                v-model="userInfo.dayofbirth"
            />
            <ErrorMessage name="dayofbirth" class="error-feedback"/>
            </div>
            <div id="" class="form-group">
            <label for="firstname">Họ lót:</label>
            <Field
                name="firstname"
                type="text"
                class="form-control"
                v-model="userInfo.firstname"
            />
            <ErrorMessage name="firstname" class="error-feedback"/>
            </div>
            <div id="" class="form-group">
            <label for="lastname">Tên:</label>
            <Field
                name="lastname"
                type="text"
                class="form-control"
                v-model="userInfo.lastname"
            />
            <ErrorMessage name="lastname" class="error-feedback"/>
            </div>
            <div id="" class="form-group">
            <label for="phone">Số điện thoại:</label>
            <Field
                name="phone"
                type="phone"
                class="form-control"
                v-model="userInfo.phone"
            />
            <ErrorMessage name="phone" class="error-feedback"/>
            </div>
        </div>
        <div class="form-group mt-2">
            <button id="submit" class="btn btn-success">Đăng Ký</button>
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
                .min(5, 'Mật khẩu có tối thiểu 5 ký tự'),
            'confirmPassword': yup
                .string()
                .required("Mật khẩu không được trống."),
            'address': yup
                .string()
                .required("Địa chỉ không được trống.")
                .min(5, 'Địa chỉ có tối thiểu 5 ký tự'),
            'firstname': yup
                .string()
                .required("Họ lót không được trống."),
            'lastname': yup
                .string()
                .required("Tên không được trống.")
                .min(1, 'Tên có tối thiểu 1 ký tự'),
            'phone': yup
                .string()
                .required("Số điện thoại không được trống."),
        });
        return{
            userInfo: {},
            // LogStatus: false,
            loginFormSchema,
        }
    },

    methods: {
        async submitUser(address,lastname, phone, password, dayofbirth, sex, email,firstname) {
            try {
                //Thiếu onSubmit là hiển thị Error message
                this.user = await UsersService.create({
                    address,
                    lastname,
                    phone,
                    password,
                    dayofbirth,
                    sex,
                    email,
                    firstname,
                });
                console.log(this.user);
                if(this.user){
                    alert("Đăng ký thành công!");
                    this.$router.push("/login");
                } else {
                    alert("Xảy ra lỗi khi đăng ký.");
                }
                
            } catch (error) {
                console.error();
                alert("Xảy ra lỗi khi đăng ký.");
            }
        },
    },
}
</script>


<style scoped>
@import "@/assets/form.css";

.container {
    background-color: 	#00FF7F;
    padding: 20px;
    border-radius: 20px;
}
.page{
    max-width: 900px;
    margin: auto;
    margin-top: 30px;
}

</style>