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
Object.defineProperty(exports, "__esModule", { value: true });
const get_connected_contacts_1 = require("../repository/get-connected-contacts");
const containsnewData = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConnectedContacts = yield (0, get_connected_contacts_1.getEmailConnectedContacts)(email);
    const phoneConnectedContacts = yield (0, get_connected_contacts_1.getPhoneConnectedContacts)(phoneNumber);
    return emailConnectedContacts.length === 0 || phoneConnectedContacts.length === 0;
});
exports.default = containsnewData;
