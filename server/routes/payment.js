const express = require("express");
const router = express.Router();
const Bought = require("../models/Bought");
const fetchuser = require("../middlewares/fetchuser");
const stripe = require("stripe")('sk_test_51JcuAuSBnBY4ApEvO2q8lEiTgyzlwFPbngutyscc6Xulwj1y1ooG3S13ZWCMUC0bFiB4a07FmBOYV8tFH6N2KwPD00ArXjtnNd');


router.get('/fetchOrders',fetchuser, async (req,res)=>{
    try {
        const orders = await Bought.find({ user: req.user.id });
        res.json(orders);
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured");
    }
})



router.post('/addOrder',fetchuser,async (req, res) => {
    try {
      // const { title, price, rating, image } = req.body;
      const {item} = req.body;
      const order = Bought({ user: req.user.id, item: item });
      const savedOrders = await order.save();
      res.send(savedOrders);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
})



router.post('/payments/create',async(req,res)=>{
    const total = req.query.total
    console.log(total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
})

module.exports = router;