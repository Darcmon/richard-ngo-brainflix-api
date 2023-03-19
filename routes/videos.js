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


router.get('/:videoId', (req, res) => {

    const videoId = req.params.videoId;
    let video = readVideos()

    video = video.find(vid => vid.id === videoId);

    if (!video) {
        res.status(404);
        res.json({
            error: `Can't find video`
        });
    }
        console.log(video);

    res.send({
        video
    });
})


router.post('/', (req, res) => {
    const videoObj = req.body;
    const newVideo = {
        id: uuid(),
        title: videoObj.title,
        description: videoObj.description
    }

    const videosData = readVideos();
    videosData.push(newVideo);

    fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));

    res.status(201).json(newVideo);
})

module.exports = router;