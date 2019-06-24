const mongoose = require('mongoose');

const config=require('config');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const threads = require('./routes/threads');

const auth = require('./routes/auth');
const express = require('express');

const app = express();
require('./startup/prod')(app);
if(!config.get('jwtPrivateKey'))
{
console.error('Fatal Error :jwtprivatekey is not defined'); 
process.exit(1);  
}
var url = process.env.DATABASEURL || 'mongodb://localhost/vidly';
//var url = "mongodb+srv://aseem:aseem@cluster0-njnzj.mongodb.net/vidly";
mongoose.connect(url);
//.then(() => console.log('Connected to MongoDB...'))
//.catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/threads', threads);

const port = process.env.PORT || 3000;
const id   = process.env.ID;
app.listen(port, id, () => console.log(`Listening on port ${port}...`, process.env.DATABASEURL, process.env.vidly_jwtPrivateKey));