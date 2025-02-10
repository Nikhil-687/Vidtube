import { Router } from "express";
import { healthcheck } from "../controllers/healthCheck.controllers.js";


const Route = Router();

Route.route('/').get(healthcheck);

export default Route