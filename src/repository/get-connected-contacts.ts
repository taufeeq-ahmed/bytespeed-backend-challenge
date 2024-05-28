import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const getEmailConnectedContacts = async (email: string) => {
    const emailConnectedContacts = await prisma.contact.findMany({
        where: {
            email
        }
    })
    return emailConnectedContacts
}

const getPhoneConnectedContacts = async (phoneNumber: string) => {
    const phoneConnectedContacts = await prisma.contact.findMany({
        where: {
            phoneNumber
        }
    })
    return phoneConnectedContacts
}

const getAllConnectedContacts = async (email: string, phoneNumber: string) => {
    const firstItem = await prisma.contact.findFirst({
        where: {
            OR: [
                { email }, { phoneNumber }
            ]
        }
    })

    if (!firstItem) {
        return []
    }

    const allConnectedContacts = await prisma.contact.findMany({
        where: {
            OR: [
                { email }, { phoneNumber }, { linkedId: firstItem!.linkedId || firstItem!.id },
                { id: firstItem!.linkedId || firstItem!.id }
            ]
        }
    })

    return allConnectedContacts
}

export {
    getEmailConnectedContacts,
    getPhoneConnectedContacts,
    getAllConnectedContacts
}
