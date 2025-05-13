"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
const walletRoutes = require('./routes/index');
const mongoose = require('mongoose');
const routes = require('./routes/index');
const app = express();
const PORT = process.env.PORT || 8081;
const MONGODB_ATLAS = process.env.MONGODB_ATLAS || 'mongodb+srv://curso_node:r6X0VaNbgWCVHKyy@nodecurso.uagpmzs.mongodb.net/NodeCurso';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(MONGODB_ATLAS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
    console.log('Connected to MongoDB');
})
    .catch((err) => {
    console.error('MongoDB connection error:', err);
});
app.use('/api', routes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
