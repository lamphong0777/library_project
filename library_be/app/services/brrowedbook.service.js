const { ObjectId } = require('mongodb');

class BorrowedBookService {
    constructor(client) {
        this.BorrowedBook = client.db().collection('theodoimuonsach');
    }
    extractBorrowedBookData(payload) {
        const borrowedBook = {
            userId: payload.userId,
            bookId: payload.bookId,
            borrowedDate: payload.borrowedDate,
            returnDate: payload.returnDate,
        };
        // Remove undefine fields
        Object.keys(borrowedBook).forEach(
            (key) => borrowedBook[key] === undefined && delete borrowedBook[key]
        );
        return borrowedBook;
    }

    async create(payload) {
        const borrowedBook = this.extractBorrowedBookData(payload);
        const result = await this.BorrowedBook.findOneAndUpdate(
            borrowedBook,
            { $set: {} },
            { returnDocument: "after", upsert: true }
        );
        return result;
    }

    async find(filter) {
        const cursor = await this.BorrowedBook.find(filter);
        return await cursor.toArray();
    }

    async findByUserId(UserId) {
        return await this.find({
            // userId: { $regex: new RegExp(UserId), $options: "i" },
            userId: UserId
        });
    }

    async findById(id) {
        return await this.BorrowedBook.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractBorrowedBookData(payload);
        const result = this.BorrowedBook.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return result;
    }

    async delete(id) {
        const result = await this.BorrowedBook.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result;
    }

    async deleteAll() {
        const result = await this.BorrowedBook.deleteMany({});
        return result.deleteCount;
    }

}

module.exports = BorrowedBookService;