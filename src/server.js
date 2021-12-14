const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// // routes
const usersRoute = require('./routes/users');
const itemsRoute = require('./routes/items');
const categoriesRoute = require('./routes/categories');

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());
app.use('/ad-img', express.static(path.resolve('public', 'uploads')));
console.log('path', path.resolve('public', 'uploads'));

app.get('/', async (req, res) => {
  res.send({ msg: 'got to express' });
});

app.use('/users', usersRoute);
app.use('/items', itemsRoute);
app.use('/categories', categoriesRoute);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
