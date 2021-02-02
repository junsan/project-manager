const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware

app.use(bodyParser.json());
app.use(cors());

const projects = require('./routes/api/projects');

app.use('/api/projects', projects);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is now starting at port ${port}`));
