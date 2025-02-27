import { Request, Response } from "express"
import { readFile, writeFile } from "fs/promises"

const dataSource = './data/list.json'

export const add = async (req: Request, res: Response) => {
    const { name, number, email } = req.body

    const generateId = (): string => {
        return Math.random().toString(36).slice(2, 11)
    }
    const id = generateId()

    if (!name || name.length < 2) {
        res.status(400).json({ error: "O nome precisa ter pelo menos 2 caracteres" })
        return
    }
    if (!number || !email) {
        res.status(400).json({ error: "Número e email são obrigatórios" })
        return
    }

    const loadContacts = async (): Promise<{ id: string; name: string; number: string; email: string }[]> => {
        try {
            const data = await readFile(dataSource, { encoding: "utf8" })
            return JSON.parse(data) || []
        } catch (error) {
            return []
        }
    }

    const saveContacts = async (contacts: { id: string; name: string; number: string; email: string }[]) => {
        await writeFile(dataSource, JSON.stringify(contacts, null, 2))
    }

    const contacts = await loadContacts()
    const newContact = { id, name, number, email }
    contacts.push(newContact)
    await saveContacts(contacts)
    res.status(201).json({ contact: newContact })
}

export const all = async (req: Request, res: Response) => {
    const loadContacts = async (): Promise<{ id: string; name: string; number: string; email: string }[]> => {
        try {
            const data = await readFile(dataSource, { encoding: "utf8" })
            return JSON.parse(data) || []
        } catch (error) {
            return []
        }
    }

    const contacts = await loadContacts()

    const sortedContacts = contacts.sort((a, b) => {
        if (a.name < b.name) {
            return -1
        } else if (a.name > b.name) {
            return 1
        } else {
            return 0
        }
    })

    res.status(200).json({ contacts: sortedContacts })
    return
}


export const remove = async (req: Request, res: Response) => {

}