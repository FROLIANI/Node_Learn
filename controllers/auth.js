
const {registartion} = require('../models/auths')

exports.register =(req,res) =>{
    const {username,password} = req.body;

    //Check input
    if(!username || !password){
        return res.status(400).json({
            error:'Registration not sucess. Valid data not sent in the request'
        });
    }

    //Encrpt data
    const salt = uuidv4();
    const excryptedPassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64,"sha512")
    .toString("hex");

    registartion(username,excryptedPassword,salt)
    .then((result) =>{ 
        if(result === "success")
            return res.status(201)
        .json({message: "Account created Sucessfully"}); 

        else
        return res.status(400)
        .json({message: "Account not created"});
    })
   

}