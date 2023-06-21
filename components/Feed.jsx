"use client"

import { useState, useEffect } from "react"
import IdeaCard from "./IdeaCard"

const IdeaCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 idea_layout'>
      {data.map((post) => (
        <IdeaCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [allPosts, setAllPosts] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchTimeout, setSearchTimeout] = useState(null)
  const [searchedResults, setSearchedResults] = useState([])

  const fetchPosts = async () => {
    const response = await fetch("/api/idea")
    const data = await response.json()
    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const filterIdea = (searchtext) => {
    const regex = new RegExp(searchtext, "i")
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.idea)
    )
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterIdea(e.target.value)
        setSearchedResults(searchResult)
      }, 500)
    )
  }

  const handleTagClick = (tagName) => {
    setSearchText(tagName)

    const searchResult = filterIdea(tagName)
    setSearchedResults(searchResult)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for an idea, tag, or username...'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {searchText ? (
        <IdeaCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <IdeaCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  )
}

export default Feed