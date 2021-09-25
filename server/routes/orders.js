const express = require("express");
const router = express.Router();
const fetchuser = require("../middlewares/fetchuser");
// const { body, validationResult } = require("express-validator");
const Orders = require("../models/Orders");

router.get('/fetchOrders',fetchuser, async (req,res)=>{
    try {
        const orders = await Orders.find({ user: req.user.id });
        res.json(orders);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})

router.post('/addOrder',fetchuser,async (req, res) => {
    try {
      const { title, price, rating, image } = req.body;

      const order = Orders({ title, price, rating, image, user: req.user.id });
      const savedOrders = await order.save();
      res.send(savedOrders);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})

router.delete('/delete/:id',fetchuser,async (req,res)=>{
  try {
    //find the note to be delted and delete it
    let order = await Orders.findById(req.params.id);
    if (!order) {
      return res.status(404).send("Not found");
    }

    //Allow deletion only if user owns this note
    if (order.user.toString() !== req.user.id) {
      return res.status(401).send("Not allowed");
    }

    order = await Orders.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", order: order });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured");
  }
})

module.exports = router;