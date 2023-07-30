//jshint esversion:6

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs = require('ejs');

let items = ["Buy food", "Eat food", "Walking"];

let workItems = [];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get("/", function (req, res) {
   let options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    let today = new Date();
    let day = today.toLocaleDateString("en-US", options)
    res.render("list", { listStyle: day, newItems: items })

})

app.post("/", function (req, res) {

    let item = req.body.item;
    console.log(req.body);

    if(req.body.list==="Work") {
        workItems.push(item);
        res.redirect("/work");


    } else {
        items.push(item);
        res.redirect("/");

    }




})


app.get("/work", function (req, res) {
    res.render("list", {listStyle:"Work List", newItems: workItems });
})

app.post("/work", function (req, res) {
    res.render("list", {listStyle:"Work List", newItems: workItems });
    item = req.body.item;
    workItems.push(item);
    redirect("/work");
})

app.get("/about",function(req,res){
    res.render("about");
})



app.listen(3000, function () {
    console.log("server is running successfully");
})
