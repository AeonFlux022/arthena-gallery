const ART_FORMS = require("../const/artworks/artFormConstants.js");
const ORIENTATION = require("../const/artworks/orientationConstants.js");
const STATUS = require("../const/artworks/statusConstants.js");

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
      yearMade: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      active: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
      // // added orientation field, base lang gyapon sa const directory for enum values
      orientation: {
        type: DataTypes.ENUM(...Object.values(ORIENTATION)),
        allowNull: false,
        validate: {
          isIn: {
            args: [Object.values(ORIENTATION)],
            msg: "Invalid Orientation",
          },
        },
      },
      // // gin shorthand method ko ang enums men, ara ang values nila sa const directory
      artForms: {
        type: DataTypes.ENUM(...Object.values(ART_FORMS)),
        allowNull: true,
        validate: {
          isIn: {
            args: [Object.values(ART_FORMS)],
            msg: "Invalid Art Form",
          },
        },
      },
      // // old format ka enums
      // artForms: {
      //   type: DataTypes.ENUM,
      //   values: [ART_FORMS.PAINTINGS, ART_FORMS.DRAWINGS, ART_FORMS.PRINT, ART_FORMS.SCULPTURE],
      //   allowNull: true,
      //   validate: {
      //     isIn: [[ART_FORMS.PAINTINGS, ART_FORMS.DRAWINGS, ART_FORMS.PRINT, ART_FORMS.SCULPTURE]],
      //   }
      // },

      // // gin shorten ko ang enums men, ara ang values nila sa const directory
      status: {
        type: DataTypes.ENUM(...Object.values(STATUS)),
        defaultValue: STATUS.ON_HOLD,
        allowNull: false,
        validate: {
          isIn: {
            args: [Object.values(STATUS)],
            msg: "Invalid STATUS",
          },
        },
      },
      // // old format ka enums
      //   type: DataTypes.ENUM(
      //     "FOR SALE",
      //     "SOLD",
      //     "ON HOLD",
      //     "PENDING APPROVAL",
      //     "UNDER REVIEW",
      //     "UNAVAILABLE",
      //     "ARCHIVED",
      //     "RESERVED"
      //   ),
      //   defaultValue: "ON HOLD",
      //   allowNull: false,
      // },

      // // OTHER POSSIBLE FIELDS FOR FUTURE REFERENCES
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
    Artwork.belongsToMany(models.User, {
      through: "artist_artworks",
      as: "users",
      foreignKey: "artworkId",
      otherKey: "userId",
    });
  };

  return Artwork;
};
