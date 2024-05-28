import { PrismaClient } from '@prisma/client'
import { getAllConnectedContacts } from './get-connected-contacts'


const prisma = new PrismaClient()

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

export default addContact