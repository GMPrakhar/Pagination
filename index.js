const { Client } = require('pg');
const express = require('express');
const paginate = require('express-paginate');
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
let countQuery = "SELECT count(*) as cnt FROM data";
app.use(paginate.middleware(100, 100000));
app.get('/request', async (req, res, next)=>{
    
    let limit = req.query.limit;
    const pageCount = 30000/limit;
    console.log(req.skip);
    let offset = req.skip;
    let query = "SELECT * FROM data LIMIT " + limit + " OFFSET " + offset + ";";
        client.query(query, (err, result1) => {
        if(!err) res.json({object: 'list', has_more: paginate.hasNextPages(req)(pageCount), length: result1.rowCount})
        else res.json({message: "Something went Wrong"})
        });
    
});

app.listen(3000, function(){});

