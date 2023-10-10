const jwtDecode = require('jwt-decode');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority`;
  
const client = new MongoClient(uri);

const handler = async (event) => {
    console.log("get personal schedule handler");
    const jwt = event.queryStringParameters.jwt;
    if (jwt==="undefined") {
        return {
            statusCode: 204,
            body: JSON.stringify({ message: 'Did not query database for undefined user' })
        };
    }
    try {
        //conect to database
        const clientPromise = client.connect();
        const connection = await clientPromise;
        const scheduleDB = connection.db("schedule");
        const scheduleCollection = scheduleDB.collection("events");

        //query dsatabse correctly
        console.log(jwtDecode(jwt).email)
        let query = { email: { $eq: jwtDecode(jwt).email }};
        //load into events
        const events = await scheduleCollection.find(query).toArray();
        console.log(events);
        //return
        return {
            statusCode: 200,
            body: JSON.stringify(events),
            headers: {
                'Content-Type': 'application/json',
            }
        } 
    }
    catch (error) {
        return { statusCode: 500, body: error.toString() };
    }
}

module.exports = { handler }