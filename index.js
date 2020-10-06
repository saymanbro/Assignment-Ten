const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j3y1z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
const ObjectId = require("mongodb").ObjectId;

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors());


app.get('/', (req, res) =>{
    res.sendFile(__dirname + './../client-site/volunteer-site/src/Component/TaskName/TaskName.js');
    res.send('failed ami bro')
})




client.connect(err => {
  const tasks = client.db("valuenteer").collection("variousTask");
  const registeredUser = client.db("valuenteer").collection("registeredUser");
    app.post('/registeredEvent', (req, res)=>{
        const event =req.body
        registeredUser.insertOne(event)
        .then(result => {
            console.log(result);
          res.redirect('/')
        })
    })
    app.get('/showEventItem',(req, res)=>{
        // console.log(req.query.email)
        registeredUser.find({Email: req.query.email})
        .toArray((err, documents) => {      
             res.send(documents)  
                      })
         })

    app.delete('/delete/:id',(req,res) => {
        registeredUser.deleteOne({_id: ObjectId(req.params.id)})
        .then(result =>{
            res.send(result.deletedCount>0);
        })
    })
   
    
    app.get('/task', (req, res) => {
        tasks.find({})
        .toArray((err, documents) =>{
            res.send(documents)
        })
    });
     console.log(err);
    
  
   })
    



    app.post('/addTaskName',(req, res) => {
        const task = req.body;
        tasks.insertOne(task)
        .then(result =>{        
        })
        res.send('successfully') 
    })

   

   






app.listen(process.env.PORT || 4000)