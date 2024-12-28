import userModel from "../models/userModel";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const registerUser = async (req,res) => {
    try {
        const {name,email,password} = req.body;
        if (!name || !email || !password) {
            return res.json({
                success:false,
                message:'Missing Details'
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password,salt)
        const userData = {
            name,email,password:hashedpassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({
            success:true,
            token,
            user:{name:user.name}
        })
    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}

const loginUser = async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email})

if (!user) {
    return  res.json({
        success:false,
        message:'User does;t exist'
    })
}

    const isMatch = await bcrypt.compare(password,user.password)

    if (isMatch) {
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

        res.json({
            success:true,
            token,
            user:{name:user.name}
        })
    }
    else{
        return  res.json({
            success:false,
            message:'Invalid Credential'
        }) 
    }

    } catch (error) {
        console.log(error);
        res.json({
            success:false,
            message:error.message
        })
    }
}