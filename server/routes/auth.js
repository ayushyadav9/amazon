const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middlewares/fetchuser");

const JWT_SECRET = "hellohowareyou";

router.post("/createUser",[
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({min: 5,}),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({success,error: "Sorry the user with this email alredy exists",});
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        email: req.body.email,
        password: secPass,
      });
      const data = {
        user: { id: user.id },
      };
      success = true;
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({ success, authToken });

      //if other errors
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

router.post("/login",[
    body("email", "Enter a valid name").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }

      const passComp = await bcrypt.compare(password,user.password);
      if (!passComp) {
        return res.status(400).json({success, error: "Please try to login with correct credentials" });
      }

      const data = {
        user: { id: user.id },
      };
      success = true
      const authToken = jwt.sign(data, JWT_SECRET);
      res.json({success, authToken });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal error occured");
    }
  }
);

router.post('/getUser',fetchuser, async (req,res)=>{
    try {
        const userId = req.user.id;
        const user = await User.findOne({userId}).select("-password")
        res.send(user)
        
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal error occured");
      }
})

module.exports = router;
