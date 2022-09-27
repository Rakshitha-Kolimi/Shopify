import { useEffect } from 'react';
import { useState } from 'react';
import {createContext} from 'react';
import { onAuthStateChangedListener } from '../utils/firebase/firebase.util';
import { createUserDocumentFromAuth } from '../utils/firebase/firebase.util';

export const UserContext = createContext({
  currentUser:null,
  setCurrentUser : ()=>null
})

export const UserProvider = ({children}) => {
    const [currentUser,setCurrentUser]=useState(null);
    const value={currentUser,setCurrentUser}; 

useEffect(()=>{
    const unsuscribe = onAuthStateChangedListener((user)=>{
        if(user){
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
    })
    return unsuscribe;
},[]);

return <UserContext.Provider value={value}> {children}</UserContext.Provider>
}