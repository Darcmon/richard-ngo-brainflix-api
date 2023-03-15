const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const videoRoutes = require('./routes/videos');


const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    {origin: CLIENT_URL}
));

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('this works');
});

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});