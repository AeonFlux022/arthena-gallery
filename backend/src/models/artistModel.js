module.exports = (sequelize, DataTypes) => {
    const Artist = sequelize.define("Artist", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'ARTIST'
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })

    Artist.associate = models => {

        // POSSIBLE REDUNDANCY
        // One to one association with artistprofile
        Artist.hasOne(models.ArtistProfile, {
            onDelete: 'CASCADE'
        })

        // Many to many association with artworks
        // Artist.belongsToMany(models.Artwork, {
        //     through: 'Artist_Artworks',
        //     onDelete: 'CASCADE'
        // })
    }

    return Artist
}