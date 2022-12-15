import express from 'express';
import postgres from 'postgres';
import {readFile} from 'node:fs/promises';

const sql = postgres({ database: "plant_database"});
const app = express();


app.use(express.json());
app.use(express.static("./client"));


// app.get("/app.js", (req, res) => {
//     readFile('client/app.js', 'utf-8'). then(text => {
//         res.set('Content-Type', "application/javascript");
//         res.send(text);
//     })
// });

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