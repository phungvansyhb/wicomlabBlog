const mysql = require('mysql')

const connection = mysql.createConnection({
    host     : process.env.host,
    user     : process.env.user,
    password : process.env.password,
    database : process.env.databasename
});
const testConnect = function () {
    connection.connect((err) => {
        if (err) console.log('err', err)
        else console.log("connect db OK")
    })
};
module.exports = connection;
