//need express for file dependencies
//brackets are to get types
/*{Request, Response} from <- use if something goes wrong*/
import express = require('express');
import bodyParser = require ('body-parser'); //sees if content of request is json, then turn it into object for JS
import reimRouter from './routers/reimRouter';
import userRouter from './routers/userRouter';
import loginRouter from './routers/loginRouter';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
        console.log('Request received for ' + req.url);
    next();
});

app.use('/login', loginRouter);
app.use('/reimbursements', reimRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log(`App started on port ${port}`);
});