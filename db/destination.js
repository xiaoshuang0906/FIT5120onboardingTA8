const {db} = require('./mysql')


module.exports = {
    getAll:async ()=>{
        const sql = "select * from destination"
        return await db(sql)
    },    
    // getByIndex:async (index)=>{
    //     const sql = "select * from tips where `index` = ?"
    //     return await db(sql,index)
    // }
    
}
