import React, {useEffect} from 'react';
import '@/styles/globals.css'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { useRouter } from "next/router";


function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      router.push('/LandingPage')
    }
  }, [])
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
