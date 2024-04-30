import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";


const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect('mongodb://127.0.0.1:27017/todolistDB');
const itemsSchema ={
    name: String
}
const Item = mongoose.model("Item", itemsSchema)
const item1 = new Item({
    name:"cook Food"
})
const item2 = new Item({
    name:"eat Food"
})
const item3 = new Item({
    name:"serve Food"
})

const defaultItems = [item1,item2,item3]


app.get("/", async (req, res) => {
    try {
      const date = new Date();
      const options = { weekday: 'long', day: 'numeric', month: 'long' };
      const formattedDate = date.toLocaleDateString('en-US', options);
  
      const foundItems = await Item.find({});

    if(foundItems.length === 0){
        Item.insertMany(defaultItems)
        res.redirect("/")


    }else{
      
        res.render("index.ejs", {newDate: formattedDate, items: foundItems,  });
    }
     
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.post("/add", (req,res) =>{
    const itemName =req.body.item
    const item = new Item({
        name: itemName
    });
    item.save()
    res.redirect("/")

    
});



app.listen(port, (req,res) =>{
    console.log(`listening the server on the port ${port} `)
})