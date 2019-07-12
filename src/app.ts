// need express for file dependencies
// brackets are to get types
/*{Request, Response} from <- use if something goes wrong*/
import bodyParser = require ('body-parser'); // sees if content of request is json, then turn it into object for JS
import express = require('express');
import loginRouter from './routers/loginRouter';
import reimRouter from './routers/reimRouter';
import userRouter from './routers/userRouter';
import {closePool} from './util/pg-connector';

const app = express();
const port = process.env.port || 3000;

process.on('SIGINT', () => {
    closePool();
});

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log('Request received for ' + req.url);
    next();
});

app.use('/login', loginRouter);
app.use('/reimbursements', reimRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`App started on port ${port}`);
});
