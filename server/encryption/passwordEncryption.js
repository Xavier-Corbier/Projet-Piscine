const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = passwordEncryption = async(password) => {
    //hachage du mot de passe
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash
    } catch (error) {
        console.log(error);
        throw error
    }
};


