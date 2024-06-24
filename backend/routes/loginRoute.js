const express = require("express");
const router = express.Router();
const { Artist, ArtistProfile, Admin } = require("../models");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware.jsx");

const { sign } = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const whereClause = username ? { username } : { email };

    const artistProfile = await ArtistProfile.findOne({
      where: whereClause,
      include: "artist",
    });

    if (!artistProfile.artist) {
      res.status(404).json({ error: "User not found. Please try again." });
      return;
    }

    const passwordMatch = await bcrypt.compare(
      password,
      artistProfile.password
    );

    if (!passwordMatch) {
      res.status(401).json({ error: "Incorrect password. Please try again." });
      return;
    }

    const accessToken = sign(
      {
        id: artistProfile.id,
        username: artistProfile.username,
        email: artistProfile.email,
        firstName: artistProfile.firstName,
        lastName: artistProfile.lastName,
        role: artistProfile.artist.role,
      },
      "secret"
    );
    res.json({
      token: accessToken,
      username: artistProfile.username,
      firstName: artistProfile.firstName,
      lastName: artistProfile.lastName,
      email: artistProfile.email,
      id: artistProfile.id,
      role: artistProfile.artist.role,
    });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
});

router.get("/auth", validateToken, async (req, res) => {
  res.json(req.artistProfile);
});

module.exports = router;
