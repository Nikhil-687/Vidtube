// export const asyncHandler = (reqHandler) => {
//     return async (req, res, next) => {
//         try {
//             // Execute the original route handler
//             await reqHandler(req, res, next);
//         } catch (error) {
//             console.error('Error in async handler:', error);  // Better logging
//             next(error);  // Pass the error to the next middleware (error handler)
//         }
//     }
// };


import express from 'express'

export const asyncHandler = (reqHandler) => {
    return async (req, res, next) => {
        try {
            await reqHandler(req, res, next);
            console.log("ALL OK ALL GOOD");
        } catch (error) {
            console.log("NOT OK NOT GOOD");
            next(error);
        }
    }
}


