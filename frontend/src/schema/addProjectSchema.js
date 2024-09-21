import {z} from "zod";

export const addProject = z.object({
    name : z.string().min(4 , {message : "Projectname must have 4 characters "}),
    location : z.string().min(8 , {message : "Location must be of 8 Characters"})
});