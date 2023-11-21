import express from 'express'
import pg from 'pg'
import cors from 'cors'
import morgan from 'morgan'
const { Pool } = pg
import fs from 'fs'
import dotenv from 'dotenv'
const APIPORT = 3000

const app = express();

dotenv.config()

const pool = new Pool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.PORT
})

app.use(express.static('public'))

app.use(cors())

app.use(morgan('dev'))

app.use(express.json())

app.get('/api/alltasks', async (req,res) => {
  try {
    const result = await pool.query(`SELECT * FROM tasks;`)
    res.status(200).send(result.rows)
  } catch(err) {
  console.error(err)
  res.status(400).send('Bad Request')
  }
})

app.listen(APIPORT,(req,res) => {
  console.log(`Server listening on PORT 3000`)
})