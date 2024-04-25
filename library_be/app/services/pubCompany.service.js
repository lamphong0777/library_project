const { ObjectId } = require('mongodb');

class PubCompanyService {
    constructor(client) {
        this.PubCompany = client.db().collection("nhaxuatban");
    }
    extractPubCompanyData(payload) {
        const pubCompany = {
            name: payload.name,
            address: payload.address,
        };
        // Remove undefine fields
        Object.keys(pubCompany).forEach(
            (key) => pubCompany[key] == undefined && delete pubCompany[key]
        );
        return pubCompany;
    }

    async create(payload) {
        const pubCompany = this.extractPubCompanyData(payload);
        const result = await this.PubCompany.findOneAndUpdate(
            pubCompany,
            { $set: { } },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.PubCompany.find(filter);
        return await cursor.toArray();
    }

    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: "i" },
        });
    }

    async findById(id) {
        return await this.PubCompany.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractPubCompanyData(payload);
        const result = this.PubCompany.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.PubCompany.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.PubCompany.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = PubCompanyService;