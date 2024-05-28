import express, { Request, Response } from "express";
import { getAllConnectedContacts, getEmailConnectedContacts, getPhoneConnectedContacts } from "../helpers/connected-contacts";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()


const router = express.Router()

const containsnewData = async (email: string, phoneNumber: string): Promise<boolean> => {
    const emailConnectedContacts = await getEmailConnectedContacts(email)
    const phoneConnectedContacts = await getPhoneConnectedContacts(phoneNumber)

    return emailConnectedContacts.length === 0 || phoneConnectedContacts.length === 0
}

const consolidateContacts = async (email: string, phoneNumber: string) => {
    const allConnectedContacts = await getAllConnectedContacts(email, phoneNumber)

    let primaryContactId: number = -1
    const emails: Set<string> = new Set()
    const phoneNumbers: Set<string> = new Set()
    const secondaryContactIds: Set<number> = new Set()

    allConnectedContacts.forEach((contact) => {
        const { email, phoneNumber, linkPrecedence, id, linkedId } = contact

        if (linkedId) {
            primaryContactId = linkedId
        } else {
            primaryContactId = id
        }

        if (linkPrecedence !== "primary") {
            secondaryContactIds.add(id)
        }

        if (email) emails.add(email)
        if (phoneNumber) phoneNumbers.add(phoneNumber)

    })

    const contact = {
        primaryContactId,
        emails: Array.from(emails),
        phoneNumbers: Array.from(phoneNumbers),
        secondaryContactIds: Array.from(secondaryContactIds)
    }
    return {
        contact
    }
}

const addContact = async (email: string, phoneNumber: string) => {
    const allConnectedContacts = await getAllConnectedContacts(email, phoneNumber)

    const linkPrecedence = allConnectedContacts.length === 0 ? "primary" : "secondary"
    const linkedId = linkPrecedence === "primary" ? null : allConnectedContacts[0].linkedId || allConnectedContacts[0].id

    await prisma.contact.create({
        data: {
            email,
            phoneNumber,
            linkedId,
            linkPrecedence
        },
    })
}

router.post("/identify",

    async (req: Request, res: Response) => {
        const { email = null, phoneNumber = null } = req.body

        if (!email && !phoneNumber) {
            return res.status(400).send({ message: "send email/phoneNumber to identify the user" })
        }

        const hasNewData = await containsnewData(email, phoneNumber)

        if (hasNewData) {
            await addContact(email, phoneNumber)
        }

        const fullContact = await consolidateContacts(email, phoneNumber)

        res.status(200).send(fullContact)
    }
)

export { router as identifyRouter }
