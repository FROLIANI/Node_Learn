const Sequelize = require('sequelize');
const { sequelize } = require('./dbhelper'); // Adjust the path if needed

// Model creation
const Registration = sequelize.define('registration', {
    username: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true // Adding unique constraint
    },
    password: {
        type: Sequelize.STRING(128), 
        allowNull: false
    },
    salt: {
        type: Sequelize.STRING(128), 
        allowNull: false
    }
});

// Insert data
exports.registration = async (username, password, salt) => {
    try {
        const result = await Registration.create({
            username: username,
            password: password,
            salt: salt
        });
        console.log(result);
        return "Successfully Registered";
    } catch (err) {
        console.error(`Registration failed: ${err}`);
        throw err; // Throw the error to handle it in the controller
    }
};

//login
exports.login = async (email) => {
    try {
        const result = await Registration.findOne({
            where: {
                username: email
            }
        });
        return result;
    } catch (err) {
        console.error(`Something went wrong: ${err}`);
        throw new Error('Database query failed'); // Throw an error instead of returning it
    }
};