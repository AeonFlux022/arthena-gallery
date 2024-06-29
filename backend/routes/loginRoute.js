const express = require("express");
const router = express.Router();
const { Artist, ArtistProfile, Admin, AdminProfile } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware.jsx");

const { sign } = require("jsonwebtoken");

// router.post("/login", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username) {
//       return res.status(400).json({ error: "Username is required" });
//     }

//     const whereClause = username ? { username } : { email };

//     const artistProfile = await ArtistProfile.findOne({
//       where: whereClause,
//       include: "artist",
//     });

//     if (!artistProfile.artist) {
//       res.status(404).json({ error: "User not found. Please try again." });
//       return;
//     }

//     const passwordMatch = await bcrypt.compare(
//       password,
//       artistProfile.password
//     );

//     if (!passwordMatch) {
//       res.status(401).json({ error: "Incorrect password. Please try again." });
//       return;
//     }

//     const accessToken = sign(
//       {
//         id: artistProfile.id,
//         username: artistProfile.username,
//         email: artistProfile.email,
//         firstName: artistProfile.firstName,
//         lastName: artistProfile.lastName,
//         role: artistProfile.artist.role,
//       },
//       "secret"
//     );
//     res.json({
//       token: accessToken,
//       username: artistProfile.username,
//       firstName: artistProfile.firstName,
//       lastName: artistProfile.lastName,
//       email: artistProfile.email,
//       id: artistProfile.id,
//       role: artistProfile.artist.role,
//     });
//   } catch (error) {
//     console.error("Error in login:", error);
//     res.status(500).json({ error: "Failed to login. Please try again later." });
//   }
// });

// // router.get("/auth", validateToken, async (req, res) => {
// //   res.json(req.artistProfile);
// // });

// router.post("/admin/login", async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username) {
//       return res.status(400).json({ error: "Username or email is required" });
//     }

//     const whereClause = username ? { username } : { email };

//     const adminProfile = await AdminProfile.findOne({
//       where: whereClause,
//       include: "admin",
//     });

//     if (!adminProfile.admin) {
//       res.status(404).json({ error: "Admin not found. Please try again." });
//       return;
//     }

//     const passwordMatch = await bcrypt.compare(
//       password,
//       adminProfile.password)

//     if (!passwordMatch) {
//       res.status(401).json({ error: "Incorrect password. Please try again." });
//       return;
//     }

//     const accessToken = sign(
//       {
//         id: adminProfile.id,
//         username: adminProfile.username,
//         email: adminProfile.email,
//         firstName: adminProfile.firstName,
//         lastName: adminProfile.lastName,
//         role: adminProfile.admin.role,
//       },
//       "secret"
//     );

//     res.json({
//       token: accessToken,
//       username: adminProfile.username,
//       firstName: adminProfile.firstName,
//       lastName: adminProfile.lastName,
//       email: adminProfile.email,
//       id: adminProfile.id,
//       role: adminProfile.admin.role,
//     });
//   } catch (error) {
//     console.error("Error in admin login:", error);
//     res.status(500).json({ error: "Failed to login. Please try again later." });
//   }
// });

// // router.get("/adminAuth", validateToken, async (req, res) => {
// //   res.json(req.adminProfile);
// // });

// router.get("/auth", validateToken, async (req, res) => {
//   if (req.user.role === 0) {
//     res.json(req.adminProfile);
//   } else if (req.user.role === 1) {
//     res.json(req.artistProfile);
//   } else {
//     res.status(400).json({ error: "Unknown user role" });
//   }
// });

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({ error: "Username or email is required" });
    }

    const whereClause = username ? { username } : { email };

    let userProfile = await ArtistProfile.findOne({
      where: whereClause,
      include: "user",
    });

    let role = 1;
    if (!userProfile) {
      userProfile = await AdminProfile.findOne({
        where: whereClause,
        include: "user",
      });
      role = 0;
    }

    if (!userProfile) {
      return res.status(404).json({ error: "User not found. Please try again." });
    }

    const passwordMatch = await bcrypt.compare(password, userProfile.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password. Please try again." });
    }

    const accessToken = sign(
      {
        id: userProfile.id,
        username: userProfile.username,
        email: userProfile.email,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        role,
      },
      "secret"
    );

    res.json({
      token: accessToken,
      username: userProfile.username,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      id: userProfile.id,
      role,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
});

router.get("/auth", validateToken, async (req, res) => {
  if (req.user.role === 0) {
    const adminProfile = await AdminProfile.findOne({ where: { id: req.user.id } });
    if (adminProfile) {
      return res.json(adminProfile);
    }
  } else if (req.user.role === 1) {
    const artistProfile = await ArtistProfile.findOne({ where: { id: req.user.id } });
    if (artistProfile) {
      return res.json(artistProfile);
    }
  }
  res.status(400).json({ error: "Unknown user role" });
});

module.exports = router;
