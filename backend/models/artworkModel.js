module.exports = (sequelize, DataTypes) => {
  const Artwork = sequelize.define(
    "Artwork",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      availability: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      dimensions: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      medium: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM(
          "for sale",
          "sold",
          "on hold",
          "pending approval",
          "under review",
          "unavailable",
          "archived",
          "reserved"
        ),
        defaultValue: "on hold",
        allowNull: false,
      },
      // soldDate: {
      //     type: DataTypes.DATE,
      //     allowNull: true
      // },
      // location: {
      //     type: DataTypes.STRING,
      //     allowNull: true
      // },
      // commissionRate: {
      //     type: DataTypes.DATE,
      //     allowNull: true
      // },
    },
    {
      freezeTableName: true,
    }
  );

  Artwork.associate = (models) => {
    Artwork.belongsToMany(models.Artist, {
      through: "artistArtworks",
      as: "artists",
    });
  };

  return Artwork;
};
