const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { Admin, AdminProfile } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = bcrypt.genSaltSync(10);

// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadFolder = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Secret key
const secretKey = require("../config/secretKey.js");

// CREATE A USER
router.post("/", async (req, res) => {
  try {
    const {
      role,
      firstName,
      middleName,
      lastName,
      username,
      email,
      password,
      phoneNumber,
      image,
    //   bio,
    //   gender,
    //   birthdate,
    //   age,
    //   address,
    } = req.body;

    const newAdmin = await Admin.create({ role });

    if (!firstName || !lastName || !username || !email || !password) {
      return res.status(400).send("Missing required fields for AdminProfile");
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newAdminProfile = await AdminProfile.create({
      adminId: newAdmin.id,
      firstName,
      middleName,
      lastName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      image,
    //   bio,
    //   gender,
    //   birthdate,
    //   age,
    //   address,
    });

    res.status(201).json({
      message: "Admin account created successfully",
      data: { newAdmin, newAdminProfile },
    });
  } catch (err) {
    console.error("Error in creating admin account:", err);
    res.status(500).json({
      err: "Failed to create admin account. Please try again later.",
    });
  }
});

// GET ALL USERS
router.get("/", async (req, res) => {
  const allAdmins = await AdminProfile.findAll({
    // include: [
    //   {
    //     model: AdminProfile,
    //     as: "adminprofile",
    //   },
    // ],
  });
  res.json(allAdmins);
});

// GET ONE USER
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const getAdmin = await AdminProfile.findOne({
      where: { id },
      // include: [
      //   {
      //     model: AdminProfile,
      //     as: "adminprofile",
      //   },
      // ],
    });

    if (!getAdmin) {
      return res.status(404).send({ error: "Admin not found" });
    }

    res.status(200).send(getAdmin);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while fetching the admin" });
  }
});

// UPDATE USER
router.put("/update/:id", upload.single("image"), async (req, res) => {
  const adminId = req.params.id;
  const {
    firstName,
    middleName,
    lastName,
    email,
    phoneNumber,
    // username,
    // password,
    // bio,
    // gender,
    // birthdate,
    // age,
    // address,
    // image: imageName,
  } = req.body;
  const image = req.file ? req.file.filename : null;

  try {
    const adminProfile = await AdminProfile.findOne({
      where: { adminId },
    });

    if (!adminProfile) {
      return res.status(404).json({ error: "Admin not found." });
    }
    adminProfile.firstName = firstName;
    adminProfile.middleName = middleName;
    adminProfile.lastName = lastName;
    adminProfile.email = email;
    adminProfile.phoneNumber = phoneNumber;
    // adminProfile.username = username;
    // adminProfile.bio = bio;
    // adminProfile.gender = gender;
    // adminProfile.birthdate = birthdate;
    // adminProfile.age = age;
    // adminProfile.address = address;

    // if (req.file) {
    //   adminProfile.image = req.file.filename; // Store the file name, not the file object
    // } else if (imageName) {
    //   adminProfile.image = imageName; // Use the provided image name
    // }

    if (image) {
        adminProfile.image = image;
    }

    await adminProfile.save();
    res.json({
      message: "Admin account updated successfully",
      data: { adminProfile },
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;