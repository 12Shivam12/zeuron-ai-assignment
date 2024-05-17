import User from "../models/user.mode.js";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


export const signup = async(req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: "All fields are required" });
    }

    const alreadyUser = await User.findOne({email});
    if(alreadyUser) {
        return res.status(500).json({message: "User already exist try to login"});
    }

    const hashedPassword = bcryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword
    })

    try {
        await newUser.save();
        res.status(201).json({message: 'Singup successfull'});
    } catch (error) {
        console.log(error)
    }
}

export const login = async(req,res) =>{
    const {email, password} = req.body;

    if(!email || !password || email === '' || password === ''){
        return res.status(500).json({message: "All fields are required"});
    }

    const validUser = await User.findOne({email});

    if(!validUser){
        return res.status(404).json({message: "user doesn't exist"})
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password )

    if(!validPassword){
        return res.status(400).json({message: "Invalid Password"});
    }
    
    const token = jwt.sign({
        id: validUser._id,
    },process.env.JWT_SECRET_KEY);

    res.status(200).cookie('token',token,{
        httpOnly:true,
        maxAge: 24*60*60*1000
    }).json({id: validUser._id,token})
}
