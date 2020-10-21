
const dbconfig = require('../config/config')
const Sequelize = require('sequelize')



Form = dbconfig.define('Form',{
    
    
    Firstname: Sequelize.STRING,
    Lastname: Sequelize.STRING,
    Fathername: Sequelize.STRING,
    Mothername: Sequelize.STRING,
     Mobile: Sequelize.STRING
},
{
tableName: "Form",
timestamps: false

})
Form.removeAttribute('id')
module.exports = Form