import { db } from "../database/database.connection.js"

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

