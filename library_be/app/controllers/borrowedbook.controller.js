const ApiError = require('../api-error');
const BorrowedBookService = require('../services/brrowedbook.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.userId) {
        return next(new ApiError(400, "userId cannot be empty."));
    }
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const document = await borrowedBorrowedBookService.create(req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating data."))
    }
}

//get all borrowedBorrowedBook in the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const { UserId } = req.body;
        if (UserId) {
            documents = await borrowedBorrowedBookService.findByUserId(UserId);
        } else {
            documents = await borrowedBorrowedBookService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const document = await borrowedBorrowedBookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "BorrowedBook not found."));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving borrowedBorrowedBook with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update cannot empty."));
    }
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const document = await borrowedBorrowedBookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "BorrowedBook cannot found to update"));
        }
        return res.send({
            message: "BorrowedBook was updated successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `An error while updating borrowedBorrowedBook with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const document = await borrowedBorrowedBookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(400, "BorrowedBook cannot found to delete"));
        }
        return res.send({
            message: "BorrowedBook was deleted successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete borrowedBorrowedBook with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req, res, next) => {
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        const documentCount = borrowedBorrowedBookService.deleteAll();
        return res.send({
            message: `${documentCount} was deleted successfully!`
        })
    } catch (error) {
        return next(new ApiError(500, "Could not delete all borrowedBorrowedBook"));
    }
}

exports.findByUserId = async (req, res, next) => {
    let documents = [];
    try {
        const borrowedBorrowedBookService = new BorrowedBookService(MongoDB.client);
        // const UserId = req.params.id;
        documents = await borrowedBorrowedBookService.findByUserId(req.params.id);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}