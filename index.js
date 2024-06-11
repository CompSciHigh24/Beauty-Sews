const mongoose = require("mongoose");
const ejs = require("ejs");
const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method}: ${req.path}`);
  next();
});

const mongoDBConnectionString = "mongodb+srv://SE12:CSH2024@cluster0.xfcbvkb.mongodb.net/CSH2025?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoDBConnectionString)
  .then(() => {
    console.log("MongoDB connection successful.");
  })
  .catch((err) => console.log("MongoDB connection error:", err));


const infoSchema = new mongoose.Schema({
  username: { type: String },
  address: { type: String, required : true },
  email: { type : String, required : true, unique : true 

   },
  number :{
    type : Number, required : true, unique :true 
  }
});
const Info = mongoose.model("Info",infoSchema)


const itemSchema = new mongoose.Schema({
  itemname: { type: String, required: true, unique: true },
  price: { type: Number, requried : true, unique : true },
  material: { type: String, requred : true, unique : true },
});

const Item = mongoose.model("Item", itemSchema);




app.get("/info", (req, res) => {
  Info.findOne({})
    .then((data) => {
      res.json(data);
    });
});


app.get("/info", (req, res) => {
  info.find({}).then((data) => {
    res.json(data);
  });
});


app.post("/info", (req, res) => {
  const newInfo = new Info({
    username: req.body.username,
    address: req.body.address,
    email: req.body.email,
    number: req.body.number,

  });
  newInfo.save().then((info) => res.json(info));
});


app.get("/item", (req, res) => {
  Item.find({}).then((data) => {
    res.render("inventory.ejs",{data :data});
  });
});


app.post("/item", (req, res) => {
  const newItem = new Item({
    itemname: req.body.itemname,
    price: req.body.price,
    material: req.body.material,
  });
  newItem.save().then((item) => res.json(item));

});

const Loaner = new mongoose.Schema({
  type: { type: String, require: true },
  color: { type: String, require: false },
  quantity: { type: Number, require: true },

});

const LoanerItem = mongoose.model("LoanerItem", Loaner);

app.get("/", (req, res) => {
  LoanerItem.find({}).then((data) => {
    // change the response to render inventory.ejs
    res.render("items.ejs",{loaner: data});
  });
});
app.get('/addItem', (req, res) => {
  res.sendFile(__dirname + "/public/itemz.html")
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
