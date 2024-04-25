const express = require('express');
const cors = require('cors');
const bookRouter = require("./app/routes/book.route");
const pubCompanyRouter = require("./app/routes/pubCompany.route");
const userRouter = require("./app/routes/user.route");
const staffRouter = require("./app/routes/staff.route");
const borrowedBookRouter = require("./app/routes/borrowedbook.route");
const ApiError = require("./app/api-error");
//session
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(cors());

//use session
app.use(session({
    secret:'this_is_my_secret',
    cookie:{
        sameSite: 'strict',
    }
}))

app.get("/", (req, res) => {
    res.send("Welcome library web!");
});

app.use("/api/books/", bookRouter);
app.use("/api/pubCompany/", pubCompanyRouter);
app.use("/api/users/", userRouter);
app.use("/api/staffs/", staffRouter);
app.use("/api/borrow/", borrowedBookRouter);

app.use((req, res, next) => {
    return next (new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    });
});

module.exports = app;