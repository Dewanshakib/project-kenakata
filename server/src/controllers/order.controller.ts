// order controllers

import { Request, Response } from "express";
import { prisma } from "../libs/prisma";


// get all orders by userId
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const id = req.id
        const user = await prisma.user.findUnique({ where: { id } })
        if (!user) {
            return res.status(404).send({ message: "No user found" })
        }

        const ordersByUser = await prisma.order.findMany({ where: { userId: user.id }, include: { user: true } })

        if (!ordersByUser) {
            return res.status(404).send({ message: "No oders found with this user" })
        }

        return res.status(200).send({ orders: ordersByUser })
        
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).send({ message: error.message })
        }
        return res.status(500).send({ message: "Server error" })
    }
}
