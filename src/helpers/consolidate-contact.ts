import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const consolidateContact = async (email: string, phoneNumber: string) => {
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
export default consolidateContact