"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.identifyRouter = void 0;
const express_1 = __importDefault(require("express"));
const contains_new_data_1 = __importDefault(require("../helpers/contains-new-data"));
const consolidate_contact_1 = __importDefault(require("../helpers/consolidate-contact"));
const add_contact_1 = __importDefault(require("../repository/add-contact"));
const router = express_1.default.Router();
exports.identifyRouter = router;
router.post("/identify", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email = null, phoneNumber = null } = req.body;
    if (!email && !phoneNumber) {
        return res.status(400).send({ message: "send email/phoneNumber to identify the user" });
    }
    const hasNewData = yield (0, contains_new_data_1.default)(email, phoneNumber);
    if (hasNewData) {
        yield (0, add_contact_1.default)(email, phoneNumber);
    }
    const fullContact = yield (0, consolidate_contact_1.default)(email, phoneNumber);
    res.status(200).send(fullContact);
}));
