var express = require("express");
var router = express.Router();
var userModel = require("../models/User.js");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("dashboard", { title: "Express" });
});
router.get("/about", function (req, res, next) {
  res.render("about", { title: "Express" });
});

router.post("/sumprocess", function (req, res, next) {
  var a = req.body.no1;
  var b = req.body.no2;
  var c = parseInt(a) + parseInt(b);
  res.render("sumprocess", { abc: a, myb: b, myc: c });
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/add", function (req, res, next) {
  res.render("add");
});

router.post("/add", function (req, res, next) {
  // console.log(req.body);
  console.log(req.files.file123);
  var fileobject = req.files.file123;
  fileobject.mv("public/upload/" + fileobject.name, function (err) {
    var bodydata = {
      uname: req.body.name,
      uprice: req.body.price,
      udetails: req.body.details,
      imageurl: fileobject.name,
    };
    var mydata = userModel(bodydata);
    mydata
      .save()
      .then(() => res.redirect("/show"))
      .catch(() => res.send("Erro"));

    // res.send("Recored Added!");
  });
});

router.get("/showproductAPI", function (req, res) {
  userModel.find().then((data) => {
    res.json(data);
  });
});

router.get("/show", function (req, res, next) {
  userModel
    .find()
    .then((data) => {
      // console.log(data);
      // res.render(data)
      // res.send(data)
      res.render("show", { mydata: data });
    })
    .catch((err) => console.log("Error" + err));
});

router.get("/delete/:id", function (req, res, next) {
  // var myid = req.params.id;
  userModel
    .findByIdAndDelete(req.params.id)
    .then(() => {
      res.redirect("/show");
    })
    .catch((err) => res.send(err));
});

router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/contact", function (req, res) {
  res.render("contact");
});

module.exports = router;
