// const axios = require("axios");
// const fetch = require("node-fetch");
// require("dotenv").config({ path: __dirname + "/.env" });
import { fileTypeFromBuffer } from "file-type";
import fetch from "node-fetch";
import axios from "axios";
import { TwitterApi } from "twitter-api-v2";
// import { twitterClient } from "./twitterClient.js";

import * as dotenv from "dotenv";
dotenv.config();
// const { fileTypeFromBuffer } = require("file-type");
// const CronJob = require("cron").CronJob;
// const { download } = require("./utilities");
// const fs = require("fs");

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_SECRET,
});

const bearer = new TwitterApi(process.env.BEARER_TOKEN);

const twitterClient = client.readWrite;
const twitterBearer = bearer.readOnly;

const fetchImageAndTrigger = () => {
  fetch("https://api.thecatapi.com/v1/images/search?limit=1")
    .then((res) => res.json())
    .then((json) => json[0].url)
    .then(async (imageURL) => {
      let imageUrl = imageURL;
      const buffer = Buffer.from(
        (
          await axios.get(imageUrl, {
            responseType: "arraybuffer",
          })
        ).data,
        "utf-8"
      );

      tweet(buffer);
    })
    .catch((error) =>
      console.error("There was an error fetching a cat...😑", error)
    );
};

const tweet = async (buffer) => {
  // const filename = "image.png";

  // download(uri, filename, async function () {
  try {
    // const mediaId = await twitterClient.v1.uploadMedia("./image.png");
    const mediaId = await twitterClient.v1.uploadMedia(buffer, {
      mimeType: (await fileTypeFromBuffer(buffer))?.mime,
    });

    await twitterClient.v2.tweet({
      text: "",
      media: {
        media_ids: [mediaId],
      },
    });

    // fs.unlink(filename, function (err) {
    //   if (err) {
    //     console.log("No file to delete. 😥", err);
    //   } else {
    //     console.log("Successfully deleted the file. 🚀");
    //   }
    // });

    //     console.log("New Cat successfully posted!🐕‍🦺");
  } catch (e) {
    console.error("Something went wrong...😫", e);
  }
  // });
};

// const cronTweet = new CronJob("30 * * * * *", async () => {
fetchImageAndTrigger();
// });

// cronTweet.start();
