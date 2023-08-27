import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import user from '../models/user';

export const signin = async(req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await user.findOne({email});
        if(!existingUser) return res.status(404).json({message:"User doesnt exist!!!"})

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials!!"});

        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, 'test')
    } catch (error) {
        
    }
}
export const signup = async(req, res) => {}