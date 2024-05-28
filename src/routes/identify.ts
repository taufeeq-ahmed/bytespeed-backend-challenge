import express, { Request, Response } from "express";

const router = express.Router()

const containsnewData = async (email: string, phoneNumber: string): Promise<boolean> => {
    // tells if there is any new data in the body
    return true
}

const consolidateContacts = async (email: string, phoneNumber: string) => {
    // tells if there is any new data in the body
    return true
}

router.post("/identify",

    async (req: Request, res: Response) => {
        const { email = null, phoneNumber = null } = req.body

        if (!email && !phoneNumber) {
            res.status(400).send({ message: "send email/phoneNumber to identify the user" })
        }

        const hasNewData = await containsnewData(email, phoneNumber)

        if (hasNewData) {
            // take body and create a new contact in the table
        }

        const fullContact = await consolidateContacts(email, phoneNumber)

        res.status(200).send(fullContact)
    }
)

export { router as identifyRouter }
