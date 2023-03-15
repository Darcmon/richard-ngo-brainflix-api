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
// app.route('videos/:videoId')
// .get('/', (req, res) => {
//     const videoId = req.params.id;
//     const video = video[videoId];

//     if (video === undefined) {
//         response.status(404);
//         response.json({
//             error: `Can't find video named ${video}`
//         });
//     } else {
//         response.json({
//             videoId: videoId,
//             video: video[videoId]
//         });
//     }
// })

app.listen(PORT, () => {
    console.log(`🚀 Server listening on ${PORT}`);
});