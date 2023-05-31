const express = require("express");
const {
  getSubuserById,
  getSubusers,
  CreateSubuser,
  DeleteSubuser,
  UpdateSubuser,
  UpdateSubusersubdata,
  // Subdataaddfield,
  Addfields,
  Updatefield,
  Deleteproducts,
} = require("../controllers/SubuserController.js");
const router = express.Router();
// const { protect } = require("../middleware/authMiddleware.js");

// router.route("/").get(protect, getSubusers);
// router
//   .route("/:id")
//   .get(getSubuserById)
//   .delete(protect, DeleteSubuser)
//   .put(protect, UpdateSubuser);
// router.route("/create").post(protect, CreateSubuser);

///// without protected  xxxxxxxxxxxxxxxxx//
router.route("/").get(getSubusers);
router
  .route("/:id")
  .get(getSubuserById)
  .delete(DeleteSubuser)
  .put(UpdateSubuser);

router.route("/create").post(CreateSubuser);

router.route("subdata/:id").put(UpdateSubusersubdata);

router.route("/addfields/:_id").put(Addfields);

router.route("/updatefield/:_id").put(Updatefield);

// delete 1_product by multi_selected_products by :id  ....>>>>
router
  .route("/subusers/:subuserId/products/:productId/delete")
  .delete(Deleteproducts);

module.exports = router;
