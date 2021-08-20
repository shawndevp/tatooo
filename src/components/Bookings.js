import React, {useState, useEffect} from 'react';
import axios from "axios";
import BookingsList from "./BookingsList";

function Bookings() {

    const [bookings, setBookings] = useState([])
    const [userId] = useState(localStorage.getItem("userId"))
    const [token] = useState(localStorage.getItem("jwt"))

    useEffect(()=> {

        const fetchData = async ()=> {
           const res = await axios.get(`http://localhost:1337/bookings?users_permissions_user.id=${userId}`,
           {
           headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
           )
           
           setBookings(res.data)
        }

        fetchData()
    }, [userId, token])


    return (
        <div>
            <h1>My bookings</h1><br></br>

            {bookings.map( (booking)=>{

return(
<BookingsList key={booking.id} name={booking.name} time={booking.time} mobile={booking.mobile} artist={booking.artists} price={100}  />
    )
})
}
        </div>
    )
}

export default Bookings
