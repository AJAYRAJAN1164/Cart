const express =require('express');
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
var db=require('./config/connection');
const cors=require('cors');

const PORT=3000
const app =express()

app.use(cors());


db.connect((err)=>{
    if(err) console.log("Connection Error"+err);
    else console.log("Database Connected to port 27017");
    }); 



const api=require('./routes/api')
app.use(bodyParser.json())
app.use('/api',api) 




app.get('/',(req,res)=>{
    res.send("hello from server")

})

mongoose.connect("mongodb://localhost:27017/node-auth",{
    useFindAndModify: true,
    useUnifiedTopology: true,
    useNewUrlParser: true
  }); 

app.listen(PORT,function(){ 
    console.log("server is running on port"+PORT);
})       