const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');

const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority`;
  

const handler = async () => {
    console.log("computer record handler");
    const client = new MongoClient(uri);
    try {
        //conect to database
        const clientPromise = client.connect();
        const connection = await clientPromise;
        const tttDB = connection.db("tictactoe");
        const gameCollection = tttDB.collection("games");

        //query dsatabse correctly
        //load into events
        let query = { "game": { $regex: /^.{1}f/ }};
        const games = await gameCollection.find(query).toArray();
        await client.close();

        let wins = getCompWins(games);
        let losses = getCompLosses(games); //pretty much can be 0
        let draws = getDraws(games);
        console.log(`${wins}\t${losses}\t${draws}\n   W\t    L\t    D`)
        const record = {
            wins: wins,
            losses: losses,
            draws: draws,
        }

        return {
            statusCode: 200,
            body: JSON.stringify(record),
            headers: {
                'Content-Type': 'application/json',
            }
        } 
    }
    catch (error) {
        await client.close();
        console.log("properly close connection in catch block");
        return { statusCode: 500, body: error.toString() };
    } 
}

module.exports = { handler }