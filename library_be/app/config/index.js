const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/library_project",
    }
};

module.exports = config;