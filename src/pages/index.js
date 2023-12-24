import Head from 'next/head'
import { Inter } from '@next/font/google'
import Homepage from './HomePage'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { setShowEditPopup } from '@/store/slices';
import LandingPage from './LandingPage';
import Header from '@/components/header/header';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const isLoggedIn = useSelector((state) => state.auth.loggedIn);
  const currentUser = useSelector((state) => state.currentUser.userData)

  const router = useRouter()
  const dispatch = useDispatch()

  // Change the URL without triggering a full page reload
  const newUrl = `${process.env.NEXT_PUBLIC_HOST}`;
  window.history.pushState(null, null, newUrl);

  useEffect(() => {
    // if (isLoggedIn === false) {
    //   router.push('/LandingPage')
    // }
  console.log(currentUser)
    if (!currentUser.gender && isLoggedIn === true) {
      console.log(currentUser)
      router.push(`/profile/${currentUser.username}`)
      setTimeout(() => {
        dispatch(setShowEditPopup())
      }, 1000)
    }
  }, [])


  return (
    <>
      <Head>
        <title>KachraDekho</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className>
        <Header/>
        {isLoggedIn==false ? <LandingPage/>
        : <Homepage />}
      </main>
    </>
  )
}