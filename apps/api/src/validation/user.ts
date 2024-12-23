import z from "zod"

export const RegisterBody = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string().min(6)
})


export const LoginBody = z.object({
    email : z.string().email(),
    password : z.string().min(6)
})


