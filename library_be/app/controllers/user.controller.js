const ApiError = require('../api-error');
const UserService = require('../services/user.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.lastname) {
        return next(new ApiError(400, "Last name cannot be empty."));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.create(req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating data."))
    }
}

//get all user in the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const userService = new UserService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await userService.findByName(name);
        } else {
            documents = await userService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "User not found."));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving user with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update cannot empty."));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "User cannot found to update"));
        }
        return res.send({
            message: "User was updated successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `An error while updating user with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(400, "User cannot found to delete"));
        }
        return res.send({
            message: "User was deleted successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete user with id=${req.params.id}`))
    }
}

exports.deleteAll = async (req, res, next) => {
    try {
        const userService = new UserService(MongoDB.client);
        const documentCount = userService.deleteAll();
        return res.send({
            message: `${documentCount} was deleted successfully!`
        })
    } catch (error) {
        return next(new ApiError(500, "Could not delete all user"));
    }
};

exports.login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Thông tin đăng nhập không được trống."));
    }
    try {
        const userService = new UserService(MongoDB.client);
        const document = await userService.findUser(req.body.email, req.body.password);
        if (!document)
            return res.send(null);
        else {
            req.session.user = document;
            req.session.authorized = true;
            return res.send(document);
        }
        return res.send(document);
    } catch (error) {
        console.log(req.body.email, req.body.password);
        return next(new ApiError(
            500,
            `Lỗi xảy ra khi xác minh đăng nhập ${error}`
        ));
    }
};