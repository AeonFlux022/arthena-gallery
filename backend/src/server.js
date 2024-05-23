const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const db = require('./models')

app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
const artistRoute = require('./routes/artistsRoute.js')
app.use('/api/artists', artistRoute)

const artworkRoute = require('./routes/artworksRoute.js')
app.use('/api/artworks', artworkRoute)

// DB Syncing
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("Drop and re-sync db.");
  })
  .catch((err) => {
    console.log("Failed to re-sync db: " + err.message);
});

const PORT = process.env.PORT || 3005
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})