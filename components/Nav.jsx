'use client'

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect, lazy } from "react"
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
    const { data: session } = useSession()
    const [ providers, setProviders] = useState(null)

    const [toggleDropdown, setToggleDropdown] = useState(false)
    
    useEffect(() => {
      (async () => {
        const res = await getProviders()
        setProviders(res)
      })()
    }, [])

    return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link href='/' className='flex gap-2 flex-center'>
          <Image
            src='/assets/images/logo.svg'
            alt='IdeaBook'
            width={30}
            height={30}
            className='object-contain'
          />
          <p className='logo_text'>IdeaBook</p>
        </Link>

    {/* DESKTOP */}
    <div className='sm:flex hidden'>
          {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href='/saved' className='flex gap-2 flex-center'>
                  <Image
                    src='/assets/icons/love.svg'
                    alt='like'
                    width={35}
                    height={35}
                    className='object-contain'
                  />
              </Link>

              <Link href='/share-idea' className='black_btn'>
                Share Idea
              </Link>

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session?.user.image}
                  alt='profile'
                  width={37}
                  height={37}
                  className='rounded-full'
                  />
              </Link>
            </div>
        ) : (
          <>
            {providers && Object.values(providers).map((provider) => (
            <button
              type='button'
              key={provider.name}
              onClick={() => {signIn(provider.id)}}
              className='black_btn'
              >
              Sign In

              <Image
                src='/assets/icons/google.svg'
                alt="Google"
                width={25}
                height={25}
                loading="lazy"
              />
            </button>
            ))}
          </>
        )}
    </div>

    {/* MOBILE */}
    <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
          <Image
            src={session?.user.image}
            alt='profile'
            width={37}
            height={37}
            className='rounded-full'
            onClick={() => setToggleDropdown(!toggleDropdown)}
            />

        {toggleDropdown && (
            <div className='dropdown'>
                <Link
                  href='/profile'
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)}}
                  >
                  My Profile
                </Link>

                <Link
                  href='/share-idea'
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)}}
                  >
                  Share Idea
                </Link>

                <Link
                  href='/saved'
                  className='dropdown_link'
                  onClick={() => {setToggleDropdown(false)}}
                  >
                  Saved Idea
                </Link>

                <button
                  type='button'
                  onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                  className='mt-5 w-full black_btn'
                  >
                  Sign Out
                </button>

            </div>
        )}
            </div>
        ) : (
            <>
                {providers &&
                  Object.values(providers).map((provider) => (
                    <button
                      type='button'
                      key={provider.name}
                      onClick={() => {signIn(provider.id)}}
                      className='black_btn'
                      >
                      Sign in

                      <Image
                      src='/assets/icons/google.svg'
                      alt="Google"
                      width={25}
                      height={25}
                      loading="lazy"
                      />
                    </button>
                ))}
            </>
          )}
    </div>
    </nav>
  )
}

export default Nav