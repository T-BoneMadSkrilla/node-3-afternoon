require('dotenv').config();

const express = require("express"),
    app=express(),
    bodyParser = require("body-parser"),
    port = 3010,
    session = require("express-session");

const checkForSession = require('./middlewares/checkForSession');

const swag_controller = require('./controllers/swag_controller');
const auth_controller = require('./controllers/auth_controller');
const cart_controller = require('./controllers/cart_controller');
const search_controller = require('./controllers/search_controller');

app.use(bodyParser.json());

app.use( checkForSession );
app.use( express.static( `${__dirname}/build` ) );

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(checkForSession);

app.get('/api/swag', swag_controller.read);

app.post( '/api/login', auth_controller.login);
app.post( '/api/register', auth_controller.register);
app.post('/api/signout', auth_controller.signout);
app.get( '/api/user', auth_controller.getUser);

app.post('/api/cart', cart_controller.add);
app.post('/api/cart/checkout', cart_controller.checkout);
app.delete('/api/cart', cart_controller.delete);

app.get('/api/search', search_controller.search);

app.listen( port, () => {
    console.log(`Server listening on port ${port}`)
})