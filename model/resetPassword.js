// const Sequelize = require("sequelize");
// const sequelize = require("../util/database");

// const ResetPassword = sequelize.define("resetpassword", {
//   id: {
//     type: Sequelize.STRING,
//     primaryKey: true,
//     allowNull: false,
//   },
//   isActive: Sequelize.BOOLEAN,
// });

// module.exports = ResetPassword;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetPasswordSchema = new Schema ({
    _id: {
      type: String, // UUIDs are strings
      required: true
    },
    isActive: {
      type: Boolean
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
})

module.exports = mongoose.model('ResetPassword', resetPasswordSchema);