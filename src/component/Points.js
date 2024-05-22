import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import '../css/points.css';
import '../css/style.css';
import avatar from '../images/avatar.jpg';
import Cookies from 'js-cookie';
import { Button, Modal } from 'react-bootstrap';
import { useEffect } from 'react';
import { Checkuser } from '../api/hitapi';



const Points = () => {

  const [modalShow,setModalShow] = useState(true);
  const [showPoint,setShowPoint] = useState("");
  const point=Cookies.get("point");
  console.log("points",point);
  const ani = Cookies.get("ani");
  useEffect(()=>{

    console.log("ani",ani);

    Checkuser(ani).then((res)=>{

      console.log("User Points",res.data.Points.points)
      setShowPoint(res.data.Points.points);
    })
  })
  const handleModalClose = () => {
    setModalShow(false);
  };
  return (
    <div>
        <Navbar />


        <Modal centered show={modalShow} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Vertically Centered Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          {/* Modal content */}
          This is a vertically centered modal content for the Points page.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    {/* Search Overlay */}
    <div className="search-overlay">
      <div className="d-table">
        <div className="d-table-cell">
          <div className="search-overlay-layer" />
          <div className="search-overlay-layer" />
          <div className="search-overlay-layer" />
          <div className="search-overlay-close">
            <span className="search-overlay-close-line" />
            <span className="search-overlay-close-line" />
          </div>
          <div className="search-overlay-form">
            <form>
              <input type="text" className="input-search" placeholder="Search here..." />
              <button type="submit"><i className="flaticon-search-1" /></button>
            </form>
          </div>
        </div>
      </div>
    </div>
    {/* End Search Overlay */}
    {/* Start Page Title Area */}
    <section className="page-title-area page-title-bg1">
      <div className="container">
        <div className="page-title-content" style={{color:'white'}}>
          <img src={avatar} className="player-image" alt="i" />
          <br />
          <h1 title="Sarah Taylor">Player</h1>
          <span className="sub-title">Player</span>
          <h3>About the player</h3>
          <p>The global games market generated a total of $137.9 billion in revenue in 2018 which is a
            13.3% increase compared to 2017 (Newzoo, 2018)</p>
        </div>
      </div>
    </section>
    {/* End Page Title Area */}
    {/* Start Player Details Area */}
    <section className="faq-area ptb-100">
      <div className="container">
        <div className="tab faq-accordion-tab">
          <ul className="tabs d-flex flex-wrap justify-content-center active">
            <li className="current"><a href="#!"><i className="bx bx-flag" /> <span>Points: {showPoint}</span></a></li>
          </ul>
        </div>
      </div>
    </section>
    {/* End Player Details Area */}
    <Footer />
  </div>
  )
}

export default Points