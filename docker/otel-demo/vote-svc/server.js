const express = require("express");
const redis = require("redis");

const PORT = 80;
const HOST = "0.0.0.0";
const REDIS_URL = "redis://redis:6379";
const REDIS_CAT_KEY = "Cat";
const REDIS_DOG_KEY = "Dog";

// setup middleware
const redisClient = redis.createClient({
    url: REDIS_URL
});

redisClient.connect();
redisClient.on("connect", (err) => {
    console.log("Redis connected");
});
redisClient.on("error", (err) => {
    console.error("Redis not connected due to: ", err);
});

const updateVote = async (keyName) => {
    let votes = 0;

    let oldVotes = await redisClient.get(keyName);
    if (oldVotes) {
        votes = parseInt(oldVotes) + 1;
    } else {
        votes++;
    }
    await redisClient.set(keyName, votes);

    return votes;
}

// setup server
const app = express();

app.get("/", (req, res) => {
    res.status(200).send("Up");
});

app.get("/catvote", async (req, res) => {
    let votes = await updateVote(REDIS_CAT_KEY);
    console.log(`Cat got ${votes} votes`);
    res.status(200).send("ok");
});

app.get("/dogvote", async (req, res) => {
    let votes = await updateVote(REDIS_DOG_KEY);
    console.log(`Dog got ${votes} votes`);
    res.status(200).send("ok");
});

function startServer() {
    app.listen(PORT, HOST, () => {
        console.log(`Running on http://${HOST}:${PORT}`);
    });
}

module.exports = {
    startServer
}