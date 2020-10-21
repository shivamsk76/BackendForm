const sequelize = require('sequelize')
const dbname = process.env.DBNAME
const username = process.env.USERNAME
const password = process.env.PASSWORD
const host = process.env.HOST

module.exports = new sequelize(dbname, username, password,{
    host: host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
})