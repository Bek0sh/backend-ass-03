// db.js
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:1234@cluster0.jlpy0pu.mongodb.net/testdb?retryWrites=true&w=majority', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));
