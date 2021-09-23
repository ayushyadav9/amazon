/* eslint-disable */
const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")('sk_test_51JcuAuSBnBY4ApEvO2q8lEiTgyzlwFPbngutyscc6Xulwj1y1ooG3S13ZWCMUC0bFiB4a07FmBOYV8tFH6N2KwPD00ArXjtnNd');
// API

// - App config
const app = express();

// -Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/",  ((req, res)=> res.status(200).send("hello world")));

app.post('/payments/create', async (req,res) => {
    const total = req.query.total
    console.log(total)

    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "inr",
    });
    res.status(201).send({
        clientSecret: paymentIntent.client_secret
    });
});

// - Listen command
exports.api = functions.https.onRequest(app);


// http://localhost:5001/fir-30f81/us-central1/api