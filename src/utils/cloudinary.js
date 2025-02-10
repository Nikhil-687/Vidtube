import {v2 as cloudinary} from 'cloudinary';
import fs, { unlinkSync } from 'fs'
import configDotenv from 'dotenv';


configDotenv.config({
  path:"./src/.env"
});


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECREAT
})



async function uploadFile(localFilePath) {
  try {

    // fs.access('/home/sourabh/Projects/Projects/WebD/Backend/Mega Project2/public/temp/avatar-1736938668596.png', fs.constants.F_OK, (err) => {
    //   if (err) {
    //     console.error('File does not exist:', '/home/sourabh/Projects/Projects/WebD/Backend/Mega Project2/public/temp/avatar-1736938668596.png');
    //   } else {
    //     console.log('File exists:', process.env.CLOUDINARY_API_SECREAT, '/home/sourabh/Projects/Projects/WebD/Backend/Mega Project2/public/temp/avatar-1736938668596.png');
    //   }
    // });

    if(!localFilePath){
      console.log("File location does not exists");
    }

    const response = await cloudinary.uploader.upload(localFilePath);
    console.log('Upload successful:', response);
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    // console.log({cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      // api_key: process.env.CLOUDINARY_API_KEY ? "exist":"missing" ,
      // api_secret: process.env.CLOUDINARY_API_SECREAT ? "exist":"missing"})
    console.error('Upload failed:',error.message);
    fs.unlinkSync(localFilePath);
    throw error;
  }
}

// const uplodeOnCloudinary = async function (localFilePath) {
//     try {
//         if(localFilePath){
//             console.log(localFilePath, "\n HI \n\nfghgjkn\n\n\n")
//             // return null
//         }
//         // console.log("HI\n\n\n\n\n\n")
//         const response = await cloudinary.uploader.upload(localFilePath)
//         console.log("File uploaded on Cloudinary, File Path: "+ response.url);
//         // fs.unlinkSync(localFilePath);
//         // fs.unlinksync(localFilePath);
//         return response.url;
//     } catch (error) {
//         fs.unlinkSync(localFilePath);
//         // fs.unlinksync(localFilePath);
//         console.log(error, "vnpsvowaionvsnp;vosovvvwovslnvaiworinviworinvnjaowlnv\n\n\n\n")
//         return null;
//     }
// }



async function deleteFile(publicId) {
  try {
    console.log(publicId)
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary");    
  } catch (error) {
    console.log("Error Deleting from cloudinary", error);
    return null
  }
}
export {
  uploadFile,
  deleteFile
}
