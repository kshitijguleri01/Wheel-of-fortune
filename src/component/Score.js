import React, { useEffect, useState } from "react";
import Footer from "../component/Footer.js";
import Navbar from "../component/Navbar";
import "../css/score.css";
import "../css/style.css";
import { CheckScoreForScorePage, Checkscore, Checkuser } from "../api/hitapi";
import avatar from "../images/avatar.jpg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Score = () => {
  const [Showscore, setShowscore]= useState([]);
  const [score, setScore] = useState("");
  const [name,setName]= useState('');
  const [ProfileImage,setProfileImage]= useState('');

  useEffect(() => {
    const ani = Cookies.get("ani");
    Checkuser(ani).then((response) => {
      console.log("points", response.data.Points);
      console.log("userName",response.data.Points.name);
      setName(response.data.Points.name);
      setShowscore(response.data.Score);
      setProfileImage(response.data.Points.imageName);
    });
    CheckUserScore();
  }, []);


  const CheckUserScore=()=>{
    const ani= Cookies.get("ani");
    CheckScoreForScorePage(ani).then((response)=>{
      setScore(response.data.Score);
      Cookies.set("Score",response.data.Score);
    })
  }

  const redirectToGame = (gameUrl, gameId) => {
    const ani = Cookies.get("ani");

    Checkscore(ani, gameId).then((response) => {
      if (response.data.response === "Play") {
        console.log("User Can Play Game");
        window.location.href = gameUrl + "?userId=" + ani + "&gameId=" + gameId;
      } else {
        console.log("User Dont Have Enough Point to play Game");
        Swal.fire({
          text: "You Don't Have Sufficient Points",
          icon: "error",
        });
      }
    });
  };

  console.log("Score", Showscore);
  return (
    <div>
      <Navbar />
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
      {/* Start Page Title Area */}
      <section className="page-title-area page-title-bg1">
        <div className="container">
          <div className="page-title-content">
            <img src={ProfileImage} className="player-image" alt="i" />
            <br />
            <h1 title="Sarah Taylor" style={{ color: "white" }}>
              {name}
            </h1>
            {/* <span className="sub-title">{name}</span> */}
            <div class="btn-box d-flex justify-content-center">
              <span class="default-btn">Score : {score}</span>
            </div>
          </div>
        </div>
      </section>
      {/* End Page Title Area */}
      {/* Start Player Details Area */}
      <section className="player-details-area ptb-100">
        <div className="container">
          <div className="streams-list score-change">
            <div className="row">
              <h3 style={{ color: "white" }}>SCORE</h3>
              {Showscore.map((item) => {
                // console.log("item", item);
                const ani = Cookies.get("ani");
                return (
                  <div className="col-lg-4 col-md-6">
                    <div className="single-live-stream-item" onClick={()=>{redirectToGame(item.gameLink,item.gameId)}}>
                      <img src={item.imageLink} alt="i" />
                      <div className="content">
                        <h3 style={{ color: "white" }}>{item.gameName}</h3>
                        <ul className="meta">
                          <li>Score</li>
                          <li>{item.score}</li>
                        </ul>
                      </div>
                      <a href="#!!" className="video-btn">
                        <i className="flaticon-play-button" />
                      </a>
                      
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      {/* End Player Details Area */}
      {/* Start Footer Area */}
      <Footer />
    </div>
  );
};

export default Score;
