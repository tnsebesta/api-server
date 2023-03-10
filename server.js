import express from 'express';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

// console.log(process.env.DATABASE_URL);
const sql = postgres(process.env.DATABASE_URL);
const app = express();


app.use(express.json());

//server to host everything in this directory
app.use(express.static("./client"));


app.get("/vegetables", (req, res) => {
    sql`SELECT * FROM vegetables`.then((result) => {
    res.json(result);
});
});

app.post("/vegetables", (req, res) => {
    const { plant_name, botanical_name, plant_type } = req.body;
    sql`INSERT INTO vegetables (plant_name, botanical_name, plant_type) VALUES (${plant_name}, ${botanical_name}, ${plant_type}) RETURNING *`.then((result) => {
        res.send(result[0]);
    })
})

app.listen(1000);