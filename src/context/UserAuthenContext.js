import React from 'react'
import { createContext,useContext,useState,useEffect } from 'react'
import { createUserWithEmailAndPassword,signInWithEmailAndPassword,getAuth,signOut,onAuthStateChanged } from 'firebase/auth'
import { auth } from '../config/Firebase';

const userAuthContext = createContext();
export  function UserAuthContextProvider({children}) {

const [user,setUser] = useState({});
function Login(Email,Password){
   
   
    return signInWithEmailAndPassword(auth,Email,Password);
}

function sigUp(Email,Password){
    return createUserWithEmailAndPassword(auth,Email,Password);
}
function logOut(){
    return signOut(auth);
}

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
            console.log("Auth",currentUser)
            setUser(currentUser);
            
        })
        return ()=>{
            unsubscribe();
        }
    })


  return (
   <userAuthContext.Provider value={{user,Login,sigUp,logOut}}>{children}</userAuthContext.Provider>
  )
}
export function useUserAuth(){
    return useContext(userAuthContext)
}