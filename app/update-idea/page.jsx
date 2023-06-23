"use client"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Form from "@components/Form"

const UpdateIdea = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const ideaId = searchParams.get("id")

  const [post, setPost] = useState({ idea: "", tag: "" })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const getIdeaDetails = async () => {
      try {
        const response = await fetch(`/api/idea/${ideaId}`)
        if (response.ok) {
          const data = await response.json()
          setPost({
            idea: data.idea,
            tag: data.tag,
          })
        } else {
          throw new Error("Failed to fetch idea details.")
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (ideaId) {
      getIdeaDetails()
    }
  }, [ideaId])

  const updatingIdea = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    if (!ideaId) {
      alert("Missing idea Id!")
      return
    }

    try {
      const response = await fetch(`/api/idea/${ideaId}`, {
        method: "PATCH",
        body: JSON.stringify({
          idea: post.idea,
          tag: post.tag,
        }),
      })

      if (response.ok) {
        router.push("/")
      } else {
        throw new Error("Failed to update idea.")
      }
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatingIdea}
    />
  )
}

export default UpdateIdea
