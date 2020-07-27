const bcrypt = require('bcrypt')
const saltRounds = 10;

module.exports =  function(plainPassword){
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(plainPassword, salt);
    return hash;
}