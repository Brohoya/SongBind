import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from '../hooks/useAuth';
import Logo from "../assets/webapp/sidebar/logo.svg";
import Hero from "../assets/website/image_accueil.svg";
import Down from '../assets/website/arrow-down.svg';


const Home: NextPage = () => {
  const auth = useAuth();

  return (
    <div className='landing-page bg-yellow-100/10'>
      <Head>
        <title>SongBind</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='w-10/12 mx-auto'>
        <nav className='navbar mt-2 bg-white shadow-md shadow-[rgba(0,0,0,0.35)] rounded-3xl'>
          <ul className='flex flex-row w-full justify-between p-4 my-auto'>
            <li className='my-auto'>
              <div className="flex flex-row cursor-pointer">
                  <Image src={Logo} width={"50"} height={"50"} priority />
                  <h1 className="font-bold text-3xl my-auto text-black">
                    SONGBIND
                  </h1>
              </div>
            </li>

            <li className='my-auto'>
              {auth.user ? (
                  <Link href="/dashboard">
                    <div className='open-login'>
                      Open Songbind
                    </div>
                  </Link>
                ) : (
                  <Link href="/login">
                    <div className='open-login'>
                      Login
                    </div>
                  </Link>
                )
              }
            </li>

          </ul>
        </nav>

        <div className='hero-banner mt-20 mx-5 flex flex-row'>

          <div className='left w-6/12 flex flex-col my-auto'>
            <h1 className='text-2xl font-bold text-center'>All your music in just one place...</h1>
            <div className='w-6/12 flex flex-col mt-20 mx-auto space-y-10 text-center'>
              <Link href={'/login'}>
                <div className='open-login text-2xl'>
                    Login
                </div>
              </Link>
              <h2 className='text-2xl font-bold text-gray-600'>OR</h2>
              <Link href={'#'}> 
                <div className='discover-features align-middle'> 
                  Discover features &nbsp;
                  <Image src={Down} width={'20'} height={'20'} /> 
                </div> 
              </Link>
            </div>
          </div>

          <div className="right w-6/12">
            <Image src={Hero} />
          </div>

        </div>

        <div className='mx-5 mt-10'>
          <h3 className='text-xl'>
            Connect your different music platforms and enjoy :
          </h3>
          <div className='w-full justify-center mt-8 flex flex-row space-x-10'>
            <div>
              <Image src='/streamingPlatforms/soundcloud.png' width={'133'} height={'75'} />
            </div>
            <div>
              <Image src='/streamingPlatforms/applemusic.png' width={'75'} height={'75'} />
            </div>
            <div>
              <Image src='/streamingPlatforms/spotify.png' width={'75'} height={'75'} />
            </div>
            <div>
              <Image src='/streamingPlatforms/youtube.png' width={'75'} height={'75'} />
            </div>
            <div className='my-auto'>
              <Image src='/streamingPlatforms/deezer.png' width={'215'} height={'60'} />
            </div>
          </div>
        </div>
        {/* {user ? (
            <Link href="/dashboard">
              <button>Open SongBind</button>
            </Link>
          ) : (
            <Link href="/login">
              <button>Login</button>
            </Link>
          )
        } */}
      </main>

      <footer className=''>
        {/* <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className=''>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a> */}
      </footer>
    </div>
  )
}

export default Home
