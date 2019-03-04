require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
// const logger = require('./middleware/logger');
const commentsRouter = require('./routes/comments');

const app = express();

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

/*Set Up Middleware*/

// body parser middleware
app.use(express.json());
// formdata
app.use(express.urlencoded({extended: false}));

// cors middleware
app.use(cors());


// logger middleware
// app.use(logger);

// static middleware
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/api/comments', commentsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
