import { asyncHandler } from './../utils/asyncHandler.js'
import ApiError from './../utils/ApiError.js'
import {User} from './../models/user.models.js'
import {uploadFile, deleteFile} from './../utils/cloudinary.js'

import ApiResponce from './../utils/ApiResponce.js'


const generateRefreshandAccessToken = async function (userId) {
    try {
        const user = await User.findById(userId);
        if(!user){return null}
        const accessToken = user.generateAccessToken();
        const refresToken = user.generateRefreshToken();
        user.refresToken = refresToken;
        await user.save({validateBeforeSave: false})
        return {accessToken, refresToken}
    } catch (error) {
        console.log("Error occured generation access and refresh token");
        throw new ApiError(500, "Error occured generation access and refresh token");   
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const {name, email, username, password} = req.body
    
    // validation
    if(
        [name, email, username, password].some((feilds) => feilds?.trim() === "")
    ){
        throw new ApiError(400, "All feilds are required");
    }

    const existedUser = await User.findOne(
        {$or: [{username}, {email}]}
    )
    if(existedUser){
        throw new ApiError(401, "Failed Registration, User already Exists")
    }



    // console.log(req,"\n", req.files.avatar[0], req.files.avatar.path);

    const AvatarLocalPath = req.files?.avatar?.[0]?.path
    const CoverLocalPath = req.files?.coverImg?.[0]?.path
    let Avatar = "";
    try {
        // console.log("avatar path" , AvatarLocalPath , "\n\n\n\n\n");
        Avatar = await uploadFile(AvatarLocalPath);
        console.log('Avatar Image uploaded to cloudinary', Avatar.url);
    } catch (error) {
        console.log("Error uploading Avatar", error.message);
        throw new ApiError(500, "Failed to upload Avatar",error);
    }
    let CoverImg = "";
    try {
        CoverImg = await uploadFile(CoverLocalPath);
        console.log('Cover Image uploaded to cloudinary', CoverImg.url)
    } catch (error) {
        console.log("Error uploading Cover Image", error);
        // throw new ApiError(500, "Failed to upload Cover Image");
    }

    // console.log("avatar" , Avatar , "\n\n\n\n\n");
    // console.log("cover path" , CoverLocalPath , "\n\n\n\n\n");
    // console.log(" cover", CoverImg , "\n\n\n\n\n");

    // const u = await User.createCollection({
    //     username,
    //     name,
    //     email, 
    //     avatar: Avatar,
    //     password,
    // })


    try {
        const user = await User.create({
            username,
            name,
            email, 
            avatar: Avatar.url,
            password,
            coverImg: CoverImg.url,    
        })
    
        const createdUser = await User.findById(user._id)
        
        if(!createdUser){
            throw new ApiError(500, "Some Error occured Registering User")
        }
    
        return res.status(200).json(new ApiResponce(200, createdUser, "DEar, User Welcome With a good news that you are registered successfull"));
    
    } catch (error) {
        console.log("USER CREATION FAILED");

        if(Avatar){
            deleteFile(Avatar.public_id);
        }
        if(CoverImg){
            deleteFile(coverImg.public_id);
        }

        throw new ApiError(500, "Something went wronge while registering user and images are removed",error);
    }
})


const loginUser = asyncHandler( async (req, res) => {
    // get data from body
    const {email, username, password} = req.body

    // Validation
    if(!email){
        throw new ApiError(400, "email is a required field");
    }

    const user = User.findOne(
        {$or: [{email}, {username}]}
    ) 
    if(!user){
        throw new ApiError(404, "User Not found");
    }

    // Validate Pass word
    const passwordValidated = await user.isPasswordCorrect(password);
    if(!passwordValidated){
        throw new ApiError(500, "Entered Password dosenot match");
    }

    const {accessToken, refresToken} = generateRefreshandAccessToken(user._id);

    const loggedInUser = await User.findById(user._id)
        .select("-password -refresToken")

    if(!loggedInUser){
        throw new ApiError(500, "Something Went wronge logging-in");        
    }

})

export {
    registerUser,
    loginUser,
    generateRefreshandAccessToken
}
