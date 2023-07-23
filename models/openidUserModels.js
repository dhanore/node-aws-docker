const mongoose = require("mongoose");

const openIdUserSchema = new mongoose.Schema({
  oid: { type: String, required: true },
  displayName: { type: String, required: true },
  email: { type: String }
});

module.exports = mongoose.model("OpenIdUser", openIdUserSchema);
