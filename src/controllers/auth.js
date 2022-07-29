const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
//User create account
exports.signup = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec(async (error, user) => {
    //if get user
    if (user)
      return res.status(400).json({ message: "User already registered!" });

    //get user data from req body
    const { firstName, lastName, email, password } = req.body;
    const hash_password = await bcrypt.hash(password, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      hash_password,
      username: shortid.generate(),
    });

    _user.save((error, data) => {
      console.log(error);
      //user save error
      if (error) {
        res.status(400).json({
          message: "Something went wrong!",
        });
      } //user create successfully done
      if (data) {
        res.status(201).json({
          message: "User created successful",
        });
      }
    });
  });
};

//User signing

exports.signing = async (req, res) => {
  await User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) res.status(400).json({ error });
    //if get user then signing
    if (user) {
      //check password valid
      if (user.authenticate(req.body.password) && user.role === "user") {
        // if signing is valid then create token
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );
        //Destructure
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        res.status(400).json({
          message: "Something went wrong!",
        });
      }
    } else {
      return res.status(400).json({
        message: "Something went wrong!",
      });
    }
  });
};
