const express = require ('express');
const app =express();
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));

const router = require('./routes/functions.js');
app.use(router);


const banks = require('./routes/banks.js');
app.use(banks);

app.use(express.static('./public'));

app.listen(PORT, () =>{
    console.log('Listening on PORT number: '+ PORT);
});
