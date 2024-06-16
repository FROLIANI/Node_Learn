const { registration,login } = require('../models/auths');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    // Check input
    if (!username || !password) {
        return res.status(400).json({
            error: 'Registration not successful. Valid data not sent in the request'
        });
    }

    // Encrypt data
    const salt = uuidv4();
    const encryptedPassword = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');

    try {
        const result = await registration(username, encryptedPassword, salt);
        return res.status(201).json({ message: "Account created successfully", result });
    } catch (err) {
        if (err.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "Email is already in use" });
        }
        console.error(`Registration failed: ${err}`);
        return res.status(500).json({ error: "Account not created" });
    }
};

//login
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        const userObj = await login(username);

        if (!userObj) {
            return res.status(404).json({ error: "User not found" });
        }

        const encryptedPassword = crypto
            .pbkdf2Sync(password, userObj.dataValues.salt, 1000, 64, 'sha512')
            .toString('hex');

        if (userObj.dataValues.password !== encryptedPassword) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token = jwt.sign(
            { username: userObj.dataValues.username },
            'yourSecretKey', // Use a secure secret key and store it securely
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: "Authenticated",
            token: token,
            generateTime: new Date(),
        });
    } catch (err) {
        console.error(`Login failed: ${err}`);
        return res.status(500).json({ error: "Login failed" });
    }
};
 