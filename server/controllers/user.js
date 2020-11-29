const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/user");
const { randomString } = require("../custom");

const {
  JWT_SECRET,
  EMAIL_HOST,
  EMAIL_PORT,
  EMAIL_USER,
  EMAIL_PASSWORD,
} = require("../env");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "48h" }
  );
}

function capitalizeName(s) {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

module.exports = {
  login: async (req, res, next) => {
    const { emailorusername, password, member } = req.logInValue.body;
    let msg = "";
    let key = "";
    let type = "";
    try {
      // Compare passwords
      const match = await bcrypt.compare(password, member.password);
      // If password does not match - end/return error
      if (!match) {
        msg = "Wrong credentials";
        key = "password";
        type = "invalid.password";
        return res.json({ success: false, msg, key, type });
      }
      // Generate new Token
      const token = generateToken(member);
      const user = {
        id: member._id,
        email: member.email,
        fullname: member.fullname,
        username: member.username,
      };
      res.json({ success: true, token, user });
    } catch (e) {
      const msg = "Connection Error";
      const key = "REGISTER";
      const type = "register";
      return res.status(400).json({ success: false, msg, key, type });
    }
  },
  register: async (req, res, next) => {
    const { fullname, username, email, password } = req.regValue.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const emailCheck = await User.findOne({ email: req.body.email });
      const usernameCheck = await User.findOne({ username: req.body.username });
      if (emailCheck) {
        msg = "Email already exist";
        key = "email";
        type = "invalid.email";
        return res.json({ success: false, msg, key, type });
      }
      if (usernameCheck) {
        msg = "Username already exist";
        key = "username";
        type = "invalid.username";
        return res.json({ success: false, msg, key, type });
      }
      // Create new Member
      const newUser = new User({
        fullname: capitalizeName(fullname),
        username,
        email,
        password: hashedPassword,
      });

      newUser.bank.credit = 55000; // REMOVE THIS AFTER TESTING API
      // Save new Member
      const member = await newUser.save();
      // Generate new Token
      const token = generateToken(member);
      const user = {
        id: member._id,
        email: member.email,
        fullname: member.fullname,
        username: member.username,
      };
      res.json({ success: true, token, user });
    } catch (e) {
      const msg = "Connection Error";
      const key = "REGISTER";
      const type = "register";
      return res.status(400).json({ success: false, msg, key, type });
    }
  },
  authenticate: async (req, res, next) => {
    const { id } = req.payload;
    try {
      const member = await User.findById(id);
      if (!member) {
        msg = "User does not exist";
        key = "user";
        type = "invalid.user";
        return res.status(400).json({ success: false, msg, key, type });
      }
      const user = {
        id: member._id,
        fullname: member.fullname,
        email: member.email,
        username: member.username,
      };
      res.json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  },

  changePassword: async (req, res) => {
    const { newPassword, id } = req.body;

    try {
      const user = await User.findById(userid);
      if (!user) {
        return res.json({
          success: false,
          error: true,
          msg: "user not found",
        });
      }

      if (!newPassword.trim().length || newPassword.trim().length < 6) {
        return res.json({
          success: false,
          error: true,
          msg: "Password must be more than 5 digits",
        });
      }

      if (newPassword.trim().length > 50) {
        return res.json({
          success: false,
          error: true,
          msg: "Password too long",
        });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      user.password = hashedPassword;
      user.passwordResetValue = "";
      await user.save();

      return res.json({ success: true, msg: "Your password has been reset" });
    } catch (e) {
      return res.json({ success: false, msg: "Error code 342" });
    }
  },

  resetPassword: async (req, res) => {
    const { email } = req.body;

    try {
      const user = await User.find({ email });
      if (!user || !user.length) {
        return res.json({
          success: false,
          msg: "This email is not registered on this site. Try Again!",
        });
      }

      const passwordResetValue = randomString(7).toUpperCase();
      const hashedPassword = await bcrypt.hash(passwordResetValue, 12);

      user[0].password = hashedPassword;
      user[0].passwordResetValue = passwordResetValue;

      var transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true, // use SSL
        auth: {
          user: EMAIL_USER,
          pass: EMAIL_PASSWORD,
        },
        logger: true,
      });

      const html = `<html><body><div style="padding: 10px; font-size: 18px;">Hello <b> ${user[0].fullname}</b>, your request to change your password is successfull.<div style="width: 100%; text-align: center;">  <div style="font-weight: 900; margin: 10px; font-size: 23px;">    Account Details  </div>  <hr style="width: 300px;" />  <div style="margin: 5px 5px;">    <b>Email </b> <br />    <span style="font-family: monospace; letter-spacing: 0.07em;">${user[0].email}</span    >  </div>  <div style="margin: 5px 5px;">    <b>New Password </b> <br />    <div style="font-family: monospace; letter-spacing: 0.3em; padding: 5px; background-color: #2196f3; border-radius: 5px; font-size: 15px; color: white; font-weight: 600; width: auto; display: inline-block;">${passwordResetValue}</div>  </div></div><p style="font-size: larger;">  After you log in, go to your the account page and please change your password to a more secure password.</p></div><hr /></body></html>`;

      var mailOptions = {
        from: EMAIL_USER,
        to: email,
        subject: "Request to reset password",

        html,
      };

      const info = await transporter.sendMail(mailOptions);

      if (info.accepted.length) {
        await user[0].save();

        return res.json({
          success: true,
          msg:
            "Your password has been changed succesfully. Your new password has been sent to " +
            email,
          email,
        });
      }

      return res.status(500).json({
        success: false,
        msg: "An error occured. Kindly Try again",
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        msg: "An error occured. Kindly Try again",
      });
    }
  },
  changeBankDetails: async (req, res) => {
    const { user, acc_name, acc_number, bank_name } = req.body;

    try {
      user.bank = {
        ...user.bank,
        acc_name,
        acc_number,
        bank_name,
      };
      await user.save();

      return res.json({
        success: true,
        msg: "Your bank details have been updated!",
      });
    } catch (e) {
      console.log(e);

      return res.status(500).json({
        success: false,
        msg: "An error occured. Kindly Try again",
      });
    }
  },
};
