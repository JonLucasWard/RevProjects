// need express for file dependencies
// brackets are to get types
/*{Request, Response} from <- use if something goes wrong*/
import bodyParser from 'body-parser'; // sees if content of request is json, then turn it into object for JS
import express from 'express';
import loginRouter from './routers/loginRouter';
import reimRouter from './routers/reimRouter';
import userRouter from './routers/userRouter';
import db from './util/pg-connector';

const app = express();
const port = 3000;
const port_handler = app.listen(port, () =>
    console.log(`ERS app listening on port ${port}!`),
);

app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
    console.log('Request received for ' + req.url);
    next();
});

app.use('/login', loginRouter);
app.use('/reimbursements', reimRouter);
app.use('/users', userRouter);

process.on('SIGINT', () => {
    db.end().then(() => console.log('pool has ended'));
    port_handler.close();
});
