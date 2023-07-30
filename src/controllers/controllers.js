import dayjs from "dayjs"
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

export async function atualizarCliente(req, res) {
    const { name, phone, cpf, birthday } = req.body
    const { id } = req.params
    try {
        const cpfExistente = await db.query(`SELECT * FROM customers WHERE cpf=$1 AND id !=$2`, [cpf, id])
        if (cpfExistente.rowCount)
            return res.sendStatus(409)

        await db.query(`
            UPDATE customers 
                SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5`,
            [name, phone, cpf, birthday, id])
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

// CRUD alugueis
export async function getAlugueis(req, res) {
    try {
        const alugueis = await db.query(`
        SELECT rentals.*, customers.name AS "nomeCliente", games.name AS "nomeJogo"
        FROM rentals
        JOIN customers ON rentals."customerId" = customers.id
        JOIN games ON rentals."gameId" = games.id
        `)

        const resposta = alugueis.rows.map((aluguel) => {
            const customer = { id: aluguel.customerId, name: aluguel.nomeCliente }
            const game = { id: aluguel.gameId, name: aluguel.nomeJogo }
            delete aluguel.nomeCliente
            delete aluguel.nomeJogo
            return { ...aluguel, customer, game }
        })
        res.send(resposta)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function createAluguel(req, res) {
    const { customerId, gameId, daysRented } = req.body

    try {
        const clientes = await db.query(`SELECT * FROM customers WHERE id=$1;`, [customerId])
        if (clientes.rowCount === 0) return res.sendStatus(400)

        const jogos = await db.query(`SELECT * FROM games WHERE id=$1;`, [gameId])
        if (jogos.rowCount === 0) return res.sendStatus(400)

        const estoque = await db.query(`
        SELECT * FROM rentals 
        WHERE "gameId"=$1 AND "returnDate" IS NULL;`, [gameId])
        if (estoque.rowCount >= jogos.rows[0].stockTotal) return res.sendStatus(400)

        let rentDate = new Date().toISOString().slice(0, 10)
        const originalPrice = daysRented * jogos.rows[0].pricePerDay

        await db.query(`
        INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee")
        VALUES ($1, $2, $3, $4, $5, null, null);
        `, [customerId, gameId, daysRented, rentDate, originalPrice])
        res.sendStatus(201)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

