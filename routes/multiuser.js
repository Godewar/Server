const multiUser = require("../models/multiuserModel");
const app = require("express").Router();

app.post("/addmultiUser", async (req, res) => {
  try {
    const multiuser = new multiUser({
      name: req.body.name,
      email: req.body.email,
      products: req.body.products,
    });
    await multiuser.save();
    return res.status(200).send(multiuser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/multiusers", async (req, res) => {
  try {
    const multiuser = await multiUser.find().lean().exec();
    return res.status(200).send(multiuser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.get("/multiuser/:name", async (req, res) => {
  try {
    const multiuser = await multiUser
      .find({ name: req.params.name })
      .lean()
      .exec();
    return res.status(200).send(multiuser);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

app.delete("/deletemultiUser/:name", async (req, res) => {
  try {
    const deleteRole = await multiUser
      .findOneAndDelete({ name: req.params.name })
      .lean()
      .exec();
    return res.status(200).send(deleteRole);
  } catch (err) {
    return res.status(500).send(err);
  }
});

app.put("/individualData/:name", async (req, res) => {
  try {
    const project = await multiUser.findOneAndUpdate(
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
    const addfield = await multiUser.findOneAndUpdate(
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
    const assign = await multiUser.findOneAndUpdate(
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
