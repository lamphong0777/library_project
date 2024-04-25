const ApiError = require('../api-error');
const PubCompanyService = require('../services/pubCompany.service');
const MongoDB = require('../utils/mongodb.util');

exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name cannot be empty."));
    }
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const document = await pubCompanyService.create(req.body);
        console.log(document);
        res.send(document);
    } catch (error) {
        console.log(error.message);
        return next(new ApiError(500, "An error occurred while creating data."))
    }
}

//get all pubCompany in the database
exports.findAll = async (req, res, next) => {
    let documents = [];
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const { name } = req.query;
        if (name) {
            documents = await pubCompanyService.findByName(name);
        } else {
            documents = await pubCompanyService.find({});
        }
    } catch (error) {
        return next(new ApiError(500, "An error occurred while retrieving data"));
    }
    return res.send(documents);
}

exports.findOne = async (req, res, next) => {
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const document = await pubCompanyService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "PubCompany not found."));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving pubCompany with id=${req.params.id}`));
    }
}

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update cannot empty."));
    }
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const document = await pubCompanyService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(400, "PubCompany cannot found to update"));
        }
        return res.send({
            message: "PubCompany was updated successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `An error while updating pubCompany with id=${req.params.id}`));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const document = await pubCompanyService.delete(req.params.id);
        if (!document) {
            return next(new ApiError(400, "PubCompany cannot found to delete"));
        }
        return res.send({
            message: "PubCompany was deleted successfully."
        });
    } catch (error) {
        return next(new ApiError(500, `Could not delete pubCompany with id=${req.params.id}`))
    }
}

exports.deleteAll = async(req, res, next) => {
    try {
        const pubCompanyService = new PubCompanyService(MongoDB.client);
        const documentCount = pubCompanyService.deleteAll();
        return res.send({
            message: `${documentCount} was deleted successfully!`
        })
    } catch (error) {
        return next(new ApiError(500, "Could not delete all pubCompany"));
    }
}