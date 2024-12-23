import express from "express"
import bcrypt from "bcrypt"
import { LoginBody, RegisterBody } from "../validation/user"
const client = require("@repo/db/client");
import jwt from "jsonwebtoken"
require('dotenv').config()
const jwtsecret  = process.env.JWT_SECRET || "jwtsecr3t"
export const userRouter = express.Router()

userRouter.post('/register',async (req,res)=>{
    const {success} = RegisterBody.safeParse(req.body)
    if(!success){
        res.status(401).json({
            msg : "Invalid Inputs"
        })
        return
    }
   const {username , email ,password } = req.body;
    try {
        const passwordHashed  = await bcrypt.hash(password,10);
        const user = await client.user.create({
            data: {
                email: email,
                passwordHash: passwordHashed,
                username: username
            }
        }) 
        console.log(user)
        res.status(200).json({
            msg : "User created successfully",
            data : {
                id : user.id,
                email : user.email,
                username : user.username
            }

        }) 
       }catch(e){
             res.json({
                error : e
             })
       }
})
userRouter.post('/login',async (req,res)=>{
    const {success} = LoginBody.safeParse(req.body)
    if(!success){
        res.status(401).json({
            msg : "Invalid Inputs"
        })
        return
    }
   
   const { email ,password } = req.body;
  
    try {
        const findUser = await client.user.findUnique({
            where : {
                email : email
            }
        })  
            if(!findUser){
                res.status(406).json({
                    msg : "User is not registered"
                })
            }
        const passwordHashed  = await bcrypt.compare(password,findUser.password);
      if(passwordHashed){
        const token = jwt.sign(email,jwtsecret)
      } 
       }catch(e){
             res.json({
                error : e
             })
       }
})
userRouter.post('/logout',(req,res)=>{
    res.json({
    })
})
userRouter.get('/profile',)
userRouter.put('/profile')
userRouter.put('/password')
userRouter.post('/forgot-password')
userRouter.post('/reset-password')
