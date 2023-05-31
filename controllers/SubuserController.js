const Subuser = require("../models/subuserModel.js");
const asyncHandler = require("express-async-handler");

// @desc    Get logged in user subusers
// @route   GET /api/subusers
// @access  Private
const getSubusers = asyncHandler(async (req, res) => {
  const subusers = await Subuser.find();
  res.json(subusers);
});

//@description     Fetch single subuser
//@route           GET /api/subusers/:id
//@access          Public
const getSubuserById = asyncHandler(async (req, res) => {
  const subuser = await Subuser.findById(req.params.id);

  if (subuser) {
    res.json(subuser);
  } else {
    res.status(404).json({ message: "Subuser not found" });
  }

  res.json(subuser);
});

//@description     Create single subuser
//@route           GET /api/subusers/create
//@access          Private
const CreateSubuser = asyncHandler(async (req, res) => {
  const {
    title,
    position,
    first_name,
    last_name,
    area,
    phone,
    email,
    password,
  } = req.body;

  if (
    !title ||
    !position ||
    !first_name ||
    !last_name ||
    !area ||
    !phone ||
    !email ||
    !password
  ) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const subuser = new Subuser({
      // user: req.user._id,

      title,
      position,
      first_name,
      last_name,
      area,
      phone,
      email,
      password,
    });

    const createdSubuser = await subuser.save();

    res.status(201).json(createdSubuser);
  }
});

//@description     Delete single subuser
//@route           GET /api/subusers/:id
//@access          Private

const DeleteSubuser = async (req, res) => {
  try {
    const subuser = await Subuser.findById(req.params.id);

    if (!subuser) {
      return res.status(404).json({ message: "Subuser not found" });
    }

    await subuser.deleteOne();

    return res.status(200).json({ message: "Subuser deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Update a subuser
// @route   PUT /api/subusers/:id
// @access  Private

const UpdateSubuser = asyncHandler(async (req, res) => {
  const {
    title,
    position,
    first_name,
    last_name,
    area,
    phone,
    email,
    password,
    order_name,
    order,
    pickup,
    drop,
  } = req.body;

  const subuser = await Subuser.findById(req.params.id);

  if (!subuser) {
    return res.status(404).json({ message: "Subuser not found" });
  }

  subuser.title = title;
  subuser.position = position;
  subuser.first_name = first_name;
  subuser.last_name = last_name;
  subuser.area = area;
  subuser.phone = phone;
  subuser.email = email;
  subuser.password = password;

  subuser.additional_data = [{ order_name, order }];
  subuser.vehicle_location = [{ pickup, drop }];

  const updatedSubuser = await subuser.save();
  res.json(updatedSubuser);
});

// const UpdateSubuser = asyncHandler(async (req, res) => {
//   const {
//     title,
//     position,
//     first_name,
//     last_name,
//     area,
//     phone,
//     email,
//     password,
//   } = req.body;

//   const subuser = await Subuser.findById(req.params.id);

//   if (!subuser) {
//     return res.status(404).json({ message: "Subuser not found" });
//   }

//   subuser.title = title;
//   subuser.position = position;
//   subuser.first_name = first_name;
//   subuser.last_name = last_name;
//   subuser.area = area;
//   subuser.phone = phone;
//   subuser.email = email;
//   subuser.password = password;

//   const updatedSubuser = await subuser.save();
//   res.json(updatedSubuser);
// });

/////////////////////////VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV

// ===============---------------------------------------

// const UpdateSubusersubdata = asyncHandler(async (req, res) => {
//   const {
//     title,
//     position,
//     first_name,
//     last_name,
//     area,
//     phone,
//     email,
//     password,
//     name,
//     order,
//   } = req.body;

//   console.log("out::", name, order);

//   const subuser = await Subuser.findById(req.params.id);

//   if (!subuser) {
//     return res.status(404).json({ message: "Subuser not found" });
//   }

//   subuser.title = title;
//   subuser.position = position;
//   subuser.first_name = first_name;
//   subuser.last_name = last_name;
//   subuser.area = area;
//   subuser.phone = phone;
//   subuser.email = email;
//   subuser.password = password;

//   await subuser.updateOne({
//     $push: {
//       additional_data: { name, order },
//     },
//   });

//   const UpdateSubusersubdata = await Subuser.findById(req.params.id);
//   res.json(UpdateSubusersubdata);
// });
const UpdateSubusersubdata = asyncHandler(async (req, res) => {
  const {
    title,
    position,
    first_name,
    last_name,
    area,
    phone,
    email,
    password,
    name,
    // order_name,
    products,
    order,
  } = req.body;

  // Find the subuser by ID
  const subuser = await Subuser.findById(req.params.id);

  // If subuser is not found, return a 404 error
  if (!subuser) {
    res.status(404);
    throw new Error("Subuser not found");
  }

  // Update subuser fields
  subuser.title = title;
  subuser.position = position;
  subuser.first_name = first_name;
  subuser.last_name = last_name;
  subuser.area = area;
  subuser.phone = phone;
  subuser.email = email;
  subuser.password = password;

  subuser.products = products;

  // Add a new element to the `additional_data` array using $push operator
  await subuser.updateOne({
    $push: {
      additional_data: { name, order },
    },
  });

  // Find and return the updated subuser
  const UpdateSubusersubdata = await Subuser.findById(req.params.id);

  res.json(UpdateSubusersubdata);
});

// Define the route for updating subuser data
// router.put("/subusers/:id", updateSubuserData);
////////////////////////////////^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

const Subdataaddfield = async (req, res) => {
  try {
    const addfield = await Subuser.findOneAndUpdate(
      { _id: req.params._id },
      {
        $push: {
          products: { $each: req.body.products },
        },
      },
      { new: true }
    );
    return res.status(200).send(addfield);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

////////////////////    Addfields  ///////////////////////////////////////////

const Addfields = async (req, res) => {
  try {
    const addfield = await Subuser.findOneAndUpdate(
      { _id: req.params._id },
      {
        $push: {
          products: { $each: req.body.products },
        },
      },
      { new: true }
    );
    return res.status(200).send(addfield);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

////////////////////    Removefield findByIdAndUpdate  ///////////////////////////////////////////

const Deleteproducts = async (req, res) => {
  try {
    const subuser = await Subuser.findById(req.params.subuserId);
    if (!subuser) {
      return res.status(404).json({ message: "Subuser not found" });
    }

    const productId = req.params.productId;
    const productIndex = subuser.products.findIndex(
      (p) => p._id.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not found" });
    }

    subuser.products.splice(productIndex, 1);
    await subuser.save();

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// ////////////////////    Updatefield findByIdAndUpdate  ///////////////////////////////////////////

// const Updatefield = async (req, res) => {
//   try {
//     const updatedField = await Subuser.updateOne(
//       { _id: req.params._id },
//       { $push: { products: req.body } }
//     );
//     return res.status(200).send(updatedField);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// };

// const Updatefield = async (req, res) => {
//   try {
//     const updatedField = await Subuser.findByIdAndUpdate(
//       { _id: req.params._id },
//       {
//         $set: { "products.$[elem].name": req.body.name },
//       },
//       {
//         new: true,
//         arrayFilters: [{ "elem._id": req.body._id }],
//       }
//     );
//     return res.status(200).send(updatedField);
//   } catch (err) {
//     return res.status(500).send(err.message);
//   }
// };

const Updatefield = async (req, res) => {
  try {
    const updatedDoc = await Subuser.findOneAndUpdate(
      { _id: req.params._id, "products._id": req.body.id },
      {
        $set: { "products.$.name": req.body.name },
      },
      { new: true }
    );
    return res.status(200).send(updatedDoc);
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

// // xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

module.exports = {
  getSubuserById,
  getSubusers,
  CreateSubuser,
  DeleteSubuser,
  UpdateSubuser,
  UpdateSubusersubdata,
  Subdataaddfield,
  Addfields,
  Updatefield,
  Deleteproducts,
};
