var express = require("express");
var router = express.Router();
var userModel = require('../models/User.js')

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
  var bodydata = {
    uname: req.body.name,
    uprice: req.body.price,
    udetails: req.body.details,
  };
  var mydata = userModel(bodydata);
  mydata.save();
  res.send("Recored Aedd!");
});

router.get("/show", function (req, res, next) {
  userModel.find()
  .then(data =>{
    console.log(data)
    res.render("show",{mydata:data});
  })
  .catch(err=>console.log("Error" +err))
});


router.get("/about", function (req, res, next) {
  res.render("about");
});

router.get("/contact",function(req,res){
  res.render("contact")
})

module.exports = router;
