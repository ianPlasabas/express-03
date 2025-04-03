require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

const app = express();
app.use(express.json());

if (!PORT) {
    console.log('No port associated');
    process.exit(1);
}

if(!MONGO_URL) {
    console.log('No MongoDB URL to connect to');
    process.exit(1);
}

mongoose.connect(MONGO_URL).then( () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is listening on port: ${PORT}`);
    });
})
.catch(error => {
    console.log(`Error: ${error}`)
})

const userSchema = new mongoose.Schema({
    name: String
});

const userModel = mongoose.model('Users', userSchema);

app.get('/', (req,res) => {
    res.send('Welcome to Express 03');
});

app.post('/users', async (req,res) => {
    try {
        console.log('Adding user');
        const userItem = new userModel({name: req.body.name || 'Default-user'});
        await userItem.save();
        res.status(200).json(userItem);
    } catch (error) {
        console.log('Error occured when adding a user: ', error)
        res.status(500).json(error)
    }
})

app.get('/users', async (req,res) => {
    try {
        const listUsers = await userModel.find();
        res.status(200).json(listUsers);
    } catch (error) {
        console.log('Error occured when getting list of users: '. error)
        res.status(500).json(error)
    }
})


