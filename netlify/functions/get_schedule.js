// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority`;
  


const handler = async () => {
  console.log("get secure schedule handler:");
  const client = new MongoClient(uri);
  console.log("got client");
  console.log(uri);

  try {
    console.log("hello try block")
    let today = new Date();
    today.setUTCMilliseconds(0);
    today.setUTCSeconds(0);
    today.setUTCMinutes(0);
    today.setUTCHours(0);

    let lastday = today;
    lastday.setUTCMilliseconds(0);
    lastday.setUTCSeconds(0);
    lastday.setUTCMinutes(0);
    lastday.setUTCHours(0);
    lastday = lastday.setDate(lastday.getDate() + 14);
    lastday = new Date(lastday);
    console.log("created dates");

    const clientPromise = client.connect();
    const connection = await clientPromise;

    const scheduleDB = connection.db("schedule");
    console.log("connected to schedule database");
    const scheduleCollection = scheduleDB.collection("sec_events");
    console.log("connected to sec_event log table");

    const query = {
      $or: [
        { start: { $gt: today } },
        { end: { $gt: today } },
        { start: { $lt: lastday } },
        { end: { $lt: lastday } },
      ]
    };
    const events = await scheduleCollection.find(query).toArray();
    console.log(events);
    console.log("success")
    client.close();
    return {
      statusCode: 200,
      body: JSON.stringify(events),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  } 
}

module.exports = { handler }
