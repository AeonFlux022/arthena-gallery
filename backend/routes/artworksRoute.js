const artworksController = require('../controllers/artworksController.js')
const express = require('express')
const router = express.Router()

router.post('/:artistId/addArtwork', artworksController.addArtwork)

router.get('/allArtworks', artworksController.getAllArtworks)

router.get('/:artistId/artworks', artworksController.getArtworksByArtist)

router.patch('/update/:id', artworksController.updateArtwork)

router.delete('/delete/:id', artworksController.deleteArtwork)

module.exports = router