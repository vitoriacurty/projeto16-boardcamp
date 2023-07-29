import { db } from "../database/database.connection.js"

// CRUD jogos
export async function getJogos(req, res) {
    try {
        const jogos = await db.query(`SELECT * FROM games;`)
        res.send(jogos.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createJogo(req, res) {
    const { name, image, stockTotal, pricePerDay } = req.body
    try {
        const jogo = await db.query(`SELECT * FROM games WHERE name=$1;`, [name])
        if (jogo.rowCount !== 0) return res.sendStatus(409)

        await db.query(`
        INSERT INTO games (name, image, "stockTotal", "pricePerDay")
        VALUES ($1, $2, $3, $4);
        `, [name, image, stockTotal, pricePerDay])

        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}


// CRUD clientes
export async function getClientes(req, res) {
    try {
        const clientes = await db.query(`SELECT * FROM customers;`)
        res.send(clientes.rows)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getClientesById(req, res) {
    const { id } = req.params
    try {
        const cliente = await db.query(`SELECT * FROM customers WHERE id=$1`, [id])
        if (cliente.rowCount === 0) return res.sendStatus(404)
        res.send(cliente.rows[0])
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function inserirCliente(req, res) {
    const { name, phone, cpf, birthday } = req.body
    try {
        const clienteExiste = await db.query(`SELECT * FROM customers WHERE cpf=$1`, [cpf])
        if (clienteExiste.rowCount !== 0) return res.sendStatus(409)

        await db.query(`
        INSERT INTO customers (name, phone, cpf, birthday)
        VALUES ($1, $2, $3, $4)`,
            [name, phone, cpf, birthday])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

