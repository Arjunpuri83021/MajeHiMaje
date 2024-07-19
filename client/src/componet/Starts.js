import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;

function Starts() {
    const [starUrl, setStarUrl] = useState('');
  const [starName, setStarName] = useState('');
  const [starLike, setStarLike] = useState('');
  const [starImgUrl, setStarImgUrl] = useState('');

  const [stars, setStars] = useState([]);

  useEffect(() => {
    fetchStars();
  }, []);

  const fetchStars = async () => {
    try {
      const response = await fetch(`${apiUrl}/getstars`);
      const data = await response.json();
      console.log(data)
      setStars(data);
    } catch (error) {
      console.error('Error fetching stars:', error);
    }
  };

    return ( 
        <>
        <Navbar/>
        


        <div className="all-cards">
        <div className="row row-cols-2 row-cols-md-5 g-4">
          {stars.map((item) => (
            <div className="col" key={item._id}>
              <Link to={item.starurl} key={item._id}>
                <div className="card" style={{ height: "250px" }}>
                  <img style={{ height: "227px",position:"relative"}} src={item.starImgUrl} className="card-img-top" alt={item.starName} />
                   <span className="text-light p-1" style={{position:"absolute", opacity:"70%"}} ><i style={{color:"#ff0099"}} class="bi bi-hand-thumbs-up-fill"></i>{item.likes}</span>
                  <p style={{color:"#ff0099"}} className="p-0 m-0">{item.starName}</p>
                </div>
              </Link>
              
            </div>
          ))}
        </div>
      </div>
        
        </>
     );
}

export default Starts;