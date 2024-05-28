import express from "express"
import "express-async-errors"
import bodyParser from 'body-parser'
import { identifyRouter } from "./routes/identify"

const cors = require("cors")
const app = express()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(identifyRouter)

app.listen(process.env.SERVER_PORT_NUMBER, () => {
    console.log("✅ Server Up on Port : 3000");
})
