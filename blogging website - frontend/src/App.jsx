import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import  UserAuthForm from './pages/userAuthForm.page';
import { createContext,useEffect,useState }from 'react'
import { GetSessionData } from "./common/session";
import Editor from './pages/editor.pages';

export const UserContext =createContext({});

const App = () => {
  const [userAuth,setUserAuth]=useState({});
  
   useEffect(()=>{
     
    let userSessionData=GetSessionData('user');
         
    userSessionData ? setUserAuth(JSON.parse(userSessionData)):setUserAuth({access_token:null});
    
   },[])

    return (
       <UserContext.Provider value={{userAuth,setUserAuth}}>
            <Routes>
                <Route path="/editor" element={<Editor/>}/>
                <Route path="/" element={<Navbar />}>
                    <Route path="/signin" element={<UserAuthForm type={"sign-in"}/>} /> 
                    <Route path="/signUp" element={<UserAuthForm type={"sign-Up"}/>} />
                </Route>
            </Routes>
      </UserContext.Provider>
    )
}

export default App;

// / + signin = sigin (parent+child)