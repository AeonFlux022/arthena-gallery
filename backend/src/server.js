const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const artistRoute = require("./routes/artistsRoute.js");
app.use("/artists", artistRoute);

const artworkRoute = require("./routes/artworksRoute.js");
app.use("/api/artworks", artworkRoute);

// DB Syncing
// db.sequelize.sync
//   .then(() => {
//     console.log("Drop and re-sync db.");
//   })
//   .catch((err) => {
//     console.log("Failed to re-sync db: " + err.message);
//   });

db.sequelize.sync().then(() => {
  app.listen(3005, () => {
    console.log("Server running on port 3005")
  })
})

// const PORT = process.env.PORT || 3005;
// db.sequelize.sync().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
