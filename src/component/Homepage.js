import React, { useEffect, useRef, useState } from "react";

// All CSS file are import....
import "../css/style.scss";
import "../css/homepage.css";
import "../css/style.css";
import "../css/animate.min.css";
import "../css/bootstrap.min.css";
import "../css/boxicons.min.css";
import "../css/dark-style.css";
import "../css/dark-style.css.map";
import "../css/dark-style.scss";
import "../css/fancybox.min.css";
import "../css/flaticon.css";
import "../css/magnific-popup.min.css";
import "../css/meanmenu.min.css";
import "../css/responsive.css";
import "../css/responsive.css.map";
import "../css/responsive.scss";
import "../css/style.css.map";
import {
  CheckScoreForScorePage,
  Checkscore,
  Checkuser,
  Gameinfo,
  GifApi,
} from "../api/hitapi";

//import components
import Navbar from "../component/Navbar.js";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Footer from "../component/Footer";
import gif1 from "../images/gif1.gif";
import gif2 from "../images/giphy.webp";
import coins from "../images/coins.gif";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { useNavigate } from "react-router-dom";
import SubCategory from "./SubCategory";
import { Button, Modal } from "react-bootstrap";
import racinggame from '../images/racinggame.webp';

const Homepage = () => {
  const owlCarouselRef = useRef(null);
  const [list, setList] = useState([]);
  const [image, setImage] = useState([]);
  const [display, setDisplay] = useState("block");
  const [score, setScore] = useState("");
  const [diceDisplay, setDiceDisplay] = useState("block");
  const [dicevalue, setDicevalue] = useState("none");
  const [fruit, setfruit] = useState("none");
  const [fruitDisplay, setFruitDisplay] = useState("block");
  const [gifData, setGifData] = useState([]);
  const [GameLink, setGameLink] = useState([]);
  const [frameDisplay, setFrameDisplay] = useState("none");
  const [height, setHeight] = useState("500px");
  const [games, setGames] = useState([]);
  const [gameDisplay, setGameDisplay] = useState("none");
  const [categoryDisplay, setCategoryDisplay] = useState("block");
  const [modalShow, setModalShow] = useState(false);

  useEffect(() => {
    try {
      Gameinfo().then((response) => {
        setList(response.data);
        setImage(response.data);
        // setGames(response.data);

        if (owlCarouselRef.current) {
          window.dispatchEvent(new Event("resize"));
        }
        showGif();
        ScoreMethod();
        CheckUserScore();
      });
    } catch {
      console.log("Excption");
    }
  }, []);

  const navigate = useNavigate();

  const options = {
    center: false,
    items: 4,
    loop: true,
    margin: 5,
    stagePadding: 15,
    autoplay: true,
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

  const ScoreMethod = () => {
    const ani = Cookies.get("ani");
    Checkuser(ani).then((response) => {
      // setScore(response.data.Points.score);
      Cookies.set("point", response.data.Points.points);
    });
  };

  const CheckUserScore = () => {
    const ani = Cookies.get("ani");
    CheckScoreForScorePage(ani).then((response) => {
      setScore(response.data.Score);
      Cookies.set("Score", response.data.Score);
    });
  };
  const checkUserPoint = (gameUrl, gameId) => {
    const ani = Cookies.get("ani");
    Checkscore(ani, gameId).then((response) => {
      if (response.data.response === "Play") {
        window.location.href = gameUrl + "?userId=" + ani + "&gameId=" + gameId;
      } else {
        Swal.fire({
          text: "You Don't Have Sufficient Points",
          icon: "error",
        });
      }
    });
  };

  const Filter = (name) => {
    setList(
      image.filter((item) => {
        if (name === "ALL") {
          return item.rating;
        }

        return item.rating == name;
      })
    );
  };

  const showimage = (id) => {
    console.log("id", id);

    const ani = Cookies.get("ani");
    Checkscore(ani, id).then((response) => {
      if (response.data.response === "Play") {
        localStorage.setItem('music',false);
        setDisplay("none");
        setFrameDisplay("block");
        if (id === 15) {
          setHeight("500px");
          setGameLink(
            list.filter((item) => {   
              return item.id === id;
            })
          );
        } else {
          setGameLink(
            gifData.filter((item) => {
              return item.id === id;
            })
          );
        }
      } else {
        Swal.fire({
          text: "You Don't Have Sufficient Points",
          icon: "error",
        });
      }
    });
  };

  const backButton = () => {
    ScoreMethod();
    window.location.reload();
  };

  const showGif = () => {
    GifApi().then((response) => {
      console.log("response", response.data.gif);
      setGifData(response.data.gif);
    });
  };

  const categoryNavigate = (category) => {
    // setCategoryDisplay('none');
    // setGameDisplay('block');
    // setGames(
    //   games.filter((item) => {
    //     return item.gameCategory === category;
    //   })
    // );
    SubCategory(category);
  };

  const redirectToGame = (gameUrl, gameId) => {
    const ani = Cookies.get("ani");

    Checkscore(ani, gameId).then((response) => {
      if (response.data.response === "Play") {
        window.location.href = gameUrl + "?userId=" + ani + "&gameId=" + gameId;
      } else {
        Swal.fire({
          text: "You Don't Have Sufficient Points",
          icon: "error",
        });
      }
    });
  };

  // const renderModalContent = (category) =>
  // console.log("value",category)
  // setModalShow(true)
  // (
  //   <div className="vertical-modal">
  //     <div className="vertical-modal-content">
  //       <h2>Vertical Modal</h2>
  //       <p>Modal content goes here...</p>
  //     </div>
  //     <div className="vertical-modal-close">
  //       <button onClick={() => setModalShow(false)}>Close</button>
  //     </div>
  //   </div>
  // );

  const handleModalShow = (category) => {
    console.log("Show")
    setGames(
      image.filter((item) => {
        return item.gameCategory === category;
      })
    );
    // console.log("value",games)
    setModalShow(!modalShow);
  };

  const handleModalClose = () => {
    setModalShow(!modalShow);
  };

  const hideGame = () => {
    window.location.reload();
  };
  return (
    <>
      <Navbar />


      {/* Button to trigger the modal */}
      {/* Vertically Centered Bootstrap Modal */}
      <Modal centered show={modalShow} onHide={handleModalClose}>
        <div class="c-main-box">
        {/* <Modal.Header closeButton>
          <div class="c-box">
            <Modal.Title>Game 360</Modal.Title>
          </div>
        </Modal.Header> */}
        <Modal.Body >
        
        {/* <div class="c-box-inner"> */}
        <section className="player-details-area " >
        <div className="container">
          <div className="streams-list score-change">
        <div class="row vt-show-game">
          {games.length >0 && games.map((item,index)=>{
            // console.log("Test",item);
            return (
              <>
              {/* <div class="c-box-inner-img" >  <button className="c-play-btn" type="submit">
                  Play Game 
                </button> <button
                onClick={() => redirectToGame(item.gameUrl, item.id)}
                className="change-img-btn"
              ><div className="single-live-stream-item">
              <img src={item.imageUrl} alt="i" />
              <div className="content">
                    <h3 style={{ color: "white" }}>{item.gameName}</h3>
                  </div></div></button></div>
                   */}
                    <div className="col-lg-12 col-md-12">
                    <div className="single-live-stream-item" onClick={()=>{redirectToGame(item.gameUrl,item.id)}} >
                      <img src={item.imageUrl} alt="i" />
                      <div className="content">
                        <h3 style={{ color: "white" }}>{item.gameName}</h3>
                        {/* <ul className="meta">
                          <li>Score</li>
                          <li>{item.score}</li>
                        </ul> */}
                      </div>
                      <a href="#!!" className="video-btn">
                        <i className="flaticon-play-button" />
                      </a>
                      
                    </div>
                  </div>
                  </>
            );
          })}
            </div>
            </div>
            </div>
            </section>
          {/* Modal content */}
        
        {/* { games.length>0 && games.map((item, index) => {
            console.log("modal fkjsdh",item.gameUrl);
            (
              <div className="col-lg-4 col-6">
              <button
                onClick={() => redirectToGame(item.gameUrl, item.id)}
                className="change-img-btn"
              >
                <div className="single-live-stream-item">
                  <img src={item.imageUrl} alt="i" />

                  <div className="content">
                    <h3 style={{ color: "white" }}>{item.gameName}</h3>
                  </div>
                  <a href="#!" className="video-btn">
                    <i className="flaticon-play-button" />
                  </a>
                  <span href="#" className="link-btn" />
                </div>
              </button>
            </div>
            );
          })} */}
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
        </Modal.Footer> */}
        </div>
      </Modal>
      {/* End Navbar Area */}
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
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search here..."
                />
                <button type="submit">
                  <i className="flaticon-search-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* End Search Overlay */}
      {/* Start Main Banner Area */}
      <div className="main-banner jarallax" data-jarallax='{"speed": 0.3}'>
        <div className="container pt-5">
          <div className="main-banner-content">
            <span
              className="sub-title wow animate__animated animate__fadeInLeft"
              data-wow-delay="00ms"
              data-wow-duration="1000ms"
            >
              {/* <div class="cus-titel">
                <p class="p p1">Enjoy The Games</p>
                <p class="p p2">Enjoy The Games</p>
                <p class="p p3">Enjoy The Games
                <div class="cursor"></div></p>
              </div> */}
              <div class="loader">
                <span>E</span>
                <span>n</span>
                <span>j</span>
                <span>o</span>
                <span>y</span>
                <span>-</span>
                <span>T</span>
                <span>h</span>
                <span>e</span>
                <span>-</span>
                <span>G</span>
                <span>a</span>
                <span>m</span>
                <span>e</span>
                <span>s</span>
              </div>
            </span>
            
            <div
              className="logo wow animate__animated animate__fadeInUp"
              data-wow-delay="00ms"
              data-wow-duration="1000ms"
            >
              <h6
                className="wow animate__animated animate__fadeInRight"
                data-wow-delay="00ms"
                data-wow-duration="1000ms"
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div class="text-animation">
                  <div class="text-wrapper text-white">
              
          <div className="text-white">
      <h1 className=" sm:text-8xl text-5xl">
      Wheel <span className="text-red-600">of</span> fortune
      </h1>
            </div>
              
                  </div>
                </div>
                {/* <div class="ball bounce bounce1">3</div>
                <div class="ball bounce bounce2">6</div>
                <div class="ball bounce bounce3">0</div> */}
              </h6>
            </div>
          </div>
        </div>
      </div>
      {/* <div class="btn-box d-flex justify-content-center" >
          <span class="default-btn" style={{ top: '20px'}}>Score : {score}</span>
        </div> */}


  <div className="btn-box d-flex justify-content-center">
    <span className="default-btn">Score : {score}</span>
  
</div>
      <div
        className="upper-games pb-5"
        // style={{
        //   backgroundImage: `url(${light}), radial-gradient(circle at 50% 50%,#41307d,#1a1724)`,
        //   backgroundSize: "contain",
        //   backgroundRepeat: "no-repeat",
        // }}
      >
        
        <div
          class="row d-flex justify-content-center gif-row"
          style={{
            backgroundImage: `url(${gif1}), url(${gif2})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top right, left top",
          }}
        >
          <div class="col d-flex justify-content-center mb-3">
            {list.map((item) => {
              if (item.id === 15) {
                // const ani = Cookies.get("ani");
                return (
                  <>
                    <button
                      class="img-btn"
                      onClick={() => showimage(item.id)}
                      style={{
                        background: "transparent",
                        border: "none",
                        backgroundImage: `url(${coins})`,
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        style={{ display: `${display}` }}
                        id="spinnerid"
                        alt="i"
                      />
                    </button>
                  </>
                );
              }
            })}
          </div>
        </div>
        {/* <div class="btn-box d-flex justify-content-center">
          <span
            style={{ display: `${frameDisplay}` }}
            onClick={() => {
              backButton();
            }}
            class="default-btn"
          >
            back
          </span>
        </div> */}
        <div className="container" style={{ display: `${display}` }}>
          <div className="row align-correct px-2">
            <div
              class="row d-flex justify-content-center gif-row"
              style={{
                backgroundImage: `url(${gif1}), url(${gif2})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top right, left top",
              }}
            >
              <OwlCarousel
                ref={owlCarouselRef}
                className="story owl-carousel owl-theme"
                {...options}
              >
                {gifData.map((items) => {
                  return (
                    <div class="item">
                      <div class="mb-3 px-0">
                        <button
                          class="radius"
                          onClick={() => showimage(items.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            backgroundImage: `url(${coins})`,
                          }}
                        >
                          <img
                            onClick={() => {
                              showimage(items.id);
                            }}
                            src={items.gamegif}
                            alt="i"
                          />
                        </button>
                        {/* <iframe
                      loading="lazy"
                      src={
                        item.gameUrl + "?userId=" + ani + "&gameId=" + item.id
                      }
                      style={{ display: `${frameDisplay}`, height: "500px" }}
                      id="game1"
                      title="spin"
                    ></iframe> */}
                      </div>
                    </div>
                  );
                })}
              </OwlCarousel>
            </div>
          </div>
        </div>
        <div className="game-show" style={{ display: `${frameDisplay}` }}>
          {GameLink.map((item) => {
            console.log("name", height);
            const ani = Cookies.get("ani");

            return (
              <iframe
                loading="eager"
                src={item.gameUrl + "?userId=" + ani + "&gameId=" + item.id}
                style={{ height: `${height}`,width :'100%' }}
                id="game1"
                title="txt"
              ></iframe>
            );
          })}
        </div>
        <div class="d-flex justify-content-center pt-3">
          <span
            style={{ display: `${frameDisplay}` }}
            onClick={() => {
              backButton();
            }}
            class="default-btn"
          >
            back
          </span>
        </div>
      </div>
      {/* End Main Banner Area */}
      <div className="correction1" style={{ color: "white" }}>
        <div className="container pb-5">
          <div className="streams-list">
            <h3>Top Categories Games</h3>
            <div className="row">
              {image.map((item, index) => {
                if (item.categoryImage != null) {
                  if (index <= 5) {
                    return (
                      <div
                        className="col-lg-4 col-6 col"
                        style={{ display: `${categoryDisplay}` }}
                      >
                        <div
                          className="single-live-stream-item"
                          onClick={() => {
                            handleModalShow(item.gameCategory);
                          }}
                        >
                          <img
                            src={item.gameCategoryLink}
                            alt="i"
                            style={{ borderRadius: "10% !important" }}
                          />
                          <div className="content">
                            <h3>{item.gameCategory}</h3>
                          </div>
                          {/* <a href={item.gameUrl} className="video-btn">
                            <i className="flaticon-play-button" />
                          </a> */}
                          <a href="#!" className="link-btn" />
                        </div>
                      </div>
                    );
                  }
                }
              })}
            </div>
          </div>
          <div class="btn-box d-flex justify-content-center">
            <Link
              to="/Allcategory"
              class="default-btn"
              style={{ display: `${categoryDisplay}` }}
            >
              See All
            </Link>
          </div>
        </div>
      </div>
      <section
        className="live-stream-area ptb-100 jarallax"
        data-jarallax='{"speed": 0.3}'
      >
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Top Rated Games</span>
            <h2 style={{ color: "white" }}>Filter By Rating</h2>
          </div>
          <div className="live-stream-tabs">
            <ul className="nav nav-tabs mb-4" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="all-tab"
                  data-bs-toggle="tab"
                  href="#all"
                  role="tab"
                  aria-controls="all"
                  aria-selected="false"
                  onClick={() => {
                    Filter("ALL");
                  }}
                >
                  ALL
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="twitch-tab"
                  data-bs-toggle="tab"
                  href="#twitch"
                  role="tab"
                  aria-controls="twitch"
                  aria-selected="true"
                  onClick={() => {
                    Filter(4.5);
                  }}
                >
                  4.5
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="youtube-tab"
                  data-bs-toggle="tab"
                  href="#youtube"
                  role="tab"
                  aria-controls="youtube"
                  aria-selected="false"
                  onClick={() => {
                    Filter(4.3);
                  }}
                >
                  4.3
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="mixer-tab"
                  data-bs-toggle="tab"
                  href="#mixer"
                  role="tab"
                  aria-controls="mixer"
                  aria-selected="false"
                  onClick={() => {
                    Filter(4.7);
                  }}
                >
                  4.7
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a
                  className="nav-link"
                  id="vimeo-tab"
                  data-bs-toggle="tab"
                  href="#vimeo"
                  role="tab"
                  aria-controls="vimeo"
                  aria-selected="false"
                  onClick={() => {
                    Filter(4.2);
                  }}
                >
                  4.2
                </a>
              </li>
            </ul>
            <div className="tab-content" style={{ color: "white" }}>
              <div className="">
                <div className="row">
                  {list.map((item, index) => {
                    return (
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6 pb-4">
                        <div className="single-live-stream-box">
                          <img src={item.imageUrl} alt="i" />
                          <div className="content">
                            <h3>
                              {item.gameName}
                              <i className="flaticon-play" />
                            </h3>
                            <h3 className="rating1">{item.rating}</h3>
                          </div>
                          <span
                            onClick={() => {
                              checkUserPoint(item.gameUrl, item.id);
                            }}
                            className="link-btn"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div class="btn-box d-flex justify-content-center">
              <Link to="/Allimages" class="default-btn">
                See All
              </Link>
            </div>
          </div>
          {/* </div> */}
        </div>
      </section>
      {/* Start Subscribe Area */}
      {/* End Subscribe Area */}
      {/* End Social Area */}
      <Footer />
      
      );
    </>
  );
};

export default Homepage;
