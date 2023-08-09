import {Link} from "react-router-dom";
import  { useEffect, useContext } from 'react';
import { UserContext } from "./UserContext";

export default function Header(){

  const {setUserInfo,userInfo} = useContext(UserContext);
  
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include'
    }).then(response =>{
      response.json().then(userInfo =>{
        setUserInfo(userInfo)
      })
    })
  }, []);

  function logout(){
    fetch('http://localhost:4000/logout',{
      credentials:'include',
      method : 'POST',
    });
    setUserInfo(null);
  }
  
  const username = userInfo?.username;

    return (
        <header>
        <Link to="/" className="logo">MyBlog</Link>

<nav>
  {username && (
    <>
    <span>Hello, {username}</span>
    <Link to="/create">Create new post</Link>
    <a onClick={logout} className="logout" ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
</svg>
<span>Logout</span>
 </a>
    </>
  )}

    {!username &&
    <>
      <Link to="/login">Login</Link>
  <Link to="/register">Register</Link>
    </>
    }


</nav>

      </header>
    )
}