const { MongoClient, ServerApiVersion } = require('mongodb');
const { default: mongoose } = require('mongoose');
const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USERNAME}:${process.env.MONGO_ATLAS_PASSWORD}@cluster0.jthligq.mongodb.net/?retryWrites=true&w=majority`;
  


const handler = async (event) => {
  console.log("submit form handler:");
  const client = new MongoClient(uri);
  console.log("got client")

    try {
      console.log("entry");
      var id = new mongoose.Types.ObjectId();
      const data = JSON.parse(event.body);
      const clientPromise = client.connect();
      const connection = await clientPromise;

      const logsDB = connection.db("log");
      console.log("connected to log database");

      const pendingDB = connection.db("pending");
      console.log("connected to pending database");

      const scheduleDB = connection.db("schedule");
      console.log("connected to schedule database");

      const logsCollection = logsDB.collection("tutoring");
      console.log("connected to tutoring log table");

      const pendingCollection = pendingDB.collection("pending");
      console.log("connected to pending log table");
      
      const scheduleCollection = scheduleDB.collection("events");
      console.log("connected to event table");

      const secureCollection = scheduleDB.collection("sec_events");
      console.log("connected to secure event table");
      
      const pendingEntry = {
        _id: id,
        email: data.email,
      }

      const start = new Date(data.start);
      const end = new Date(data.end);
    

      const scheduleEntry = {
        _id: id,
        email: data.email,
        name: data.name,
        course: data.course,
        location: data.location,
        desc: data.desc ? data.desc : 'none',
        start: start,
        end: end,
        approved: false,
      }
      const secEntry = {
        _id: id,
        start: start,
        end: end,
      }

      const logEntry = {
        type: "insertion",
        table: "schedule/events\npending/pending\nschedule/sec_events",
        date: new Date(),
        entry: id,
      }


      var responseLog = logsCollection.insertOne(logEntry);
      console.log("successfully entered", logEntry ,"in log database");

      var responsePen = pendingCollection.insertOne(pendingEntry);     
      console.log("successfully entered", pendingEntry ,"in pending database");

      var responseSch = scheduleCollection.insertOne(scheduleEntry);
      console.log("successfully entered", scheduleEntry ,"in schedule database");

      var responseSec = secureCollection.insertOne(secEntry);
      console.log("successfully entered", secEntry ,"in sec_events database");


      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Log inserted successfully' })
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    } 
    
  }
  
  module.exports = { handler }
  

