const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const DEBUG = process.env.DEBUG;
const app = new express();


const mongoUrl = process.env.MONGODB_URI;
mongoose.connect(mongoUrl, { useNewUrlParser: true })
    .then(() => console.log('Connected to Mongo'))
    .catch(e => console.log('Something went wrong', e));


app.use(morgan('short'));
app.use(helmet());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const characterListController = require('./controllers/marvel/character-list-controller');
const characterCreateController = require('./controllers/marvel/character-create-controller');
const characterDetailController = require('./controllers/marvel/character-detail-controller');
const comicCreateController = require('./controllers/marvel/comic-create-controller');
const comicDetailController = require('./controllers/marvel/comic-detail-controller');
const storiesCreateController = require('./controllers/marvel/stories-create-controller');
const storiesDetailController = require('./controllers/marvel/stories-detail-controller');

const smartcropControler = require('./controllers/smartcrop/smartcrop-controller');


app.get('/api/characters/', characterListController);
app.get('/api/characters/:id/', characterDetailController);
app.post('/api/characters/', characterCreateController);
app.get('/api/comics/:id/', comicDetailController);
app.post('/api/comics/', comicCreateController);
app.get('/api/stories/:id/', storiesDetailController);
app.post('/api/stories/', storiesCreateController);

app.get('/api/smartcrop/', smartcropControler);

const todoRouter = express.Router();
app.use('/api', todoRouter);

const todoService = require('./services/todo-service');
todoService.register(todoRouter, '/todos');

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    let message = DEBUG ? 'Starting development server on port' : 'App listening on port';
    console.log(message, `${PORT}`);
});
