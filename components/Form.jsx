import Link from "next/link"

const Form = ({ type, post, setPost, submitting, handleSubmit}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
        <h1 className="head_text text-left">
            <span className="head_text">{type} Idea</span>
        </h1>
        
        <p className="desc text-left max-w-md">
            {type} your amazing idea and let the world inspired by you
        </p>

        <form
            className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
            onSubmit={handleSubmit}
        >
            
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                    Your Idea
                </span>
                
                <textarea
                    className="form_textarea"
                    placeholder="Write your idea here"
                    required
                    value={post.idea}
                    onChange={(e) => { setPost({ ...post, idea: e.target.value })}}
                    />

            </label>

                <label>
                    <span className="font-satoshi font-semibold text-base text-gray-700">
                        Tag {""}
                        <span className="font-normal">
                            (#technology, #programming, #project, etc)
                        </span>
                    </span>
                    <input
                        className="form_input"
                        type="text"
                        placeholder="#tag"
                        required
                        value={post.tag}
                        onChange={(e) => {setPost({ ...post, tag: e.target.value })}}
                    />
                </label>

                <div className="flex-end mx-3 mb-5 gap-4">
                    <Link
                        href='/'
                        className="text-gray-800 text-sm"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm black_btn rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
        </form>
    </section>
  )
}

export default Form