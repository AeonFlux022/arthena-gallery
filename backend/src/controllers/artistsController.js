const db = require("../models");

// Bcrypt
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

// JWT
const jwt = require("jsonwebtoken");

// Secret key
const secretKey = require("../config/secretKey.js");

// Imports from index.js
const Artist = db.artist;
const ArtistProfile = db.artistprofile;
const Artwork = db.artwork;

// CREATE Artist with Profile
const addArtistWithProfile = async (req, res) => {
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
};

// READ ALL
const getAllArtists = async (req, res) => {
  let allArtists = await Artist.findAll({
    include: [
      {
        model: ArtistProfile,
        as: "artistprofile",
      },

      // {
      //     model: Artwork,
      //     as: 'artwork'
      // }
    ],
  });
  res.status(200).send(allArtists);
};

// READ ONE
const getOneArtist = async (req, res) => {
  let id = req.params.id;
  let artist = await Artist.findOne({
    where: { id },
    include: [
      {
        model: ArtistProfile,
        as: "artistprofile",
      },
      // {
      //   model: Artwork,
      //   as: "artwork",
      // },
    ],
  });
  res.status(200).send(artist);
};

// UPDATE
const updateArtist = async (req, res) => {
  try {
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

    let artistProfile = await ArtistProfile.findOne({ where: { artistId } });
    if (!artistProfile) {
      return res.status(404).send("Artist Profile not found");
    }

    await artistProfile.update({
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
    });

    artistProfile = await ArtistProfile.findOne({
      where: { artistId },
    });

    res.status(201).json({
      message: "Artist account updated successfully",
      data: { artistProfile },
    });
  } catch (error) {
    res.status(500).send("Failed to update artist profile: " + error.message);
  }
};

// DELETE / DEACTIVATE
const deleteArtist = async (req, res) => {
  try {
    const artistId = req.params.id;

    const artist = await Artist.findOne({ where: { id: artistId } });
    if (!artist) {
      return res.status(404).send("Artist not found");
    }

    await artist.removeArtworks();

    await artist.destroy();

    res.status(200).send("Artist deleted successfully!");
  } catch (error) {
    console.error("Error deleting artist:", error);
    res.status(500).send("Failed to delete artist");
  }
};

// LOGIN AUTH
const loginArtist = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username && !email) {
      return res.status(400).json({ error: "Username or email is required" });
    }

    const whereClause = username ? { username } : { email };

    const artistProfile = await ArtistProfile.findOne({
      where: whereClause,
      include: "artist",
    });

    if (!artistProfile.artist) {
      return res.status(404).json({ error: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      artistProfile.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Generate and send token
    const token = jwt.sign({ id: artistProfile.artist.id }, secretKey, {
      expiresIn: "7d",
    });

    // Cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
    });

    res
      .status(200)
      .json({ message: "Login successful", token, data: artistProfile.artist });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Failed to login. Please try again later." });
  }
};

// GET AUTH
const getAuthArtist = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.sendStatus(401);
    }

    const user = jwt.verify(token, secretKey);

    const artist = await Artist.findOne({
      where: { id: user.id },
      include: [
        {
          model: ArtistProfile,
          as: "artistprofile",
          // attributes: ['firstName', 'middleName', 'lastName', 'bio']
        },
        // ,
        // {
        //     model: Artwork,
        //     as: 'artwork'
        // }
      ],
    });

    if (artist) {
      res.json({
        message: "Authentication successful!",
        id: user.id,
        credentials: artist.artistprofile,
      });
    } else {
      res.status(404).json({
        message: "Artist not found",
      });
    }
  } catch (error) {
    console.error("Error fetching artist details:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

// EXPORTING
module.exports = {
  addArtistWithProfile,
  getAllArtists,
  getOneArtist,
  updateArtist,
  deleteArtist,
  loginArtist,
  getAuthArtist,
  // authenticateToken,
};
