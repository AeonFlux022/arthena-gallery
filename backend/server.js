const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const db = require("./models");

app.use(cors());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const adminRoute = require("./routes/adminsRoute.js");
app.use("/admins", adminRoute);

const artistRoute = require("./routes/artistsRoute.js");
app.use("/artists", artistRoute);

const loginRoute = require("./routes/loginRoute.js");
app.use("/auth", loginRoute);

const artworkRoute = require("./routes/artworksRoute.js");
app.use("/artworks", artworkRoute);

db.sequelize.sync().then(() => {
  app.listen(3005, () => {
    console.log("Server running on port 3005");
  });
});

// // WIPING ALL DB WHILE DISABLING FOREIGN KEY CHECKS
// (async () => {
//   try {
//     await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

//     await db.sequelize.drop();

//     await db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

//     await db.sequelize.sync({ force: true });

//     app.listen(3005, () => {
//       console.log("Server running on port 3005");
//     });
//   } catch (error) {
//     console.error("Error during table synchronization:", error);
//   }
// })();
