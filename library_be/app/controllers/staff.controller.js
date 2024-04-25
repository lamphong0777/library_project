const ApiError = require('../api-error');
const StaffService = require('../services/staff.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty."));
    }
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.create(req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        return next(new ApiError(500, "An error occurred while creating data."))
    }
}

//get all staff in the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const staffService = new StaffService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await staffService.findByName(name);
        } else {
            documents = await staffService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Staff not found."));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving staff with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update cannot empty."));
    }
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "Staff cannot found to update"));
        }
        return res.send({
            message: "Staff was updated successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `An error while updating staff with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Staff cannot found to delete"));
        }
        return res.send({
            message: "Staff was deleted successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete staff with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req, res, next) => {
    try {
        const staffService = new StaffService(MongoDB.client);
        const documentCount = staffService.deleteAll();
        return res.send({
            message: `${documentCount} was deleted successfully!`
        })
    } catch (error) {
        return next(new ApiError(500, "Could not delete all staff"));
    }
}

exports.login = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Thông tin đăng nhập không được trống."));
    }
    try {
        const staffService = new StaffService(MongoDB.client);
        const document = await staffService.findUser(req.body.email, req.body.password);
        if (!document)
            return res.send(null);
        else {
            req.session.staff = document;
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