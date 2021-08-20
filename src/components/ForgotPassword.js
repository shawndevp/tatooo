import React, { useEffect, useState } from 'react'
import axios from 'axios';
import fireStore from "../FirebaseConfig"
import dotenv from 'dotenv'
dotenv.config();

function ForgotPassword() {

  const [firebaseData, setfirebaseData] = useState([]);
  const [jwt, setJwt] = useState((localStorage.getItem("jwt")))

  useEffect ( ()=>{
        
    const JWT = localStorage.getItem("jwt");

    setJwt(JWT)

},[])

  useEffect( ()=> {
    const fetchData = async()=> {
     const res = await fireStore.collection("test").doc("wqyTvUbsudxCDjETUM0p").get();

     setfirebaseData(res.data([0]))
     console.log(res.data([0]))
    }
    fetchData();
  },[])

const initialValues = {
    email:""
  }

const [formValues, setFormValues] = useState(initialValues);

function handleOnChange(e) {
  setFormValues({...formValues, [e.target.name]:e.target.value})
}

    function resetRequest(e) {
      e.preventDefault()

        axios
    .post('http://localhost:1337/auth/forgot-password', {
      email: formValues.email // user's email
    })
    .then(response => {
      console.log('Your user received an email', response);
    })
    .catch(error => {
      console.log('An error occurred:', error.response);
    });
    }
    
    function submitFirebaseData() {
      fireStore.collection("test").add({
        name:"Detta är ett testdata som ska in i firebase"
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        console.log("Document written with ID: ", docRef);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });
    }

    return (
        <>

        {/* {firebaseData} */}
        {jwt ? (
                  <div className="w-full">
                  <div className="h-2 bg-indigo"></div>
                  <button className="text-green-700" onClick={submitFirebaseData}>Mata in testdata i firebase</button>
                    <div className="flex items-center justify-center h-screen">
                      <div className="container mx-24 bg-white rounded shadow-lg">
                        <div className="px-12 py-6">
                          <div className="text-center">
                            <h1 className="font-normal text-3xl text-grey-darkest leading-loose my-3 w-full">Recover your password here</h1>
                            <div className="w-full text-center">
                              <form onSubmit={resetRequest}>
                                <div className="max-w-sm mx-auto p-1 pr-0 flex items-center">
                                  <input type="text" onChange={handleOnChange} value={formValues.email} placeholder="yourmail@example.com" className="flex-1 appearance-none rounded shadow p-3 text-grey-dark mr-2 focus:outline-none"/>
                                  <button type="submit" className="appearance-none bg-indigo text-black text-base font-semibold tracking-wide uppercase p-3 rounded shadow hover:bg-indigo-light">Send</button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
        ): (
          <div>You have no rights to view this</div>
        )}
         Återställ lösenord
         <button onClick={resetRequest}>Återställ</button>   
        </>
    )
}

export default ForgotPassword
