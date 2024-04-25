const ApiError = require('../api-error');
const BookService = require('../services/book.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.title) {
        return next(new ApiError(400, "Title cannot be empty."));
    }
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.create(req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating data."))
    }
}

//get all book in the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const bookService = new BookService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await bookService.findByName(name);
        } else {
            documents = await bookService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Book not found."));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving book with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update cannot empty."));
    }
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "Book cannot found to update"));
        }
        return res.send({
            message: "Book was updated successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `An error while updating book with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const document = await bookService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Book cannot found to delete"));
        }
        return res.send({
            message: "Book was deleted successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req, res, next) => {
    try {
        const bookService = new BookService(MongoDB.client);
        const documentCount = bookService.deleteAll();
        return res.send({
            message: `${documentCount} was deleted successfully!`
        })
    } catch (error) {
        return next(new ApiError(500, "Could not delete all book"));
    }
}