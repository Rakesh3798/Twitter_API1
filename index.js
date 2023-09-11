require("dotenv").config({ path: __dirname + "/.env" });
const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
const { twitterClient } = require("./twitterClient.js")
const CronJob = require("cron").CronJob;
const path = require('path')
const viewPath=path.join(__dirname,"./views");
app.set('view engine','ejs')
app.set("views",viewPath);

app.get("/",(req,resp)=>{
  resp.render("App")
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const tweet = async () => {
  try {
    await twitterClient.v2.tweet("Hello world!");
  } catch (e) {
    console.log(e)
  }
}

const cronTweet = new CronJob("30 * * * * *", async () => {
  tweet();
});

cronTweet.start();


// require("dotenv").config({ path: __dirname + "/.env" });
// const { twitterClient } = require("./twitterClient.js");
// const CronJob = require("cron").CronJob;
// const express = require('express')
// const app = express()
// const port = process.env.PORT || 4000;
// const { download } = require("./utilities");

// app.listen(port, () => {
//   console.log(`Listening on port ${port}`)
// })

// const tweet = async () => {

//     const uri = "https://i.imgur.com/Zl2GLjnh.jpg";
//     const filename = "image.png";

//     download(uri, filename, async function(){
//         try {
//             const mediaId = await twitterClient.v1.uploadMedia("./image.png");
//             await twitterClient.v2.tweet({
//                 text: "Hello world! This is an image in Ukraine!",
//                 media: {
//                     media_ids: [mediaId]
//                 }
//             });
//         } catch (e) {
//             console.log(e)
//         }
//     });
// }

// const cronTweet = new CronJob("*/30 * * * * *", async () => {
//     tweet();
// });
  
// cronTweet.start();