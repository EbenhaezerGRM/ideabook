'use client'
import Image from "next/image"
import { useState } from "react"

const PromptCard = () => {

    const [copied, setCopied] = useState("")
    const handleCopy = () => {
      setCopied("YOUR IDEA HERE")
      navigator.clipboard.writeText("YOUR IDEA HERE")
      setTimeout(() => setCopied(""), 3000)
    }

  return (
    <div className="prompt_card">
    <div className="flex justify-between items-start gap-5">
      <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
        <Image
          src='/assets/images/logo.svg'
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />  
        <div className="flex flex-col">
          <h3 className="font_satoshi font-semibold text-gray-900">
            username
          </h3>
          <p className="font-inter text-sm text-gray-500">
            username
          </p>

          <div className="copy_btn" onClick={handleCopy}>
        <Image
            src={
              copied === "YOUR IDEA HERE"
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === "YOUR IDEA HERE" ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>

          <p className="my-4 font-satoshi text-sm text-gray-700">
            YOUR IDEA HERE
          </p>

        </div>
      </div>
      </div>
      </div>
  )
}

export default PromptCard