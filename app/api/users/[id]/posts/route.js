import Idea from "@models/Idea"
import { connectToDB } from "@utils/database"

export const GET = async(request, { params }) => {
    try{
        await connectToDB()
        const ideas = await Idea.find({
            creator:params.id
        }).populate('creator')
        return new Response(JSON.stringify(ideas), { status: 200})
    } catch(error){
        return new Response ("Failed to fecth all ideas", { status: 500})
    }
}