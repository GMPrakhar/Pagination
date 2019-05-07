const { Client } = require('pg');
const express = require('express');
let app = express();
const list = [];
const client = new Client({
    user: 'root',
  host: 'localhost',
  database: 'data',
  password: 'bhattudi',
  port: 5432,
});

client.connect();
app.get('/request', (req, res)=>{  
    let limit = req.query.limit;
    let offset = req.query.pageno * limit;
    let query = "SELECT * FROM data LIMIT " + limit + " OFFSET " + offset + ";";
    client.query(query, (err, result) => {
       if(!err) res.json(result.rows)
       else res.json({message: "Something went Wrong"})
    });
});

app.listen(3000, function(){});

