import express from "express"
import bodyParser from 'body-parser'
import { identifyRouter } from "./routes/identify"

const serverPort = process.env.SERVER_PORT_NUMBER || 3000

const cors = require("cors")
const app = express()

app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(identifyRouter)

app.listen(serverPort, () => {
    console.log(`✅ Server Up on Port : ${serverPort}`);
})
