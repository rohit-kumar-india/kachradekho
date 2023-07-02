import React, { use, useEffect } from 'react';
import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store/store';
import { useRouter } from "next/router";
import { useSelector, useDispatch } from 'react-redux'
import { setUserData } from '@/store/currentUserData';
import { setIsLoggedIn } from '@/store/slices';

function App({ Component, pageProps }) {
  const router = useRouter()
  // const dispatch = useDispatch();

  // // fetch and current user data into the redux
  // const fetchUserData = async () => {
  //   try {
  //     // Perform API call to fetch user data
  //     const response = await fetch('your_api_endpoint');
  //     const data = await response.json();

  //     // Dispatch the action to store the user data in Redux
  //     dispatch(setUserData(data));
  //   } catch (error) {
  //     // Handle error
  //   }
  // };

  useEffect(() => {
    // if (isLoggedIn==='false') {
    //   router.push('/LandingPage')
    // }

    // fetchUserData();
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default App;
