const Sequelize = require('sequelize');
const { sequelize } = require('./dbhelper'); // Adjust the path if needed

// Model creation
const Registration = sequelize.define('registration', {
  username: {
    type: Sequelize.STRING(20),
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING(50),
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING(50),
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
    return err;
  }
};
