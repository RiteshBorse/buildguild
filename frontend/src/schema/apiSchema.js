import {z} from "zod"

export const apiVerify = (res) => {
    const { data } = res;
    const result = apiSchema.safeParse(data);
    if(!result.success){
        return false
    }
    return true
}

const apiSchema = z.object({
    success : z.boolean({message : "Success not found"}),
    message : z.string().trim({message : "Message not found"}),
    data : z.any().optional()
});