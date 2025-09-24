const userModel = require("../models/userModels");

// READ (all users)
async function getUsers(req, res) {
  try {
    const users = await userModel.find();
    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// READ (by email or name search)
async function getUser(req, res) {
  try {
    const searchTerm = req.query.q;
    if (!searchTerm) {
      return res.status(400).json({ error: "Search query is required" });
    }

    const regex = new RegExp(searchTerm, "i");
    const users = await userModel.find({
      $or: [{ email: regex }, { name: regex }],
    });

    if (users.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    return res.json(users);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// CREATE
async function addUser(req, res) {
  try {
    const userExist = await userModel.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).json({ error: "user already exists!" });
    }

    const user = new userModel(req.body);
    await user.save();

    return res.status(201).json({ message: "user added successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}



// UPDATE
async function updateUser(req, res) {
  try {
    const result = await userModel.updateOne(
      { email: req.body.email },
      { $set: req.body }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "user not found!" });
    }

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "No changes made" });
    }

    return res.json({ message: "user updated successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

// DELETE
async function deleteUser(req, res) {
  try {
    const result = await userModel.deleteOne({ email: req.body.email });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "user not found!" });
    }

    return res.json({ message: "user deleted successfully!" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
