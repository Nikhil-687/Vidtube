import { Router } from "express";
import { registerUser } from "../controllers/user.controllers.js";
import {upload} from './../middlewares/multer.middlewares.js'

const Route = Router();

Route.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1            
        },{
            name: 'coverImg',
            maxCount: 1
        }
    ]), registerUser
)

export default Route