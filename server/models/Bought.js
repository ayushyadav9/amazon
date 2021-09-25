const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

})

const BoughtSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  item: [OrderSchema],

  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("bought", BoughtSchema);
