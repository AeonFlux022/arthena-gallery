module.exports = (sequelize, DataTypes) => {
    const ArtistProfile = sequelize.define('ArtistProfile', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        middleName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        bio: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }, {
        freezeTableName: true
    })

    return ArtistProfile
}