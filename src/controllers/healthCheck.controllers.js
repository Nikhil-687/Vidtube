import ApiResponce from './../utils/ApiResponce.js'
import { asyncHandler } from './../utils/asyncHandler.js'


export const healthcheck = asyncHandler(async (req, res) => {
    return res.status(200).json(new ApiResponce(200, "OK"));
})