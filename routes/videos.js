const express = require('express');
const router = express.Router();
const fs = require('fs');
const { v4: uuid } = require('uuid');

const FILE_PATH = './data/videos.json';

const readVideos = () => {
    const videosData = JSON.parse(fs.readFileSync(FILE_PATH));
    return videosData;
}

// const videoList = () => {videosData.map((video) => (
//       video={video},
//       id={video.id},
//       title={video.title},
//       channel={video.channel},
//       image={video.image}
//   ))};
// Create Video List
// map the videos.json file
// identify values for new Obj Array for videolist
// push to virtual JSON?

router.get('/', (_req, res) => {
    const videosData = readVideos();
    res.status(200).json(videosData);
});


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