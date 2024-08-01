const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");
const { log } = require("console");

const app = express();
const port = 8000;

app.use(
    cors({
    "origin":"*",
    "methods":["GET","POST","PATCH","DELETE"],
   "preflightContinue":false,
    "optionsSuccessStatus":204
  
}));

//display users
app.get("/users",(req,res)=>{
return res.json(users);
})

app.delete("/users/:id",(req,res)=>{
    let id = Number(req.params.id)
    let filteredUser= users.filter((user) => user.id !== id );
    console.log( filteredUser);
    fs.writeFile("./sample.json",JSON.stringify(filteredUser),(err,data)=>{
        return res.json(filteredUser);
      
    })
    
})
app.listen(port, (res)=>{
console.log("Server running on port " + port);
})


