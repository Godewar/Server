var mongoose = require("mongoose");

const multiuserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    products: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("multiuser", multiuserSchema);
