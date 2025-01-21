import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js";
import authRoute from "./routes/auth.route.js"
import resourceRoute from "./routes/resource.route.js"
dotenv.config()


const app = express();

const PORT = process.env.PORT || 8080;

//At Home page
app.get("/",(req,res) => {
    res.send("Jarurat Care Backend is Running")
})

//Middlewares
app.use(express.json());
app.use("/auth", authRoute)
app.use("/resource", resourceRoute)



app.listen(PORT,()=>{
    connectDB()
    console.log(`Server listen at port ${PORT}`)
})
