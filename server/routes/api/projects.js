const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

async function connectDb() {
    const uri = "mongodb+srv://junsan:12345@cluster0.2uobg.mongodb.net/project_manager?retryWrites=true&w=majority";
    const client = await mongodb.MongoClient.connect(uri, { useNewUrlParser: true,  useUnifiedTopology: true });

    return client.db("project_manager").collection("projects");
}

router.get('/', async (req, res) => {
    const projects = await connectDb();
    res.send(await projects.find().toArray());
})

router.post('/', async (req, res) => {
    const projects = await connectDb();
    await projects.insertOne({name: req.body.name, tasks: req.body.tasks, created_at: new Date()});
    res.status(201).send('Added');
});

router.delete('/:id', async (req, res) => {
    const projects = await connectDb();
    await projects.deleteOne({_id: mongodb.ObjectID(req.params.id)});
    res.status(200).send('Deleted');
});


module.exports = router;
