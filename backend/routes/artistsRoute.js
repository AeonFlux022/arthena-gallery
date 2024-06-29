const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { User, ArtistProfile } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

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
      address,
      image,
    } = req.body;

    const newArtist = await User.create({ role });

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).send("Missing required fields for ArtistProfile");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newArtistProfile = await ArtistProfile.create({
      userId: newArtist.id,
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
      address,
      image,
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

// GET ALL ARTISTS
router.get("/", async (req, res) => {
  const allArtists = await ArtistProfile.findAll({
    // where: {
    //   role: 1
    // },
    // include: [
    //   {
    //     model: ArtistProfile,
    //     as: "artistProfile",
    //   },
    // ],
  });
  res.json(allArtists);
});

// GET ONE ARTIST PROFILE
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getArtist = await ArtistProfile.findOne({ // User.fineOne
      where: {
        id
      }
    });

    if (!getArtist) {
      return res.status(404).send({ error: "Artist not found!" });
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
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    middleName,
    lastName,
    // username,
    email,
    // password,
    bio,
    phoneNumber,
    gender,
    birthdate,
    age,
    address,
    // image: imageName,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const artistProfile = await ArtistProfile.findOne({
      where: { id },
    });

    if (!artistProfile) {
      return res.status(404).json({ error: "Artist not found." });
    }
    
    artistProfile.firstName = firstName;
    artistProfile.middleName = middleName;
    artistProfile.lastName = lastName;
    // artistProfile.username = username;
    artistProfile.email = email;
    artistProfile.bio = bio;
    artistProfile.phoneNumber = phoneNumber;
    artistProfile.gender = gender;
    artistProfile.birthdate = birthdate;
    artistProfile.age = age;
    artistProfile.address = address;

    if (image) {
      artistProfile.image = image;
    }

    // // UPDATED validation due to required field errors 'email' and 'address'
    // if (firstName !== undefined) artistProfile.firstName = firstName;
    // if (middleName !== undefined) artistProfile.middleName = middleName;
    // if (lastName !== undefined) artistProfile.lastName = lastName;
    // if (email !== undefined) artistProfile.email = email;
    // if (bio !== undefined) artistProfile.bio = bio;
    // if (phoneNumber !== undefined) artistProfile.phoneNumber = phoneNumber;
    // if (gender !== undefined) artistProfile.gender = gender;
    // if (birthdate !== undefined) artistProfile.birthdate = birthdate;
    // if (age !== undefined) artistProfile.age = age;
    // if (address !== undefined) artistProfile.address = address;
    // if (image !== null) artistProfile.image = image;

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

// DEACTIVATE ACCOUNT
router.delete('/deactivate/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id)

    if(!user) {
      return res.status(404).send({ err: "Artist not found!"})
    }

    user.active = false
    await user.save();

    res.status(200).json({
      message: "Artist account deactivated successfully!"
    })
  } catch (err) {
    console.error("Error deactivating user:", err);
    res.status(500).json({ error: "Failed to deactivate user. Please try again later." });
  }
})

module.exports = router;
