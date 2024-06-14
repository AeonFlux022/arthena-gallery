module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define(
    "Artist",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "ARTIST",
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

  Artist.associate = (models) => {
    Artist.hasOne(models.ArtistProfile, {
      foreignKey: "artistId",
      as: "artistprofile",
      onDelete: "CASCADE",
    });
  };

  return Artist;
};
