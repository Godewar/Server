var mongoose = require("mongoose");

const jobcartSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    order_id: {
      type: String,
    },
    first_name: {
      type: String,
    },
    email: {
      type: String,
    },
    location: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("jobcart", jobcartSchema);
