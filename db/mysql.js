const { rejects } = require('assert')
const mysql = require('mysql')
const { resolve } = require('path')
//mysql configuration
const config = {
    host:"127.0.0.1",
    database:'onboarding',
    user:'root',
    password:'wswl998877'
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

