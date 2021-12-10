const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// // routes

const PORT = process.env.SERVER_PORT || 3001;

const app = express();

// middleware
app.use(morgan('common'));
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.send({ msg: 'got to express' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
