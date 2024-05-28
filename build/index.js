"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const identify_1 = require("./routes/identify");
const serverPort = process.env.SERVER_PORT_NUMBER || 3000;
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(identify_1.identifyRouter);
app.listen(serverPort, () => {
    console.log(`✅ Server Up on Port : ${serverPort}`);
});
