import express, { Request, Response } from "express";
import { getAllConnectedContacts, getEmailConnectedContacts, getPhoneConnectedContacts } from "../helpers/connections";
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
    const emails: string[] = []
    const phoneNumbers: string[] = []
    const secondaryContactIds: number[] = []

    allConnectedContacts.forEach((contact) => {
        const { email, phoneNumber, linkPrecedence, id } = contact

        if (linkPrecedence === "primary") {
            primaryContactId = id
        } else {
            secondaryContactIds.push(id)
        }

        if (email) emails.push(email)
        if (phoneNumber) phoneNumbers.push(phoneNumber)

    })

    const contact = {
        primaryContactId,
        emails,
        phoneNumbers,
        secondaryContactIds
    }
    return {
        contact
    }
}

const addContact = async (email: string, phoneNumber: string) => {
    const allConnectedContacts = await getAllConnectedContacts(email, phoneNumber)

    const linkPrecedence = allConnectedContacts.length === 0 ? "primary" : "secondary"
    const linkedId = linkPrecedence === "primary" ? null : allConnectedContacts[0].id

    const contact = await prisma.contact.create({
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
