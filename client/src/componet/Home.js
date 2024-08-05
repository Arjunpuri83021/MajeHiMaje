import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import Footer from "./Footer";
import HilltopAdsBanner from "../Adds/BannerAdd";
import VideoSliderAd from "../Adds/VideoslideAdd";

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [postdata, setPostData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  const fetchData = () => {
    fetch(`${apiUrl}/getpostdata`, {
      mode: 'cors',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        const reversedData = data.reverse();
        setPostData(reversedData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleCardClick = (id, currentViews) => {
    const updatedPosts = postdata.map(item => 
      item._id === id ? { ...item, views: currentViews + 1 } : item
    );
    setPostData(updatedPosts);

    fetch(`${apiUrl}/updateviews/${id}`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ views: currentViews + 1 }),
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    })
    .then((data) => {
      console.log('Views updated:', data);
      fetchData();
    })
    .catch((error) => {
      console.error('Error updating views:', error);
    });
  };

  const filteredPosts = postdata.filter((item) => {
    const videoNoMatch = item.videoNo.toString().includes(searchTerm);
    const titelMatch = item.titel && item.titel.toLowerCase().includes(searchTerm.toLowerCase());
    return videoNoMatch || titelMatch;
  });

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

  const renderPageNumbers = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`page-button ${currentPage === i ? 'active' : ''}`}
          >
            {i}
          </button>
        );
      } else if (i === 2 && currentPage > 3) {
        pageNumbers.push(<span key="ellipsis1">...</span>);
      } else if (i === totalPages - 1 && currentPage < totalPages - 2) {
        pageNumbers.push(<span key="ellipsis2">...</span>);
      }
    }
    return pageNumbers;
  };

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = '//www.topcreativeformat.com/cf15db3295c8e7e75d0997a138f97cf4/invoke.js';
    
  //   const scriptOptions = document.createElement('script');
  //   scriptOptions.type = 'text/javascript';
  //   scriptOptions.innerHTML = `
  //     atOptions = {
  //       'key' : 'cf15db3295c8e7e75d0997a138f97cf4',
  //       'format' : 'iframe',
  //       'height' : 300,
  //       'width' : 160,
  //       'params' : {}
  //     };
  //   `;
    
  //   document.getElementById('adsterra-banner').appendChild(scriptOptions);
  //   document.getElementById('adsterra-banner').appendChild(script);
  // }, []);

  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.type = 'text/javascript';
  //   script.async = true;
  //   script.src = '//www.topcreativeformat.com/5d821ecf7285968830894277e9520b3e/invoke.js';
    
  //   const scriptOptions = document.createElement('script');
  //   scriptOptions.type = 'text/javascript';
  //   scriptOptions.innerHTML = `
  //     atOptions = {
  //       'key' : '5d821ecf7285968830894277e9520b3e',
  //       'format' : 'iframe',
  //       'height' : 60,
  //       'width' : 468,
  //       'params' : {}
  //     };
  //   `;
    
  //   document.getElementById('topcreativeformat-banner').appendChild(scriptOptions);
  //   document.getElementById('topcreativeformat-banner').appendChild(script);
  // }, []);


  useEffect(() => {
    // Create a script element
    const script = document.createElement('script');
    script.src = "//neat-period.com/b.XEVpsodzGPl/0VYRWLcJ/KeamI9JuvZUUUlVkpPsT/UR0xNOz/M/0/OrDKIltuN/TFQL3vMCznQW4OMLwt";
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    
    // Inject the script into the document
    const existingScript = document.scripts[document.scripts.length - 1];
    existingScript.parentNode.insertBefore(script, existingScript);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);



  

  return (
    <>


     <HilltopAdsBanner/>
      <Navbar onSearch={handleSearch} />
      
      {/* <div id="topcreativeformat-banner" style={{ margin: '20px auto', textAlign: 'center' }}></div> */}
      {/* <iframe className="m-auto" src="//a.magsrv.com/iframe.php?idzone=5371288&size=300x250" width="300" height="120" scrolling="no" marginwidth="0" marginheight="0" frameborder="0"></iframe> */}

       <VideoSliderAd/> 
       
      <div id="ad-container" className="all-cards">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {currentPosts.map((items) => (
            <div className="col" key={items._id} onClick={() => handleCardClick(items._id, items.views)}>
              <Link to={items.link}>
                <div className="card">
                  <img src={items.imageUrl} className="card-img-top position-relative" alt="..." />
                  <p className="p-0 m-0 text-light">{items.titel}</p>
                  <div className="card-body">
                    <h5 className="card-title">Video No: {items.videoNo}</h5>
                    <span style={{ top: "5%", padding: "2px 8px" }} className="position-absolute views"><i className="bi bi-clock"></i> {items.minutes} Min</span>
                    <span style={{ top: "5%", right: "3%", padding: "2px 8px" }} className="position-absolute views"><i className="bi bi-eye-fill"></i> {items.views}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      
      {/* <div id="adsterra-banner" style={{ margin: '20px auto', textAlign: 'center' }}></div> */}

      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={handlePreviousPage} className="nav-button">Previous</button>
        )}
        {renderPageNumbers()}
        {currentPage < totalPages && (
          <button onClick={handleNextPage} className="nav-button">Next</button>
        )}
      </div>
      
     
      {/* <iframe className="mt-3"
        src="//a.magsrv.com/iframe.php?idzone=5371288&size=300x250"
        width={300}
        height={250}
        scrolling="no"
        marginWidth={0}
        marginHeight={0}
        frameBorder={0}
      /> */}
      <Footer />
    </>
  );
}

export default Home;
