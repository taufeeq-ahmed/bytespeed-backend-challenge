import { getEmailConnectedContacts, getPhoneConnectedContacts } from "./connected-contacts"

const containsnewData = async (email: string, phoneNumber: string): Promise<boolean> => {
    const emailConnectedContacts = await getEmailConnectedContacts(email)
    const phoneConnectedContacts = await getPhoneConnectedContacts(phoneNumber)

    return emailConnectedContacts.length === 0 || phoneConnectedContacts.length === 0
}
export default containsnewData