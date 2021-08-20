import React from "react";
import Header from "./Header";
import Menu from "./Menu";
import ArtistsList from "./ArtistsList";
import Login from "./Login";
import Register from "./Register";
import AddtoArtists from "./AddToArtists";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Bookings from "./Bookings";
import Profile from "./Profile";

import {
    BrowserRouter as Router,
    Route
  } from "react-router-dom";


  function AppRoute() {
      return (
        <>
        <Router>
        <Header/>
        <Route path="/" exact component={Menu}/>
        <Route path="/Artists" exact component={ArtistsList}/>
        <Route path="/Login" exact component={Login}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/AddToArtists" exact component={AddtoArtists}/>
        <Route path="/resetpassword" exact component={ResetPassword}/>
        <Route path="/forgotpassword" exact component={ForgotPassword}/>
        <Route path="/Bookings" exact component={Bookings}/>
        <Route path="/Profile" exact component={Profile}/>
        
        </Router>

    

        </>
      )
  }

export default AppRoute;