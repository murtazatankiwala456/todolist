import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import 'dotenv/config'

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.mongodb_URI);
const itemsSchema = {
  name: String,
};
const Item = mongoose.model("Item", itemsSchema);

app.get("/", async (req, res) => {
  try {
    const date = new Date();
    const options = { weekday: "long", day: "numeric", month: "long" };
    const formattedDate = date.toLocaleDateString("en-US", options);

    const foundItems = await Item.find({});
    res.render("index.ejs", { newDate: formattedDate, items: foundItems });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.send("Internal Server Error");
  }
});

app.post("/add", (req, res) => {
  const itemName = req.body.item;
  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  try {
    const itemId = req.body.checkbox;

    await Item.findByIdAndDelete(itemId);
    console.log("deleted successfully!");
    res.redirect("/");
  } catch (error) {
    console.error("Not deleted", error);
    res.send("Some error");
  }
});

app.listen(port, (req, res) => {
  console.log(`listening the server on the port ${port} `);
});
