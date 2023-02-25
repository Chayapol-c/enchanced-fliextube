const express = require('express')
const mongodb = require('mongodb')

const app = express()
const PORT = process.env.PORT
const DBHOST = process.env.DBHOST
const DBNAME = process.env.DBNAME

let advertisingDb

mongodb.MongoClient.connect(DBHOST, { useUnifiedTopology: true })
    .then((client) => {
        advertisingDb = client.db(DBNAME)
    })

app.get('/products', (req, res) => {
    const products = advertisingDb.collection('products')
    products.aggregate([ { $sample: { size: 1 } } ]).toArray().then((product) => {
        console.log("product", product[0])
        res.json(product[0])
    })
})

app.listen(PORT, () => {
    console.log('Microservice online.')
})