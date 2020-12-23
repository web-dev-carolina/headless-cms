const MongoClient = require('mongodb').MongoClient;

const dbConnectionUrl = "mongodb+srv://admin:WebDev1!@cluster0.0eoiv.mongodb.net/test1?retryWrites=true&w=majority";

function initialize(dbName, dbCollectionName, successCallback, failureCallback) {
    MongoClient.connect(dbConnectionUrl, function(err, dbInstance) {
        if (err) {
            console.log(`[MongoDB connection] ERROR: ${err}`);
            failureCallback(err); // this should be "caught" by the calling function
        } else {
            const dbObject = dbInstance.db(dbName);
            const dbCollection = dbObject.collection(dbCollectionName);

            console.log("[MongoDB connection] SUCCESS");
            successCallback(dbCollection);
        }
    });
}

module.exports = { initialize };