const express = require('express');
const app= express();
var cors = require('cors')
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
var db

MongoClient.connect('mongodb+srv://elifberkay:berkay1234.@ceptesok-homz1.mongodb.net/sok?retryWrites=true&w=majority', (err, client) => {
    if (err) return console.log(err)
    db = client.db('sok') // whatever your database name is
    app.listen(3000, () => {
      console.log('listening on 3000')
    })
  })
  
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true , limit : '1mb'})); 
app.use(bodyParser.json());

app.get("/",async(req,res)=>{
   res.status(200).send("Hoşgeldiniz")
 })
app.get("/api/v1/products",async(req,res)=>{
    if(req.query.page=="undefined"){
        console.log(req.query.page)
        console.log( Number(req.query.page))
        req.query.page=1;
    }
     var cursor = await db.collection(req.query.order).find({"pagination.page":  Number(req.query.page), "info.categoryId":Number(req.query.categoryId)}).toArray(function(err, results) {
         if(err){
            res.status(204).send("err")
         }
         res.status(200).send(results[0])
         
      })
    }) 
