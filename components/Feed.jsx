import React from 'react'
import PromptCard from './PromptCard'

const Feed = () => {
    return (
        <section className='feed'>
        <form className='relative w-full flex-center'>
            <input
                type='text'
                placeholder='Search for a tag or a username...'
                // value={}
                // onChange={() => {}}
                required
                className='search_input peer'
                />
        </form>

        <PromptCard/>
    </section>
  )
}

export default Feed