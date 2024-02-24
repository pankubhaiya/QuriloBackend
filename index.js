const express= require("express")
const { Connection } = require("./config/db")
const { FileRouter } = require("./routes/fileroute")
const cors= require("cors")
const app= express()
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("everything is fine")
})
app.use(cors())
app.use("/",FileRouter)

const port= process.env.port
app.listen(port, async(req,res)=>{
    try {
        await Connection
        console.log("conneted to database")
    } catch (error) {
        console.log("error")
    }
    console.log(`server is running at port ${port}`)
})