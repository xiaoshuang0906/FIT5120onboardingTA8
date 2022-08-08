const { rejects } = require('assert')
const mysql = require('mysql')
const { resolve } = require('path')
//mysql configuration
const config = {
    host:"db",
    database:'onboarding',
    user:'root',
    password:process.env.DB_PASSWORD
}

const pool = mysql.createPool(config)

exports.db = (sql,sqlParams) => {
    return new Promise((resolve,rejects)=>{
        pool.query(sql,sqlParams, (err,results) => {
            if(err){
                rejects(err)
                return console.log(err.message)
            } 
            resolve(results)
        })
    })
}

