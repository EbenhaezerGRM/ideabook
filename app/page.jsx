import Feed from "@components/Feed"

const home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
          IdeaBook
          <br className="max-md:hidden"/>
      </h1>
      <p className="desc text-center">
          Share Your Idea and Let The World Inspired By You
          <br/>
          #ForYouByYou
      </p>
      <p className="desc text-center">
      </p>
      <Feed/>
    </section>
  )
}

export default home