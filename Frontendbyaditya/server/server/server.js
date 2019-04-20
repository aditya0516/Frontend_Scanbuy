const express = require('express');
const apiRouter = require('./routes/routes');
const app = express();
const bodyparser= require('body-parser');
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

app.use("/books",apiRouter)

app.listen(process.env.PORT || '4000', () => {

    console.log(`Server is running on port : ${process.env.PORT || '4000'}`);
});