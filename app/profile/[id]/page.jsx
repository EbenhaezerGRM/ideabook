"use client"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Profile from "@components/Profile"

const userProfile = ({params}) => {
  const searchParams = useSearchParams()
  const userName = searchParams.get("name")

  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params?.id}/posts`)
      const data = await response.json()
      setUserPosts(data)
    }
    if (params?.id) fetchPosts()
  }, [params.id])

  const formattedName = userName.endsWith('s') ? `${userName}\'` : `${userName}\'s`

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${formattedName} profile page. Explore ${formattedName} idea(s) and be inspired by them`}
      data={userPosts}
    />
  )
}

export default userProfile