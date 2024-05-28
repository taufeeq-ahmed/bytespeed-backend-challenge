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
exports.getAllConnectedContacts = exports.getPhoneConnectedContacts = exports.getEmailConnectedContacts = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEmailConnectedContacts = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const emailConnectedContacts = yield prisma.contact.findMany({
        where: {
            email
        }
    });
    return emailConnectedContacts;
});
exports.getEmailConnectedContacts = getEmailConnectedContacts;
const getPhoneConnectedContacts = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const phoneConnectedContacts = yield prisma.contact.findMany({
        where: {
            phoneNumber
        }
    });
    return phoneConnectedContacts;
});
exports.getPhoneConnectedContacts = getPhoneConnectedContacts;
const getAllConnectedContacts = (email, phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const firstItem = yield prisma.contact.findFirst({
        where: {
            OR: [
                { email }, { phoneNumber }
            ]
        }
    });
    if (!firstItem) {
        return [];
    }
    const allConnectedContacts = yield prisma.contact.findMany({
        where: {
            OR: [
                { email }, { phoneNumber }, { linkedId: firstItem.linkedId || firstItem.id },
                { id: firstItem.linkedId || firstItem.id }
            ]
        }
    });
    return allConnectedContacts;
});
exports.getAllConnectedContacts = getAllConnectedContacts;
