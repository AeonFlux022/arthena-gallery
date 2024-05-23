const db = require('../models');

// Imports from index.js
const Artist = db.artist
const Artwork = db.artwork

const addArtwork = async (req, res) => {
    try {
        const { title, description, price, availability, dimensions, medium, imageUrl, status } = req.body;
        const artistId = req.params.artistId;

        const artist = await Artist.findByPk(artistId);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
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

        await artist.addArtwork(newArtwork);

        res.status(201).json({ message: 'Artwork added successfully!', data: { newArtwork } });
    } catch (err) {
        console.error('Error in creating artwork:', err);
        res.status(500).json({ error: 'Failed to add artwork!' });
    }
}

// GET All Artworks
const getAllArtworks = async (req, res) => {
    let allArtworks = await Artwork.findAll()
    res.status(200).send(allArtworks)
}

// GET Artworks by Artist
const getArtworksByArtist = async (req, res) => {
    try {
        const { artistId } = req.params;

        const artist = await Artist.findByPk(artistId);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found' });
        }

        const associatedArtworks = await artist.getArtworks();

        res.status(200).json({ artworks: associatedArtworks });
    } catch (error) {
        console.error('Error retrieving artworks by artist:', error);
        res.status(500).json({ error: 'Failed to retrieve artworks by artist' });
    }
}

// UPDATE Artwork
const updateArtwork = async (req, res) => {
    try {
        const { title, description, price, availability, dimensions, medium, imageUrl, status } = req.body
        const artworkId = req.params.id

        let artwork = await Artwork.findOne({ where: { id: artworkId } })
        if (!artwork) {
            return res.status(404).send("Artwork not found")
        }

        await artwork.update({
            title,
            description,
            price,
            availability,
            dimensions,
            medium,
            imageUrl,
            status
        });

        const associatedArtists = await artwork.getArtists()
        res.status(200).json({ message: "Artwork details updated successfully", data: { artwork, associatedArtists } })
    } catch (error) {
        res.status(500).send("Failed to update artwork: " + error.message)
    }
}

// DELETE / DEACTIVATE
const deleteArtwork = async (req, res) => {
    /*
    > Also delete the artwork inside artwork table (?)
    */
    try {
        const artworkId = req.params.id

        const artwork = await Artwork.findOne({ where: { id: artworkId } })
        if (!artwork) {
            return res.status(404).send("Artwork not found")
        }

        await artwork.removeArtists()

        await artwork.destroy()

        res.status(200).send('Artwork deleted successfully!')
    } catch (error) {
        console.error('Error deleting artwork:', error)
        res.status(500).send('Failed to delete artwork')
    }
}

module.exports = {
    addArtwork,
    getAllArtworks,
    getArtworksByArtist,
    updateArtwork,
    deleteArtwork
}