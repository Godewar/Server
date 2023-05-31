const jobCart = require("../models/jobcartModel");
const app = require("express").Router();

app.post("/addjobcart", async (req, res) => {
  try {
    const jobcart = new jobCart({
      name: req.body.name,
      order_id: req.body.order_id,
      first_name: req.body.first_name,
      email: req.body.email,
      location: req.body.location,
    });
    await jobcart.save();
    return res.status(200).send(jobcart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/jobcarts", async (req, res) => {
  try {
    const jobcart = await jobCart.find().lean().exec();
    return res.status(200).send(jobcart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/jobcart/:_id", async (req, res) => {
  try {
    const jobcart = await jobCart.find({ _id: req.params._id }).lean().exec();
    return res.status(200).send(jobcart);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.delete("/deletejobcart/:_id", async (req, res) => {
  try {
    const deleteRole = await jobCart
      .findOneAndDelete({ _id: req.params._id })
      .lean()
      .exec();
    return res.status(200).send(deleteRole);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.put("/individualData/:name", async (req, res) => {
  try {
    const project = await jobCart.findOneAndUpdate(
      { name: req.params.name },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
        },
      }
    );
    return res.status(200).send(project);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

////////////////////   >>>>>

app.put("/addfield/:_id", async (req, res) => {
  try {
    const addfield = await jobCart.findOneAndUpdate(
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
});
/////////////////////////   <<<<<

app.put("/removeProduct/:name", async (req, res) => {
  console.log(req.body);
  try {
    const assign = await jobCart.findOneAndUpdate(
      { name: req.params.name },
      {
        $pull: {
          products: req.body.products,
        },
      }
    );
    return res.status(200).send(assign);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

module.exports = app;
