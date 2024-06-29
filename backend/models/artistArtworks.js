module.exports = (sequelize, DataTypes) => {
    const ArtistArtworks = sequelize.define(
      "Artist_Artworks",
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        artworkId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return ArtistArtworks;
  };