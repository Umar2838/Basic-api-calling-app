const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000

app.use(express.json());

const mongodburl = "mongodb+srv://umaraqeel1481:Shadman town 2@cluster0.3pcsu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(mongodburl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

const dataSchema = new mongoose.Schema({
        value: { type: Number, required: true },
        createdTime: { type: Date, required: true },
    });
    
const Data = mongoose.model('Data', dataSchema);


app.post('/api/data', async (req,res)=>{
    const {value,createdTime} = req.body;

    if(!value || !createdTime){ 
        return res.status(400).json({error:"Value is Invalid"});
    }

    try{
        const dataEntry = new Data({
            value,
            createdTime : new Date(createdTime)
        });
        await dataEntry.save();

        res.status(200).json({ message: 'Data received successfully', data:dataEntry});
    } catch (err){
    console.error("Error saving data",err)
    res.status(500).json({ error: 'Error saving data',})
    }

})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})