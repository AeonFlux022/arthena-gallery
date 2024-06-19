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
const { Artist, ArtistProfile, Artwork, ArtistArtworks } = require("../models");

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
router.post("/:artistId", upload.single("imageUrl"), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      availability,
      dimensions,
      medium,
      status,
    } = req.body;
    const artistId = req.params.artistId;
    const imageUrl = req.file ? req.file.filename : null;

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

// GET ALL ARTWORKS BY ARTIST ID
// GET ALL ARTWORKS BY ARTIST ID
router.get("/all/byId/:artistId", async (req, res) => {
  try {
    const { artistId } = req.params;

    const artist = await Artist.findOne({
      where: { id: artistId },
      include: [
        {
          model: Artwork,
          as: "artworks",
        },
      ],
    });

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    const artworks = artist.artworks;

    res.status(200).json({ artworks });
  } catch (error) {
    console.error("Error retrieving artworks by artist:", error);
    res.status(500).json({ error: "Failed to retrieve artworks by artist" });
  }
});

// GET ARTWORK BY ID
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getArtwork = await Artwork.findOne({
      where: { id },
    });

    if (!getArtwork) {
      return res.status(404).send({ error: "Artwork not found" });
    }

    res.status(200).send(getArtwork);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the artwork" });
  }
});

module.exports = router;
