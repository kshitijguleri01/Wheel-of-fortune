import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";

import Navbar from "../component/Navbar.js";
import "../css/profile.css";
import { Checkuser, EditName } from "../api/hitapi.js";
import Footer from "../component//Footer.js";
import Cookies from "js-cookie";
import { BiSolidEdit } from "react-icons/bi";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import {images} from '../jsonData/images.js'


const Profile = () => {


  const [record, setRecord] = useState([]);
  const [currentPoint, setcurrentPoint] = useState([]);
  const owlCarouselRef = useRef(null);
  const [modalShow, setModalShow] = useState(false);
  const [profileImage,setProfileImage] = useState('');
  const [updateImage,setUpdateImage] = useState(null);
  const [InputText,setInputText] = useState('');
  const [message, setMessage] = useState('');
  const [data,setData] = useState([]);
  const ani = Cookies.get("ani");

  useEffect(() => {
    setData(images);
    Checkuser(ani).then((response) => {
      console.log("Api Response",response);
      setRecord(response.data.sumScore);
      setcurrentPoint(response.data.Points.points);
      setProfileImage(response.data.Points.imageName);
      setInputText(response.data.Points.name);



      Cookies.set("point", response.data.Points.points);
      Cookies.set("score", response.data.sumScore);
    });

    if (owlCarouselRef.current) {
      window.dispatchEvent(new Event("resize"));
    }
  }, []);

 
  const options = {
    center: false,
    items: 4,
    loop: true,
    margin: 5,
    stagePadding: 15,
    autoplay: false,
    autoPlaySpeed: 300,
    autoplayTimeout: 1000,
    responsive: {
      0: {
        items: 2,
      },
      400: {
        items: 2,
      },
      600: {
        items: 3,
      },
      700: {
        items: 3,
      },
      1000: {
        items: 4,
      },
    },
  };

  const number = Cookies.get("ani");
  const score = Cookies.get("score");
  const point = Cookies.get("point");

  const [hide, setHide] = useState(false);


  const handleModalShow = () => {
    setModalShow(true);
   
  };

  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleChange = event => {
    setMessage(event.target.value);

    console.log('value is:', event.target.value);
  };



  const handleClick = event => {
    event.preventDefault();
    
    console.log("UpdateImage",updateImage);
    // 👇️ value of input field
    console.log('UserName 👉️', message);
    if(message ===null || message === undefined || message === ' ' || message === '' ) 
    {
      setMessage("Player");
    }
    EditName(ani,message,updateImage).then((response)=>{
      console.log("response",response.data.name);
      
      setProfileImage(response.data.imageName);
      setInputText(response.data.name);
      console.log("Name",InputText);
    });
    setModalShow(false);
  };


  const handleData=(id)=>{
    data.map((item)=>{
      if(item.id===id)
      {
        setUpdateImage(item.images);
      }
    })
  }

  return (
    <>
      {/* <!-- Start Navbar Area --> */}

      <Navbar />
      {/* <!-- Search Overlay --> */}
      <div class="search-overlay">
        <div class="d-table">
          <div class="d-table-cell">
            <div class="search-overlay-layer"></div>
            <div class="search-overlay-layer"></div>
            <div class="search-overlay-layer"></div>

            <div class="search-overlay-close">
              <span class="search-overlay-close-line"></span>
              <span class="search-overlay-close-line"></span>
            </div>

            <div class="search-overlay-form">
              <form>
                <input
                  type="text"
                  class="input-search"
                  placeholder="Search here..."
                />
                <button type="submit">
                  <i class="flaticon-search-1"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Search Overlay --> */}

      {/* <!-- Start Page Title Area --> */}
      <section class="page-title-area page-title-bg1">
        <div class="container">
          <div class="page-title-content img-box">
            <img src={profileImage} class="player-image" alt="image" />
            <div onClick={() => handleModalShow()} class="edit-box">
              <BiSolidEdit />
            </div>
            <br />
            <h1 title="Sarah Taylor" style={{ color: "white" }}>
              {InputText}
            </h1>
            <span class="sub-title">{number}</span>

          
          </div>
        </div>
      </section>
      {/* <!-- End Page Title Area --> */}

      {/* <!-- Start Player Details Area --> */}
      <section class="player-details-area ptb-100">
        <div class="container">
          <div class="player-details-desc">
            <ul class="player-meta">
              <li>
                <div class="icon">
                  <i class="flaticon-3d"></i>
                </div>
                Highest Score
                <span>{record}</span>
              </li>

              <li>
                <div class="icon">
                  <i class="flaticon-network"></i>
                </div>
                Points
                <span>{currentPoint}</span>
              </li>

              <li>
                <div class="icon">
                  <i class="flaticon-fall"></i>
                </div>
                Comments
                <span>70</span>
              </li>

              <li>
                <div class="icon">
                  <i class="flaticon-game-computer"></i>
                </div>
                WIN RATIO
                <span>74.8%</span>
              </li>

              <li>
                <div class="icon">
                  <i class="flaticon-network"></i>
                </div>
                Follow
                <div class="social">
                  <a href="!#">
                    <i class="bx bxl-facebook"></i>
                  </a>
                  <a href="!#">
                    <i class="bx bxl-twitter"></i>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* <!-- End Player Details Area --> */}

      <Footer />

      {/* Button to trigger the modal */}
      {/* Vertically Centered Bootstrap Modal */}
      <Modal centered show={modalShow} onHide={handleModalClose}>
        <div class="m-h"><Modal.Header  closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
        </div>
        <Modal.Body>
          {/* Modal content */}          
          <div class="edit-profile vt-profile-modal">
            <div class="profile-inner">
            <div class="edit-img-box">
            <OwlCarousel  ref={owlCarouselRef}
                className="story owl-carousel owl-theme"
                {...options} >
                  {data.map((item)=>{
                    // console.log("data",item.images);
                   return (
                    <div class="edit-img-box-inner" onClick={()=>{handleData(item.id)}}><img src={item.images} class="player-image" alt="i" /></div>
                   )
                  })}
                
                {/* <div class="edit-img-box-inner" onClick={()=>{handleData(3)}}><img src='https://www.gameninja.in/html/games360/avatar2.png' class="player-image" alt="i" /></div>
                <div class="edit-img-box-inner" onClick={()=>{(handleData(3))}}><img src='https://www.gameninja.in/html/games360/avatar2.png' class="player-image" alt="i" /></div> */}
                {/* <div class="edit-img-box-inner" onClick={()=>{handleData(3)}}><img src={avatar2} class="player-image" alt="i" /></div> */}
                {/* <div class="edit-img-box-inner"><img src={avatar2} class="player-image" alt="image" /></div>
                <div class="edit-img-box-inner"><img src={avatar2} class="player-image" alt="image" /></div>
                <div class="edit-img-box-inner"><img src={avatar2} class="player-image" alt="image" /></div>
                <div class="edit-img-box-inner"><img src={avatar2} class="player-image" alt="image" /></div>
                <div class="edit-img-box-inner"><img src={avatar2} class="player-image" alt="image" /></div>
               */}
            </OwlCarousel>
            </div>
              <div class="edit-name-box">
                <label>Edit Name</label>
                <input  type="text" id="edit-name" onChange={handleChange} placeholder="Edit Name"></input>
                <button class="save-btn" onClick={handleClick}>Save</button>
              </div>
              
            </div>

          </div>
        </Modal.Body>
        {/* <Modal.Footer>   
          <div class="m-f">      
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          </div> 
        </Modal.Footer> */}
      </Modal>
      
    </>
  );
};

export default Profile;
