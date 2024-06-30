const ROLE = require("../const/users/roleConstants.js");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: ROLE.ARTIST, // Default role
        validate: {
          isIn: [[ROLE.ADMIN, ROLE.ARTIST, ROLE.BUYER, ROLE.GUEST]],
        },
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );

  // User.associate = (models) => {
  //   User.hasOne(models.UserProfile, {
  //     foreignKey: "userId",
  //     as: "userProfile",
  //     onDelete: "CASCADE",
  //   });
  // };

  User.associate = (models) => {
    User.hasOne(models.AdminProfile, {
      foreignKey: "userId",
      as: "adminProfile",
      onDelete: "CASCADE",
      constraints: false, // Disable constraints to allow multiple associations
    });

    User.hasOne(models.ArtistProfile, {
      foreignKey: "userId",
      as: "artistProfile",
      onDelete: "CASCADE",
      constraints: false,
    });

    // User.hasMany(models.Artwork, {
    //     foreignKey: 'userId',
    //     as: 'artworks',
    //     onDelete: 'CASCADE',
    // });

    User.belongsToMany(models.Artwork, {
      through: models.Artist_Artworks,
      foreignKey: "userId",
      otherKey: "artworkId",
      as: "artworks",
    });
  };

  return User;
};
