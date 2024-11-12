const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;


mongoose.connect('<DB_CONNECTION>', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const parentSchema = new mongoose.Schema({
    fullName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: String,
});


const Parent = mongoose.model('Parent', parentSchema);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


app.post('/register_parent', async (req, res) => {
    try {
        const { fullName, email, username, password, confirmPassword } = req.body;

    
        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        
        const hashedPassword = await bcrypt.hash(password, 10);

        
        const newParent = new Parent({ fullName, email, username, password: hashedPassword });

        
        await newParent.save();
        res.status(201).send('Registration successful! You can now log in.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error registering parent. Please try again.');
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
