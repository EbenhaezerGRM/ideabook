import Idea from "@models/Idea"
import { connectToDB } from "@utils/database"

export const GET = async(request) => {
    try{
        await connectToDB()
        const idea = await Idea.find({}).populate('creator')

        return new Response(JSON.stringify(idea), { status: 200 })
        
    } catch (error) {
        console.log(error)
    }
} 