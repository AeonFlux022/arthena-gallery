module.exports = (sequelize, DataTypes) => {
    const AdminProfile = sequelize.define(
      "AdminProfile",
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        middleName: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        phoneNumber: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        image: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    // AdminProfile.associate = (models) => {
    //   AdminProfile.belongsTo(models.Admin, {
    //     foreignKey: "adminId",
    //     as: "admin",
    //   });
    // };

    AdminProfile.associate = (models) => {
      AdminProfile.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    };
  
    return AdminProfile;
  };
  