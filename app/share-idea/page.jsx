'use client'
import { useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import Form from "@components/Form"

const ShareIdea = () => {
  const router = useRouter()
  const { data: session} = useSession()

  const [submitting, setSubmitting] = useState(false)
  const [post, setPost] = useState({ idea: "", tag: ""})

  const CreateIDea = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try{
      const response = await fetch("api/idea/new", {
        method: "POST",
        body: JSON.stringify({
          idea: post.idea,
          userId: session?.user.id,
          tag: post.tag
        })
      })

      if (response.ok) {
        router.push("/");
      }

    } catch(error){
        console.log(error)
        
    } finally{
        setSubmitting(false)
    }

  }
  return (
    <Form
    type='Share'
    post={post}
    setPost={setPost}
    submitting={submitting}
    handleSubmit={CreateIDea}
    />
  )
}

export default ShareIdea