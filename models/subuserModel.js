const mongoose = require("mongoose");

const subuserSchema = mongoose.Schema(
  {
    title: {
      type: String,
      // required: true,
    },
    position: {
      type: String,
      // required: true,
    },
    first_name: {
      type: String,
      // required: true,
    },
    last_name: {
      type: String,
      // required: true,
    },
    area: {
      type: String,
      // required: true,
    },
    phone: {
      type: Number,
      // required: true,
    },
    email: {
      type: String,
      // required: true,
    },
    password: {
      type: String,
      // required: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "User",
    // },

    additional_data: [
      {
        order_name: { type: String },
        order: { type: String },
      },
    ],
    // vehicle_location: [
    //   {
    //     pickup: {
    //       type: String,
    //     },
    //     drop: {
    //       type: String,
    //     },
    //   },
    // ],
    products: [
      {
        id: { type: Number },
        name: { type: String },
        price: { type: Number },
      },
    ],

    /////
  },
  {
    timestamps: true,
  }
);

const Subuser = mongoose.model("Subuser", subuserSchema);

module.exports = Subuser;
