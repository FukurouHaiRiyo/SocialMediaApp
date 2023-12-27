import React from 'react';
import MainPage from './screens/main_page';
import Routes from './navigation/routes';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';

const App = () => {
  return (
    // <Routes/>
    // <MainPage/>

    <FirebaseContext.Provider value = {{firebase, FieldValue}}>
      <Routes/>
    </FirebaseContext.Provider>
  );
}

export default App;
