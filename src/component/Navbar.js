import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import '../css/style.css';
import {MdMusicNote,MdMusicOff} from 'react-icons/md'
import TestMusic from "../Music/TestMusic.mp3";
import Cookies from 'js-cookie';
import { Modal } from 'react-bootstrap';
import gameLogo  from '../images/logo360.png'
import logo from '../images/logo.png';


const newAudio = new Audio(TestMusic);
     // Save the Audio object in state

const Navbar = () => {

  const [menu,setMenu] = useState('block');
  const [audio, setAudio] = useState(null); // State to hold the Audio object
  const [isPlaying, setIsPlaying] = useState(localStorage.getItem("music")); // State to track playing status
  const [modalShow, setModalShow] = useState(false);
  // let menuRef = useRef();
  

  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        localStorage.setItem("music", false);
      } else {
        audio.play();
        setIsPlaying(true);
        localStorage.setItem("music", true);
      }
    }
  };
 
 
 useEffect(()=>{
  localStorage.setItem("music", false);
  setAudio(newAudio);

    // Set initial playback state based on local storage
    
 },[])

 const handleModalClose = () => {
  setModalShow(!modalShow);
};

  const showMenu=()=> {
     setModalShow(!modalShow);
    // console.log("inside showMenu Button"+menu);
 
    // if(menu==='none')
    // {
    //   setMenu('block');
    //   // handler();
    // }
    // else{
    //   setMenu('none');
    // }
}

console.log("value",Cookies.get("music"));

  return (
    <>
    {/* Start Navbar Area */}
    <div class="navbar-area">
    <div class="zelda-responsive-nav"  >
      <div class="container">
        <div class="zelda-responsive-menu mean-container">
          <div class="mean-bar">
            <button
              class="meanmenu-reveal"
              onClick={()=>showMenu()}
            //   style="background: ; color: ; right: 0; left: auto"
              style={{background: '' , color : '' , right: 0 , left: 'auto'}}
            >
              <span>
                <span>
                  <span></span>
                </span>
              </span>
            </button>
            <nav class="mean-nav">
              {/*  `${menu}` */}
              <ul class="navbar-nav" style={{display: 'none'}}>
                <li class="nav-item">
                  <Link to="/home" class="nav-link">
                    Home{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Profile" class="nav-link">
                    Profile{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Score" class="nav-link">
                    Score{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Leader" class="nav-link">
                    Leaderboard{" "}
                  </Link>
                </li>

                <li class="nav-item mean-last">
                  <Link to="/Points" class="nav-link">
                    Points{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Radeem" class="nav-link">
                    Redeem{" "}
                  </Link>
                </li>
              </ul>

              <div class="others-option d-flex align-items-center"></div>
            </nav>
          </div>
          <div class="logo" style={{color:'white'}}>
            <Link to="/home">
              <div
                class="wow animate__animated animate__fadeInRight "
                className='flex'
                data-wow-delay="00ms"
                data-wow-duration="1000ms"
                style={{color:'white'}}
                
              >
                wheel of fortune
             
              </div>
             
            </Link>
            <div>
          {/* Play/Pause button */}
          <span onClick={toggleAudio} style={{borderRadius : '5px'}}>
            {isPlaying ?  <MdMusicNote />: <MdMusicOff />}
          </span>
          {/* Content to render after loading */}
        </div>
          </div>
        </div>
      </div>
    </div>

    <div class="zelda-nav" >
      <div class="container-fluid">
        <nav class="">
          <Link to="/home" class="navbar-brand" style={{color:'white'}}>
            <div
              className="wow animate__animated animate__fadeInRight text-xl  "
              data-wow-delay="00ms"
              data-wow-duration="1000ms">
             <div className='flex text '>
              <a className='font-semibold text-gray-900 underline dark:text-white decoration-red-500 decoration-dashed'>
          <h1 className='text-zinc-300 text-2xl'>Wheel <span className='text-red-500'>of</span> fortune
          </h1>
          </a>
             </div>
            </div>   
          </Link>
          <div className=''> 
          {/* Play/Pause button */}
          <span className='' onClick={toggleAudio} style={{borderRadius : '5px'}}>
            {isPlaying ?  <MdMusicNote className='text-zinc-300' size={15}/> : <MdMusicOff  className='text-zinc-300'/>}
          </span>
          {/* Content to render after loading */}
        </div>
          <div class="collapse navbar-collapse mean-menu">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link to="/home" class="nav-link">
                  Home{" "}
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/Profile" class="nav-link">
                  Profile{" "}
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/Score" class="nav-link">
                  Score{" "}
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/Leader" class="nav-link">
                  Leaderboard{" "}
                </Link>
              </li>

              <li class="nav-item">
                <Link to="/Points" class="nav-link">
                  Points{" "}
                </Link>
              </li>

              <li class="nav-item">
                  <Link to="/Radeem" class="nav-link">
                    Redeem{" "}
                  </Link>
                </li>
                
            </ul>

            <div class="others-option d-flex align-items-center">
              <div class="option-item">
                <div class="search-box">
                  <i class="flaticon-search-1"></i>
                </div>
              </div>

              <div class="option-item">
                <div class="side-menu-btn">
                  <i
                    class="flaticon-null-2"
                    data-bs-toggle="modal"
                    data-bs-target="#sidebarModal"
                  ></i>
                </div>
              </div>
            </div>

            <div class="dark-version-btn" style={{display : 'none'}}>
              <label id="switch" class="switch">
                <input
                  type="checkbox"
                  onchange="toggleTheme()"
                  id="slider"
                />
                <span class="slider round"></span>
              </label>
            </div>
          </div>
        </nav>
      </div>
    </div>

    <div class="others-option-for-responsive">
      <div class="container">
        <div class="dot-menu">
          <div class="inner">
            <div class="circle circle-one"></div>
            <div class="circle circle-two"></div>
            <div class="circle circle-three"></div>
          </div>
        </div>

        <div class="container">
          <div class="option-inner">
            <div class="others-option">
              <div class="option-item">
                <div class="search-box">
                  <i class="flaticon-search-1"></i>
                </div>
              </div>

              <div class="option-item">
                <div class="side-menu-btn">
                  <i
                    class="flaticon-null-2"
                    data-bs-toggle="modal"
                    data-bs-target="#sidebarModal"
                  ></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* <!-- End Navbar Area --> */}

  <Modal className="vt-navigation-new" show={modalShow} onHide={handleModalClose}>
  
        <div class="c-main-box  ">
        {/* <Modal.Header closeButton>
          <div class="c-box">
          </div>
        </Modal.Header> */}
        <Modal.Body >
        <nav class="mean-nav">
              <ul class="navbar-nav" style={{display:`${menu}`}}>
                <li class="nav-item">
                  <Link to="/home" class="nav-link">
                    Home{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Profile" class="nav-link">
                    Profile{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Score" class="nav-link">
                    Score{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Leader" class="nav-link">
                    Leaderboard{" "}
                  </Link>
                </li>

                <li class="nav-item mean-last">
                  <Link to="/Points" class="nav-link">
                    Points{" "}
                  </Link>
                </li>

                <li class="nav-item">
                  <Link to="/Radeem" class="nav-link">
                    Redeem{" "}
                  </Link>
                </li>
              </ul>
              </nav>
        </Modal.Body>
        </div>
        
        </Modal>
       
  </>
  )
}

export default Navbar