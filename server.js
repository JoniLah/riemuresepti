const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/api/auth');
const recipes = require('./routes/api/recipes');
const tags = require('./routes/api/tags');
const users = require('./routes/api/users');
const upload = require('./routes/api/upload');
const config = require('./config/keys');

app.use(express.json({ extended: false }));
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI || config)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.log(err.mesage);
        process.exit(1); // Exit process upon failure
    });

app.use("/api/auth", auth);
app.use("/api/recipes", recipes);
app.use("/api/tags", tags);
app.use("/api/users", users);
app.use('/api/upload', upload);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = server;