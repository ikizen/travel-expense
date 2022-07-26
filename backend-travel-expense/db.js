import { MongoClient as mongo } from "mongodb";

const url = "mongodb://localhost:27017";

let db;

const connect = () => {
    mongo.connect(url, {}, (err, client) => {
        if (err) {
            console.error(err);
            return;
        }
        db = client.db("days");
    });
};

const getDB = () => db;
export { connect, getDB };