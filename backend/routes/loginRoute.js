const express = require("express");
const router = express.Router();
const { ArtistProfile, AdminProfile, User } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware.jsx");

const { sign } = require("jsonwebtoken");


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
      return res
        .status(404)
        .json({ error: "User not found. Please try again." });
    }

    const passwordMatch = await bcrypt.compare(password, userProfile.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Incorrect password. Please try again." });
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
      // process.env.JWT_SECRET
    );

    res.json({
      token: accessToken,
      id: userProfile.id,
      username: userProfile.username,
      email: userProfile.email,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      role,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
});

// router.get("/auth", validateToken, async (req, res) => {
//   res.json(req.user);
// });

router.get("/auth", validateToken, async (req, res) => {
  if (req.user.role === 0) {
    const adminProfile = await AdminProfile.findOne({
      where: { id: req.user.id },
    });
    if (adminProfile) {
      return res.json(adminProfile);
    }
  } else if (req.user.role === 1) {
    const artistProfile = await ArtistProfile.findOne({
      where: { id: req.user.id },
    });
    if (artistProfile) {
      return res.json(artistProfile);
    }
  }
  res.status(400).json({ error: "Unknown user role" });

  // checking ga gana man ni sya men, gn kakas ko lang gid ang includes didto sa authmiddleware 
  //   const { id, role } = req.user;

  //   if (role === 0) {
  //     const adminProfile = await AdminProfile.findOne({
  //       where: { id },
  //     });
  //     if (adminProfile) {
  //       return res.json(adminProfile);
  //     }
  //   } else if (role === 1) {
  //     const artistProfile = await ArtistProfile.findOne({
  //       where: { id },
  //     });
  //     if (artistProfile) {
  //       return res.json(artistProfile);
  //     }
  //   }

  //   res.status(400).json({ error: "Unknown user role" });
});

module.exports = router;
