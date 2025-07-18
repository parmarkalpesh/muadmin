const express = require("express");
const router = express.Router();
const path = require("path");
const userModel = require("../models/User");

// ✅ Home page
router.get("/", (req, res) => {
  res.render("dashboard", { title: "Dashboard" });
});

// ✅ About page
router.get("/about", (req, res) => {
  res.render("about", { title: "About Us" });
});

// ✅ Contact page
router.get("/contact", (req, res) => {
  res.render("contact", { title: "Contact Us" });
});

// ✅ Sum process
router.post("/sumprocess", (req, res) => {
  const a = parseInt(req.body.no1, 10);
  const b = parseInt(req.body.no2, 10);
  const c = a + b;
  res.render("sumprocess", { abc: a, myb: b, myc: c });
});

// ✅ Add product form
router.get("/add", (req, res) => {
  res.render("add");
});

// ✅ Handle add product form submission
router.post("/add", async (req, res) => {
  try {
    if (!req.files || !req.files.file123) {
      return res.status(400).send("No file uploaded.");
    }

    const fileobject = req.files.file123;
    const uploadPath = path.join(__dirname, "..", "public", "upload", fileobject.name);

    // move file
    await fileobject.mv(uploadPath);

    const newProduct = new userModel({
      uname: req.body.name,
      uprice: req.body.price,
      udetails: req.body.details,
      imageurl: fileobject.name,
    });

    await newProduct.save();
    res.redirect("/show");
  } catch (err) {
    console.error("❌ Error saving data:", err);
    res.status(500).send("Error saving data");
  }
});

// ✅ Show product list as JSON
router.get("/showproductAPI", async (req, res) => {
  try {
    const data = await userModel.find();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// ✅ Show product list in EJS
router.get("/show", async (req, res) => {
  try {
    const data = await userModel.find();
    res.render("show", { mydata: data });
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    res.status(500).send("Error fetching data");
  }
});

// ✅ Delete product
router.get("/delete/:id", async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.redirect("/show");
  } catch (err) {
    console.error("❌ Error deleting data:", err);
    res.status(500).send("Error deleting data");
  }
});

module.exports = router;
