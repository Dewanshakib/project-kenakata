import { Request, Response } from "express"
import { AddAccountAddressSchema } from "../libs/schema"
import { prisma } from "../libs/prisma"


// add address
export const addUserAddress = async (req: Request, res: Response) => {
  try {
    const id = req.id
    const body = req.body

    const { data, error, success } = AddAccountAddressSchema.safeParse(body)
    if (!success) {
      return res.status(404).send({ message: error.flatten().fieldErrors })
    }

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return res.status(404).send({ message: "No user found" })
    }

    await prisma.address.create({
      data: {
        username: data.name,
        city: data.city,
        country: data.country,
        state: data.state,
        address: data.address,
        userId: id
      }
    })

    return res.status(201).send({ message: "Address added successfully" })
  } catch (error) {
    return res.status(500).send({ message: error instanceof Error ? error.message : "Server error" })
  }
}

// edit address
export const editUserAddress = async (req: Request, res: Response) => {
  try {

  } catch (error) {
    return res.status(500).send({ message: error instanceof Error ? error.message : "Server error" })
  }
}

// get user address
export const getUserAddress = async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    return res.status(500).send({ message: error instanceof Error ? error.message : "Server error" })
  }
}