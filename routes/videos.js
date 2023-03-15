const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const FILE_PATH = './data/videos.json';


const readVideos = () => {
    const videosData = JSON.parse(fs.readFileSync(FILE_PATH));
    return videosData;
}

router.get('/', (_req, res) => {
    const videosData = readVideos();
    res.status(200).json(videosData);
});

module.exports = router;