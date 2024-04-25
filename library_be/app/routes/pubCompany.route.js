const express = require("express");
const pubCompanies = require("../controllers/pubcompany.controller");

const router = express.Router();

router.route("/")
    .get(pubCompanies.findAll)
    .post(pubCompanies.create)
    .delete(pubCompanies.deleteAll)

router.route("/:id")
    .get(pubCompanies.findOne)
    .put(pubCompanies.update)
    .delete(pubCompanies.delete)

module.exports = router;