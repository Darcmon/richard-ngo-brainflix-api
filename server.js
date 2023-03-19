const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const fs = require('fs');

const videoRoutes = require('./routes/videos');

const FILE_PATH = './data/videos.json';

const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors(
    {origin: CLIENT_URL}
));

app.use(express.json());

app.use(express.static('public'))

const readVideos = () => {
    const videosData = JSON.parse(fs.readFileSync(FILE_PATH));
    return videosData;
}

app.get('/', (_req, res) => {
    res.send(readVideos());
});

app.use('/videos', videoRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});