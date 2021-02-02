const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const router = express.Router();

const uri = "mongodb+srv://junsan:12345@cluster0.2uobg.mongodb.net/project_manager?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true,  useUnifiedTopology: true });

var projects = [];

client.connect(err => {
    const collection = client.db("project_manager").collection("projects");
    collection.find({}).toArray()
    .then(items => {
        projects = items;
    }); 
    // perform actions on the collection object
});


router.get('/', (req, res) => {
    res.send(projects);
})

module.exports = router;
