import express, { Request, Response } from "express";

import containsnewData from "../helpers/contains-new-data";

import consolidateContact from "../helpers/consolidate-contact";
import addContact from "../repository/add-contact";

const router = express.Router()

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

        const fullContact = await consolidateContact(email, phoneNumber)

        res.status(200).send(fullContact)
    }
)

export { router as identifyRouter }
