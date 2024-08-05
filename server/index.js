const express = require("express");
const users = require("./sample.json");
const cors = require("cors");
const fs = require("fs");


const app = express();
app.use(express.json());

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
//delete users
app.delete("/users/:id",(req,res)=>{
    let id = Number(req.params.id)
    let filteredUser= users.filter((user) => user.id !== id );
    console.log( filteredUser);
    fs.writeFile("./sample.json",JSON.stringify(filteredUser),(err,data)=>{
        return res.json(filteredUser);
      })
    })

    //for add users
 app.post("/users",(req,res)=>{

 let {name,age,city} = req.body;

  if(!name || !age || !city){
    res.status(400).send({message:"Fill All Fields"});
  }
  let id = Date.now();
  users.push({id,name,age,city});

  fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
     return res.json({message: "Successfully Added"});
  })
  
})

app.patch("/users/:id",(req,res)=>{
  let id = Number(req.params.id);
  let {name,age,city} = req.body;
 
   if(!name || !age || !city){
     res.status(400).send({message:"Fill All Fields"});
   }
let index = users.findIndex((user)=> user.id === id);

users.splice(index,1,{...req.body})
 
   fs.writeFile("./sample.json",JSON.stringify(users),(err,data)=>{
      return res.json({message: "Successfully Updated"});
   })
   
 })


app.listen(port, (res)=>{
console.log("Server running on port " + port);
})

 
