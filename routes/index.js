var express = require("express");
var router = express.Router();
var userModel = require("../models/User.js");

// ✅ Home page
router.get("/", (req, res) => {
  res.render("dashboard", { title: "Express" });
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
  let a = parseInt(req.body.no1);
  let b = parseInt(req.body.no2);
  let c = a + b;
  res.render("sumprocess", { abc: a, myb: b, myc: c });
});

// ✅ Add product form
router.get("/add", (req, res) => {
  res.render("add");
});

// ✅ Handle add product form submission
router.post("/add", (req, res) => {
  if (!req.files || !req.files.file123) {
    return res.status(400).send("No file uploaded.");
  }

  let fileobject = req.files.file123;
  let uploadPath = "public/upload/" + fileobject.name;

  fileobject.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    let bodydata = {
      uname: req.body.name,
      uprice: req.body.price,
      udetails: req.body.details,
      imageurl: fileobject.name,
    };

    let mydata = new userModel(bodydata);
    mydata
      .save()
      .then(() => res.redirect("/show"))
      .catch((err) => {
        console.error("Error saving data:", err);
        res.status(500).send("Error saving data");
      });
  });
});

// ✅ Show product list (API JSON)
router.get("/showproductAPI", (req, res) => {
  userModel
    .find()
    .then((data) => res.json(data))
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    });
});

// ✅ Show product list (EJS)
router.get("/show", (req, res) => {
  userModel
    .find()
    .then((data) => {
      res.render("show", { mydata: data });
    })
    .catch((err) => {
      console.error("Error fetching data:", err);
      res.status(500).send("Error fetching data");
    });
});


// ✅ Delete product
router.get("/delete/:id", (req, res) => {
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/show");
    })
    .catch((err) => {
      console.error("Error deleting data:", err);
      res.status(500).send("Error deleting data");
    });
});

module.exports = router;
