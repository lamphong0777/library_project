const express = require("express");
const users = require("../controllers/user.controller");

const router = express.Router();

router.route("/")
    .get(users.findAll)
    .post(users.create)
    .delete(users.deleteAll)


router.route("/login")
    .post(users.login)

router.route("/:id")
    .get(users.findOne)
    .put(users.update)
    .delete(users.delete)

module.exports = router;