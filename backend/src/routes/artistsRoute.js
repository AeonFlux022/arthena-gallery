// const artistsController = require("../controllers/artistsController.js");
// const express = require("express");
// const router = express.Router();

// router.post("/addArtist", artistsController.addArtistWithProfile);

// router.get("/allArtists", artistsController.getAllArtists);

// router.post("/login", artistsController.loginArtist);

// router.get(
//   "/authenticated",
//   artistsController.getAuthArtist
//   // artistsController.authenticateToken
// );

// // Wild cards
// router.get("/:id", artistsController.getOneArtist);

// router.patch("/update/:id", artistsController.updateArtist);

// router.delete("/delete/:id", artistsController.deleteArtist);

// module.exports = router;

// -------------------------------------------
// STRUCTURE NI KEVIN //
const express = require("express");
const router = express.Router();
const { Artist, ArtistProfile } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

// Secret key
const secretKey = require("../config/secretKey.js");

// CREATE A USER
router.post("/", async (req, res) => {
  try {
    const {
      role,
      firstName,
      middleName,
      lastName,
      username,
      email,
      password,
      bio,
      phoneNumber,
      gender,
      birthdate,
      age,
    } = req.body;

    const newArtist = await Artist.create({ role });

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).send("Missing required fields for ArtistProfile");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newArtistProfile = await ArtistProfile.create({
      artistId: newArtist.id,
      firstName,
      middleName,
      lastName,
      username,
      email,
      password: hashedPassword,
      bio,
      phoneNumber,
      gender,
      birthdate,
      age,
    });

    res.status(201).json({
      message: "Artist account created successfully",
      data: { newArtist, newArtistProfile },
    });
  } catch (err) {
    console.error("Error in creating artist account:", err);
    res.status(500).json({
      err: "Failed to create artist account. Please try again later.",
    });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const allArtists = await ArtistProfile.findAll({
    // include: [
    //   {
    //     model: ArtistProfile,
    //     as: "artistprofile",
    //   },
    // ],
  });
  res.json(allArtists);
});

// GET ONE USER
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getArtist = await ArtistProfile.findOne({
      where: { id },
      // include: [
      //   {
      //     model: ArtistProfile,
      //     as: "artistprofile",
      //   },
      // ],
    });

    if (!getArtist) {
      return res.status(404).send({ error: "Artist not found" });
    }

    res.status(200).send(getArtist);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the artist" });
  }
});

// UPDATE USER
router.put("/update/:id", async (req, res) => {
  const artistId = req.params.id;
  const {
    firstName,
    middleName,
    lastName,
    username,
    email,
    password,
    bio,
    phoneNumber,
    gender,
    birthdate,
    age,
  } = req.body;

  try {
    const artistProfile = await ArtistProfile.findOne({
      where: { artistId },
    });

    if (!artistProfile) {
      return res.status(404).json({ error: "Artist not found." });
    }
    artistProfile.firstName = firstName;
    artistProfile.middleName = middleName;
    artistProfile.lastName = lastName;
    artistProfile.username = username;
    artistProfile.email = email;
    artistProfile.bio = bio;
    artistProfile.phoneNumber = phoneNumber;
    artistProfile.gender = gender;
    artistProfile.birthdate = birthdate;
    artistProfile.age = age;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    artistProfile.password = hashedPassword;

    await artistProfile.save();
    res.json({
      message: "Artist account updated successfully",
      data: { artistProfile },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
