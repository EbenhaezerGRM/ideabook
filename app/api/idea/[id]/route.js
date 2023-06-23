import Idea from "@models/Idea"
import { connectToDB } from "@utils/database"

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const idea = await Idea.findById(params.id).populate("creator")
        if (!idea) return new Response("Idea Not Found", { status: 404 })

        return new Response(JSON.stringify(idea), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 })
    }
}

export const PATCH = async (request, { params }) => {
    const { idea, tag } = await request.json()

    try {
        await connectToDB()
        const existingIdea = await Idea.findById(params.id)

        if (!existingIdea) {
            return new Response("Idea not found", { status: 404 })
        }

        existingIdea.idea = idea
        existingIdea.tag = tag

        await existingIdea.save()

        return new Response("Successfully updated the idea", { status: 200 })
    } catch (error) {
        return new Response("Error Updating idea", { status: 500 })
    }
}

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB()

        await Idea.findByIdAndRemove(params.id)

        return new Response("Idea deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Error deleting Idea", { status: 500 })
    }
}