module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define(
      "Admin",
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
          defaultValue: 0,
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
  
    Admin.associate = (models) => {
        Admin.hasOne(models.AdminProfile, {
        foreignKey: "adminId",
        as: "adminprofile",
        onDelete: "CASCADE",
      });
    };
  
    return Admin;
  };
  