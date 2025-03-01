import { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";

const dataSource = "./data/list.json";

export const add = async (req: Request, res: Response) => {
    try {
        const { name, number, email, description } = req.body;

        if (!name || name.length < 2) {
            res.status(400).json({ error: "O nome precisa ter pelo menos 2 caracteres" });
            return
        }
        if (!number || !email) {
            res.status(400).json({ error: "Número e email são obrigatórios" });
            return
        }

        const generateId = (): string => Math.random().toString(36).slice(2, 11);
        const id = generateId();

        let contacts = await loadContacts();
        const newContact = { id, name, number, email, description };
        contacts.push(newContact);

        await saveContacts(contacts);
        res.status(201).json({ contact: newContact });
        return
    } catch (error) {
        res.status(500).json({ error: "Erro ao adicionar contato" });
        return
    }
};

export const all = async (req: Request, res: Response) => {
    try {
        let contacts = await loadContacts();
        const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));
        res.status(200).json({ contacts: sortedContacts });
        return
    } catch (error) {
        res.status(500).json({ error: "Erro ao carregar contatos" });
        return
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, number, email, description } = req.body;

        if (!id) {
            res.status(400).json({ error: "Precisa de um id para atualizar" });
            return
        }

        let contacts = await loadContacts();
        const contactIndex = contacts.findIndex(contact => contact.id === id);

        if (contactIndex === -1) {
            res.status(404).json({ error: "Contato não encontrado" });
            return
        }

        contacts[contactIndex] = {
            ...contacts[contactIndex],
            name: name || contacts[contactIndex].name,
            number: number || contacts[contactIndex].number,
            email: email || contacts[contactIndex].email,
            description: description || contacts[contactIndex].description
        };

        await saveContacts(contacts);

        res.status(200).json({
            message: "Contato atualizado",
            contact: contacts[contactIndex]
        });
        return
    } catch (error) {
        res.status(500).json({ error: "Erro ao atualizar contato" });
        return
    }
};


export const remove = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ error: "Precisa de um id para excluir" });
            return
        }

        let contacts = await loadContacts();
        const contactToRemove = contacts.find(contact => contact.id === id);

        if (!contactToRemove) {
            res.status(404).json({ error: "Contato não encontrado" });
            return
        }

        const filteredContacts = contacts.filter(contact => contact.id !== id);
        await saveContacts(filteredContacts);

        res.status(200).json({
            message: "Contato removido",
            contact: contactToRemove,
        });
        return
    } catch (error) {
        res.status(500).json({ error: "Erro ao remover contato" });
        return
    }
};


const loadContacts = async (): Promise<{
    id: string;
    name: string;
    number: string;
    email: string;
    description: string;
}[]> => {
    try {
        const data = await readFile(dataSource, { encoding: "utf8" });
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
};


const saveContacts = async (contacts: {
    id: string;
    name: string;
    number: string;
    email: string;
    description: string;
}[]) => {
    try {
        await writeFile(dataSource, JSON.stringify(contacts, null, 2));
    } catch (error) {
        console.error("Erro ao salvar contatos:", error);
    }
};
