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
const client_1 = require("@prisma/client");
const get_connected_contacts_1 = require("./get-connected-contacts");
const prisma = new client_1.PrismaClient();
const addContact = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const allConnectedContacts = yield (0, get_connected_contacts_1.getAllConnectedContacts)(email, phoneNumber);
    const linkPrecedence = allConnectedContacts.length === 0 ? "primary" : "secondary";
    const linkedId = linkPrecedence === "primary" ? null : allConnectedContacts[0].linkedId || allConnectedContacts[0].id;
    yield prisma.contact.create({
        data: {
            email,
            phoneNumber,
            linkedId,
            linkPrecedence
        },
    });
});
exports.default = addContact;
