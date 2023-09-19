const express = require("express");
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const redis = require("redis");
const dao = require("./dao");

const PORT = 80;
const HOST = "0.0.0.0";
const REDIS_URL = "redis://redis:6379";
const REDIS_CAT_KEY = "Cat";
const REDIS_DOG_KEY = "Dog";
const VOTE_SVC_URL = "http://vote-svc";

// setup middleware
const redisClient = redis.createClient({
    url: REDIS_URL
});

redisClient.connect();
redisClient.on("connect", (error) => {
    console.log("Redis connected");
});
redisClient.on("error", (error) => {
    console.error("Redis not connected due to: ", error);
});

const getAnimalVote = async (animalVote) => {
    let catVote = await redisClient.get(REDIS_CAT_KEY);
    let dogVote = await redisClient.get(REDIS_DOG_KEY);
    
    if (catVote) {
        animalVote.setCat(catVote);
    }
    if (dogVote) {
        animalVote.setDog(dogVote);
    }
}

//setup server
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
    res.status(200).send("Up");
});

app.get("/getvote", async (req, res) => {
    let animalVote = new dao.AnimalVote();
    await getAnimalVote(animalVote);
    console.log("Get votes from DB")
    res.status(200).send(animalVote);
});

app.post("/sendvote", (req, res) => {
    const voteName = req.body.name;

    if (voteName === "cat") {
        request.get(VOTE_SVC_URL + "/catvote", (err, res, body) => {
            if (err) {
                console.error("Error cat vote due to, ", err);
            }
        });
    }

    if (voteName === "dog") {
        request.get(VOTE_SVC_URL + "/dogvote", (err, res, body) => {
            if (err) {
                console.error("Error dog vote due to, ", err);
            }
        });
    }
});

function startServer() {
    app.listen(PORT, HOST, () => {
        console.log(`Running on http://${HOST}:${PORT}`);
    })
}

module.exports = {
    startServer
}