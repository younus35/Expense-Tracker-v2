// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const downloadFile = sequelize.define("downloadFile",{
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         allowNull: false,
//         autoIncrement: true,
//     },
//     fileUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     }
// }, {timestamps: false})

// module.exports = downloadFile;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const downloadSchema = new Schema({
    fileUrl:{
        type: String,
        required: true 
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
      }
})

module.exports = mongoose.model('Download', downloadSchema);