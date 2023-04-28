require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const { download } = require("./utilities");
const fs = require("fs");

fetch("https://api.thecatapi.com/v1/images/search?limit=1")
  .then((res) => res.json())
  .then((json) => json[0].url)
  .then((imageURL) => {
    console.log(imageURL);
    tweet(imageURL);
  })
  .catch((error) =>
    console.error("There was an error fetching a cat...😑", error)
  );

const tweet = async (uri) => {
  const filename = "image.png";

  download(uri, filename, async function () {
    try {
      const mediaId = await twitterClient.v1.uploadMedia("./image.png");

      await twitterClient.v2.tweet({
        text: "",
        media: {
          media_ids: [mediaId],
        },
      });

      fs.unlink(filename, function (err) {
        if (err) {
          console.log("No file to delete. 😥", err);
        } else {
          console.log("Successfully deleted the file. 🚀");
        }
      });

      console.log("New Cat successfully posted!🐕‍🦺");
    } catch (e) {
      console.error("Something went wrong...😫", error);
    }
  });
};
