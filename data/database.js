const { get } = require('express/lib/response')
const mongodb = require('mongodb')
const Mongoclient = mongodb.MongoClient

let database

async function connecttodb(){
    const client = await Mongoclient.connect('mongodb://127.0.0.1:27017')
    database = client.db('online-shop')
}

function getDb(){
    if (!database){
        throw new Error('You must connect to database first')
    }
    return database 
}

module.exports= {
    connecttodb:connecttodb,
    getDb:getDb
}