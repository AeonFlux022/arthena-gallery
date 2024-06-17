// const artworksController = require('../controllers/artworksController.js')
// const express = require('express')
// const router = express.Router()

// router.post('/:artistId/addArtwork', artworksController.addArtwork)

// router.get('/allArtworks', artworksController.getAllArtworks)

// router.get('/:artistId/artworks', artworksController.getArtworksByArtist)

// router.patch('/update/:id', artworksController.updateArtwork)

// router.delete('/delete/:id', artworksController.deleteArtwork)

// module.exports = router

// --------------------------------------------------------------
// STRUCTURE NI KEVIN
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Artist, ArtistProfile, Artwork } = require("../models");

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

// ADD ARTWORK
router.post("/:artistId", async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      availability,
      dimensions,
      medium,
      imageUrl,
      status,
    } = req.body;
    const artistId = req.params.artistId;

    const artist = await Artist.findOne({ where: { id: artistId } });
    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const newArtwork = await Artwork.create({
      title,
      description,
      price,
      availability,
      dimensions,
      medium,
      imageUrl,
      status,
    });

    // Associate the new Artwork with the Artist
    await newArtwork.addArtist(artist);

    res
      .status(201)
      .json({ message: "Artwork added successfully!", data: { newArtwork } });
  } catch (error) {
    console.error("Error in creating artwork:", error);
    res.status(500).json({ error: "Failed to add artwork!" });
  }
});

module.exports = router;
