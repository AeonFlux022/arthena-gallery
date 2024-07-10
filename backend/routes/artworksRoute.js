// STRUCTURE NI KEVIN
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { User, Artwork } = require("../models");

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
router.post("/:userId", upload.single("imageUrl"), async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      availability,
      dimensions,
      medium,
      status,
      orientation,
      artForms,
      yearMade,
    } = req.body;
    const userId = req.params.userId;
    const imageUrl = req.file ? req.file.filename : null;

    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
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
      orientation,
      artForms,
      yearMade,
    });

    // // Associate the new Artwork with the Artist
    // await newArtwork.addArtist(user);

    await user.addArtwork(newArtwork);

    res.status(201).json({
      message: "Artwork added successfully!",
      data: { newArtwork },
    });
  } catch (error) {
    console.error("Error in creating artwork:", error);
    res.status(500).json({ error: "Failed to add artwork!" });
  }
});

// GET ALL ARTWORKS BY ARTIST ID
router.get("/all/byId/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const user = await User.findOne({
      where: { id: userId },
      include: [
        {
          model: Artwork,
          as: "artworks",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const artworks = user.artworks;

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

// UPDATE ARTWORK
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const id = req.params.id;
  const {
    title,
    description,
    price,
    yearMade,
    // active,
    availability,
    dimensions,
    medium,
    orientation,
    artForms,
    status,
  } = req.body;
  const imageUrl = req.file ? req.file.filename : null;

  try {
    const artwork = await Artwork.findOne({
      where: { id },
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found." });
    }

    artwork.title = title;
    artwork.description = description;
    artwork.price = price;
    artwork.yearMade = yearMade;
    // artwork.active = active;
    artwork.availability = availability;
    artwork.dimensions = dimensions;
    artwork.medium = medium;
    artwork.orientation = orientation;
    artwork.artForms = artForms;
    artwork.status = status;

    if (imageUrl) {
      artwork.imageUrl = imageUrl;
    }

    await artwork.save();
    res.json({
      message: "Artwork updated successfully",
      data: { artwork },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ARCHIVE ARTWORK
router.patch("/archive/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      return res.status(404).send({ err: "Artwork not found!" });
    }

    artwork.active = false;
    await artwork.save();

    res.status(200).json({
      message: "Artwork archived successfully!",
    });
  } catch (err) {
    console.error("Error archiving artwork:", err);
    res
      .status(500)
      .json({ error: "Failed to archive artwork. Please try again later." });
  }
});

// RESTORE ARCHIVED ARTWORK
router.patch("/restore/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    if (artwork.active) {
      return res.status(400).json({ error: "Artwork is already active" });
    }

    artwork.active = true;
    await artwork.save();

    res.status(200).json({ message: "Artwork restored successfully!" });
  } catch (error) {
    console.error("Error in restoring artwork:", error);
    res.status(500).json({ error: "Failed to restore artwork" });
  }
});

// DELETE/DESTROY ARTWORK
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const artwork = await Artwork.findByPk(id);

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    if (artwork.active) {
      return res.status(400).json({
        error: "Active artwork cannot be deleted. Please archive it first.",
      });
    }

    await artwork.destroy();

    res.status(200).json({ message: "Artwork deleted successfully!" });
  } catch (error) {
    console.error("Error in deleting artwork:", error);
    res.status(500).json({ error: "Failed to delete artwork" });
  }
});

module.exports = router;
