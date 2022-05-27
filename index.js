const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_KEY)
dotenv.config();
const URL = 'mongodb+srv://vjdev:asdfghjkl@trainingcluster.4eb06.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(URL,async()=>{
  try {
    console.log('DataBase connected');
  } catch (error) {
    console.error(error);
  }
});


app.use(express.json());
app.use(cors())
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log("\x1b[33m",`Server is Running ${port}`));
