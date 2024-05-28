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

const getEmailOrPhoneConnectedContacts = async (email: string, phoneNumber: string) => {
    const allConnectedContacts = await prisma.contact.findMany({
        where: {
            OR: [
                { email }, { phoneNumber },
            ]
        }
    })
    return allConnectedContacts
}

const getAllConnectedContacts = async (email: string, phoneNumber: string) => {
    const firstItem = await prisma.contact.findFirst({
        where: {
            OR: [
                { email }, { phoneNumber }
            ]
        }
    })

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
    getEmailOrPhoneConnectedContacts,
    getEmailConnectedContacts,
    getPhoneConnectedContacts,
    getAllConnectedContacts
}
