import React, { useEffect, useState } from "react";

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
import { Checkscore, Gameinfo } from "../api/hitapi";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import chimneyport from "../images/Chimney-Port.webp";
import safeavoid from "../images/safe-avoid.webp";
import "../css/allcategory.css";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/allcategory.css";

const Allcategory = () => {
  const [list, setList] = useState([]);
  const [display, setDisplay] = useState("block");
  const [games, setGames] = useState([]);
  const [gameDisplay, setGameDisplay] = useState("none");

  useEffect(() => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
    Gameinfo().then((response) => {
      console.log("GameInfo", response);

      setList(response.data);
      // setGames(response.data);
    });
  }, []);

  const GameShow = (category) => {
    
    setDisplay("none");
    setGameDisplay("block");
    setGames(
      list.filter((item) => {
        return item.gameCategory === category;
      })
    );
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

  const hideGame = () => {
    setDisplay("block");
    setGameDisplay("none");
  };

  return (
    <div>
      <Navbar />
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
              Top Categories Games
            </span>
          </div>
        </div>
        <div className="banner-video-slides owl-carousel owl-theme" style={{display : 'none'}}>
          <div className="banner-video-box">
            <img src={chimneyport} alt="i" />
            <div className="content"></div>
          </div>
          <div className="banner-video-box">
            <img src={safeavoid} alt="i" />
            <div className="content"></div>
          </div>
        </div>
      </div>
      {/* End Main Banner Area */}
      <div className="container pb-5">
        <div className="streams-list">
          <div className="row">
            {list.map((item, index) => {
              if (item.categoryImage != null) {
                return (
                  <div
                    className="col-lg-4 col-6"
                    style={{ display: `${display}` }}
                  >
                    <button
                      onClick={() => GameShow(item.gameCategory)}
                      className="change-img-btn"
                    >
                      <div className="single-live-stream-item">
                        <img src={item.gameCategoryLink} alt="i" />

                        <div className="content">
                          <h3 style={{ color: "white" }}>
                            {item.gameCategory}
                          </h3>
                        </div>
                        <a href="#!" className="video-btn">
                          <i className="flaticon-play-button" />
                        </a>
                        <span href="#" className="link-btn" />
                      </div>
                    </button>
                  </div>
                );
              }
            })}

            <div
              className="justify-content-center margin-left:30px pt-3 btn-center"
              style={{ display: `${display}` }}
            >
              <Link to="/home" class="default-btn">
                back
              </Link>
            </div>

            {games.length >0 && games.map((item, index) => {
              return (
                <div
                  className="col-lg-4 col-6"
                  style={{ display: `${gameDisplay}` }}
                >
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
            })}
          </div>
        </div>
        <div
          class="justify-content-center margin-left:30px pt-3 btn-center"
          style={{ display: `${gameDisplay}` }}
        >
          <span
            onClick={() => {
              hideGame();
            }}
            class="default-btn"
          >
            back
          </span>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Allcategory;
