import React, {useState, useEffect} from "react";
import Artists from "./Artists";
import axios from "axios";

function ArtistsList() {

  const [products, setProduct] = useState([]);
  const [loadPage, setLoadPage] = useState(2);

  useEffect(()=> {

    const fetchProducts = async()=>{
      const response = await axios.get(`http://localhost:1337/Artists?_limit=${loadPage}`);
      setProduct(response.data)
    }

    fetchProducts()
  }, [loadPage] )


  function loadMore() {

    let dynamicPage = loadPage + 2;
    setLoadPage(dynamicPage)
  }

  function showLess() {
    setLoadPage(2)
  }

  return (
    <>
      {products.map((artist) => (
          <Artists
            key={artist.id}
            artistId={artist.id}
            name={artist.name}
            price={artist.price}
            description={artist.description}
            img={artist.img}
          />
      ))}


      <button onClick={loadMore}>Load more</button><br/>
      <button onClick={showLess}>Show less</button>
    </>
  )
}

export default ArtistsList;
