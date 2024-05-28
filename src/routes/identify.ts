import express, { Request, Response } from "express";

const router = express.Router()

router.post("/identify",

    async (req: Request, res: Response) => {
        res.status(200).send({ message: "route setup done" })
    }
)

export { router as identifyRouter }
