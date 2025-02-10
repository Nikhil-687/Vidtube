import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookie from 'cookie-parser'
import Router from './routes/healthcheck.routes.js'
import ApiResponce from './utils/ApiResponce.js'
import userRouter from './routes/user.routes.js'
import { errorHandler } from './middlewares/error.middlewares.js'

dotenv.config({
    path: './src/.env'
})

const App = express();



App.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)
App.use(express.json({limit: "16kb"}));
App.use(express.urlencoded({extended: true,limit: "16kb"}));
App.use(express.static('public'));



App.use("/api/v1/healthcheck", Router);
App.use("/api/v1/users", userRouter);
App.use(cookie());
App.use(errorHandler)

App.get('/', (req, res) => {
    console.log(`Cookies: ${1}`);
    res.send(new ApiResponce(203, req.Cookies, "All ok all good"))
})

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECREAT);


export default App;