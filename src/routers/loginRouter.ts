/**
 * When a user comes in through the /login URL path, they are expected to POST their username and
 * password information to be checked against the server.
 * If they give good information, it will be entered into a global site variable that can be
 * referred by other functions if their information needs to be accessed again, without having to
 * force the user to re-enter their information each time.
 */
import express, {Request, Response} from 'express';
import User from '../models/users'; // The User model is necessary to return the user's login data back
import * as usersService from '../services/usersService'; // As per above

const loginRouter = express.Router(); // This creates a new instance of express unique to the login path

/**
 * The key to the login so to say. The Logger object will store the user's password, username, role, and
 * ID so that other functions can refer to this information and decide if the user can access certain 
 * things.
 * @Role & @UserID are automatically set to 0, and @Password & @Username to ''. The variable exists on the
 * whole site. However the values are set to be falsy so that an unlogged user can't do anything.
 * The starting values are also meant to imply appropriate typing for these values.
 */
export let Logger = {
    Password: '',
    Role: 0,
    UserID: 0,
    Username: '',
};

/**
 * When a user sends a POST request with appropriate login information, the global variable will
 * be updated with their information according to the database response so they can use the rest
 * of the app.
 * @async - the rest of the function is expected to perform "away" from the app, this app will finish
 * running other code before dealing with the restponse received from this function if any returns.
 * @request - the data inputted by the user, it takes on the data structure laid out in Request (check
 * express documentation for more on that)
 * @response - data returned to the user, according to the Response data structure (check express
 * documentation for more on that)
 */
loginRouter.post('', async (request: Request, response: Response) => {
    // We want the variable "valid" to be given type boolean, it should return true if the user logged in correctly
    const valid: boolean = await usersService.userLogin(request.body.UserName, request.body.Password);
    // request.body.propertyName, this clues us on how the request is structured. Request -> body -> property names
    if (valid) { // if true...
        Logger.Username = request.body.UserName; // set Logger.Username to what the user put it, we know it's correct
        Logger.Password = request.body.Password; // as above
        const user: User = await usersService.getUserId(Logger.UserID); // Run the get id command using Logger's Id
        response.json(user); // response with the user's information
    } else {
        response.status(400).json('Invalid Credentials'); // give an error if the user gave a bad login
    }
});

export default loginRouter;
