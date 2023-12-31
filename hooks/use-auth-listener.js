import {useState, useEffect, useContext} from 'react';
import FirebaseContext from '../context/firebase';

const useAuthListener = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // there is a user therefore I can store the user in localstorage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // if there isn't a user, clear the localstorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    }, [], [firebase]);

    return {user};
}