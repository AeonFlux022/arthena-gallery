// 'use strict';

// const { DataTypes } = require('sequelize');

// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
// });

// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// // Importing models
// db.artist = require('./artistModel.js')(sequelize, DataTypes)
// db.artistprofile = require('./artistProfileModel.js')(sequelize, DataTypes)
// db.artwork = require('./artworkModel.js')(sequelize, DataTypes)

// // Relationships
// // One to One
// db.artist.hasOne(db.artistprofile, {
//   foreignKey: 'artistId',
//   as: 'artistprofile',
//   onDelete: 'CASCADE'
// })
// db.artistprofile.belongsTo(db.artist, {
//   foreignKey: 'artistId',
//   as: 'artist'
// })

// // Many to Many
// db.artist.belongsToMany(db.artwork, {
//   through: 'Artist_Artworks',
//   as: 'artworks',
//   timestamps: false
// })
// db.artwork.belongsToMany(db.artist, {
//   through: 'Artist_Artworks',
//   as: 'artists',
//   timestamps: false
// })

// module.exports = db;

// ---------------------------------------------------------
// STRUCTURE NI KEVIN //
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
