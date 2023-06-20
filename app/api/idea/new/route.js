import Idea from "@models/Idea"
import { connectToDB } from "@utils/database"

export const POST = async (request) => {
    const { userId, idea, tag } = await request.json()

    try{
        await connectToDB()
        const newIdea = new Idea({ creator: userId, idea, tag })
        await newIdea.save()
        return new Response(JSON.stringify(newIdea), { status: 201 })

    }catch(error){
        return new Response("Failed to create a new idea", { status: 500 })
    }
}