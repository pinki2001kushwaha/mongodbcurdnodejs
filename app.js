const express=require('express')
require("./db/dbconnec")
const app=express();
const MesRanking =require('./models/mens');
const { model } = require('mongoose');
// const { model } = require('mongoose');
const port=5000;
app.use(express.json())

app.get('/api/user', async (req, res) => {
    try {
        const result = await MesRanking.find({});
        res.json(result);
    } catch (error) {
        console.log(error);
        
    }
});

app.post("/api/user", async (req, res) => {
    try {
        const { sid, name, age } = req.body;
        const newUser = new MesRanking({ sid, name, age });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser)
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});

app.delete('/api/user/:id',(req,res)=>{
    const taskId=req.params.id
    MesRanking.deleteOne({_id: taskId})
    .then((result)=>{res.send({msg:'data deleted',result})})
   .catch((error)=>{res.send({msg:'data is not deleted',error})})
})

app.get("/api/user/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getMens = await MesRanking.findById(_id);
        res.send(getMens);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
});


app.put("/api/user/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedData = req.body;
        const result = await MesRanking.findByIdAndUpdate(
            taskId, 
            updatedData, 
            { new: true, runValidators: true } 
        );
        if (!result) {
            return res.status(404).send({ msg: 'User not found' });
        }
        res.send(result);
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
});

app.listen(port,()=>{
    console.log(`server is running ${port}`)
})