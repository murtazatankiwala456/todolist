import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}));

const items =[]

app.get("/", (req,res) =>{
    const date = new Date();

const options = { weekday: 'long', day: 'numeric', month: 'long' };
const formattedDate = date.toLocaleDateString('en-US', options);


    res.render("index.ejs", {items:items, newDate: formattedDate})
})

app.post("/add", (req,res) =>{
    const item =req.body.item
    items.push(item);
    res.redirect("/")
    
});



app.listen(port, (req,res) =>{
    console.log(`listening the server on the port ${port} `)
})