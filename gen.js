const { Client } = require('pg');
const faker = require('faker');
const list = [];
const client = new Client({
    user: 'root',
  host: 'localhost',
  database: 'data',
  password: 'bhattudi',
  port: 5432,
});

client.connect();

for(let i = 0; i < 10000; i++){
    list.push(faker.lorem.word());
}

let query = "INSERT INTO data VALUES(";
for(let i = 0; i < 10000; i++){
    query += "'"+list[i]+"')";
    if(i!=9999){
        query += ",(";
    }
}


client.query(query, (err, res) => {
    console.log(err, res);
    client.end();
  });