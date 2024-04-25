const express = require("express");
const borrowedBooks = require("../controllers/borrowedbook.controller");

const router = express.Router();

router.route("/")
    .get(borrowedBooks.findAll)
    .post(borrowedBooks.create)
    .delete(borrowedBooks.deleteAll)

router.route("/findByUid/:id")
    .get(borrowedBooks.findByUserId)

router.route("/:id")
    .get(borrowedBooks.findOne)
    .put(borrowedBooks.update)
    .delete(borrowedBooks.delete)

module.exports = router;