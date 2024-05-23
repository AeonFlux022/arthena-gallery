const artistsController = require('../controllers/artistsController.js')
const express = require('express')
const router = express.Router()

router.post('/addArtist', artistsController.addArtistWithProfile)

router.get('/allArtists', artistsController.getAllArtists)

router.post('/login', artistsController.loginArtist)

router.get('/authenticated', artistsController.getAuthArtist)

// Wild cards
router.get('/:id', artistsController.getOneArtist)

router.patch('/update/:id', artistsController.updateArtist)

router.delete('/delete/:id', artistsController.deleteArtist)

module.exports = router