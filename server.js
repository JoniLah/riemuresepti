const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/api/auth');
const recipes = require('./routes/api/recipes');
const tags = require('./routes/api/tags');
const users = require('./routes/api/users');
const uploadS3 = require('./routes/api/uploadS3');
const config = require('config');

app.use(express.json({ extended: false }));
app.use(cors());

mongoose
    .connect(process.env.MONGODB_URI || config.mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => {
        console.log(err.mesage);
        process.exit(1); // Exit process upon failure
    });

app.use("/api/auth", auth);
app.use("/api/recipes", recipes);
app.use("/api/tags", tags);
app.use("/api/users", users);
app.use('/api/uploadS3', uploadS3);

const port = process.env.PORT || config.get("PORT");
const server = app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = server;