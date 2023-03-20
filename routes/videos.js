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
        description: videoObj.description,
        timestamp: videoObj.timestamp,
        channel: "Lydia Perez",
        image: "http://localhost:8080/images/image6.jpeg",
        views: "252,796",
        likes: "4,905",
        comments: [
            {
                id: "2d818087-c1f4-4ec2-bcdc-b545fd6ec258",
                name: "Martin Evergreen",
                comment: "I’ve loved trains ever since I was a child. I dreamed about riding one around the world. This is the most fantastic thing I’ve seen yet, and I’m watching it ON a train!",
                likes: 3,
                timestamp: 1632512763000
            },
            {
                id: "191de346-b3c2-47b4-bf5b-6db90d1e3bdc",
                name: "Emily Harper",
                comment: "Let’s collaborate on a video for saving money on cheap train tickets! I’ll have my associates contact yours.",
                likes: 0,
                timestamp: 1632496261000
            }
        ]
    }

    const videosData = readVideos();
    videosData.push(newVideo);

    fs.writeFileSync(FILE_PATH, JSON.stringify(videosData));

    res.status(201).json(newVideo);
})

module.exports = router;