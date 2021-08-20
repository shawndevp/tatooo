import React, { useEffect, useState } from 'react'
import logo from "./logos/logo.jpg";
import {Link} from "react-router-dom";

function Header() {

  const [isLoggedin] = useState(true);
  const [jwt, setJwt] = useState((localStorage.getItem("jwt")))
  
  useEffect ( ()=>{
        
    const JWT = localStorage.getItem("jwt");

    setJwt(JWT)

},[])

function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}

    return (
        <>
<nav className="flex items-center justify-between flex-wrap bg-teal p-6">
  <div className="flex items-center flex-no-shrink text-black mr-6">
    <img src={logo} width="54" height="54" alt="logotype" />
    <Link to="/">
    <span className="font-semibold text-4xl tracking-tight">INK Station</span>
    </Link>
  </div>
  <div className="block lg:hidden">
    <button className="flex items-center px-3 py-2 border rounded text-teal-lighter border-teal-light hover:text-black hover:border-black">
      <svg className="h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
    </button>
  </div>
  <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto text-left">
    <div className="text-sm lg:flex-grow">
    <Link to="/Artists" className="block mt-4 lg:inline-block lg:mt-0 text-teal-lighter hover:text-black mr-4">Artists/Bokning</Link><br/>

    </div>
    <div className="space-x-5">
    <Link to="/Bookings" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Bookings</Link>
    { isLoggedin && jwt?
    <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0" onClick={clearLocalStorage}>Logout</button>
    
      : <Link to="/Login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Login</Link>
      }

      { isLoggedin && jwt? 
      <Link to="/Profile" className="inline-block text-sm px-4 py-2 leading-none border rounded text-black border-black hover:border-transparent hover:text-teal hover:bg-white mt-4 lg:mt-0">Profile</Link> 
      : <span></span>
      }
      
    </div>
  </div>
</nav>
        </>
    )
}
export default Header;
