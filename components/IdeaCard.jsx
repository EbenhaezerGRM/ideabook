"use client"

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"

const IdeaCard = ({post, handleTagClick, handleEdit, handleDelete}) => {

  const { data: session } = useSession()
  const pathName = usePathname()
  const router = useRouter()

  const [copied, setCopied] = useState("")
  const handleCopy = () => {
    setCopied(post.idea)
    navigator.clipboard.writeText(post.idea)
    setTimeout(() => setCopied(""), 3000)
  }

  const [love, setLoved] = useState(false)
  const handleLoved = () => {
    setLoved(!love)
  }
  
  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile")
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`)
  }

  return (
    <div className="idea_card">
      <div className="flex justify-between items-start gap-5">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer" onClick={handleProfileClick}>
          <Image
            src={post.creator.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
            />  
          <div className="flex flex-col">
            <h3 className="font_satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
          </div>
        </div>

      <div className="copy_btn" onClick={handleCopy}>
        <Image
          src={
            copied === post.idea
              ? "/assets/icons/tick.svg"
              : "/assets/icons/copy.svg"
          }
            alt={copied === post.idea ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
            />
        </div>
        
        {/* Loved button on progress */}
        {session?.user ? (
        <div className="copy_btn" onClick={(handleLoved)}>
        <Image
          src={
            love === true
              ? "/assets/icons/loved.svg"
              : "/assets/icons/love.svg"
          }
            alt={copied === post.idea ? "loved_icon" : "love_icon"}
            width={20}
            height={20}
            />
        </div>
        ) : (
          <>
          </>
        )}
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-900">{post.idea}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick(post.tag)}>
        {post.tag}
      </p>
            {session?.user.id === post.creator._id && pathName === '/profile' && (
              <div className="mt-5 flex-center gap-4 border-t border-gray-400 pt-3">
                <p className="font-inter text-sm text-gray-900 cursor-pointer" onClick={handleEdit}>
                  Edit
                </p>
                <p className="font-inter text-sm text-gray-900 cursor-pointer" onClick={handleDelete}>
                  Delete
                </p>
              </div>
            )}
    </div>
  )
}

export default IdeaCard