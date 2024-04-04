const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const downloadFile = sequelize.define("downloadFile",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    fileUrl: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {timestamps: false})

module.exports = downloadFile;