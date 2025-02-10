import App from "./app.js";
import connectDB from "./db/index.js";

const PORT = process.env.PORT;

connectDB()
.then(
    App.listen(PORT, () => {
        console.log(`Listening to the PORT: ${PORT}`)
    })
)
.catch((err) => {
    console.log(` can't handle MongoDb connection err: ${err}`)
})