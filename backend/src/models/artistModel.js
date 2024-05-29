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

    return Artist
}