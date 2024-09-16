import {z} from "zod";

export const login = z.object({
    username : z.string().min(2 , {message : "Username must have 3 characters "}),
    password : z.string().min(8 , {message : "Password must be of 8 Characters"})
})