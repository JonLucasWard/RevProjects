//need express for file dependencies
//brackets are to get types
/*{Request, Response} from <- use if something goes wrong*/
import express = require('express');
import bodyParser = require ('body-parser'); //sees if content of request is json, then turn it into object for JS
import reimRouter from './routers/reimRouter';
import userRouter from './routers/userRouter';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req, res, next) => {
        console.log('Request received for ' + req.url);
    next();
});

//app.use(/* middleware function, usually arrow functions with 3 parameters indicated above */)
//If we want typing: npm install --only-dev @types/express
/*app.use( (request: Request, response: Response, next) => {
    //remembeer you can preview possible codes as you type out, important with .operators
    response.json({message: 'Hello from middleware 1'});
    //if next(); is not here, the whole thing ends, kinda like inverse break
    next();
});*/

//this now fails because you already sent a response from the last middleware, need a new use
/* app.use( (request: Request, response: Response, next) =>{
    response.json({message: 'Hello from middleware 2'});
}); */

/*Routers - We will register two routers with the routes: 'cats' and 'food'. We need to remember to
register routes here */
//app.use('/cats', catRouter);
app.use('/reimbursements', reimRouter);
app.use('/users', userRouter);

//Start server on port 3000
app.listen(3000, () => {
    console.log(`App started on port ${port}`);
});