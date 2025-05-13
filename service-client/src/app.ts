const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index');
const walletRoutes = require('./routes/index');
const cors = require('cors');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/wallets', walletRoutes);

app.listen(PORT, () => {
    console.log(`Client service is running on port ${PORT}`);
});