import React, { useEffect, useState } from "react";

import Navbar from "../component/Navbar";
import Footer from "./Footer";
import { Leader } from "../api/hitapi";
import "../css/profile.css";

const Leaderboard = () => {
  const [list, setList] = useState([]);
  
  useEffect(() => {
    Leader().then((response) => {
      console.log("LeaderBoardScore", response);
    
      setList(response.data.Score);
    });
  }, []);
  return (
    <>
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
        {/* Start Page Title Area */}
        <section className="page-title-area page-title-bg1">
          <div className="container">
            <div className="page-title-content">
              <br />
              <h1 title="Sarah Taylor" style={{ color: "white" }}>
                LEADERBOARD
              </h1>
            </div>
          </div>
        </section>
        {/* End Page Title Area */}
        {/* Start Player Details Area */}
        <section
          className="player-details-area ptb-100"
          style={{ color: "white" }}
        >
          <div className="container">
            <div class="leader-bord-header">
              <div class="leader-bord-header-inner"><span>Profile</span></div>
              <div class="leader-bord-header-inner"><span>Name</span></div>
              <div class="leader-bord-header-inner"><span>Score</span></div>
            </div>
            <div className="player-details-area-inner">
              {list.map((item, index) => {
                return(
                <div className="player-details-area-box">
                  <div className="schedule-box">
                   
                    <div className="content leader-bord">
                      <div className="time leader-bord-img">
                        <img src={item.imageName} class="player-image" alt="im" />
                      </div>
                      <div className="leader-box-inner-name">
                        <span>{item.name}</span>
                      </div>
                      <div className="leader-border-score">                        
                        <span className="score-add">{index+1} Rank</span>
                        <h3>{item.score}</h3>
                      </div>
                      
                    </div>

                    <a href="#!" className="link-btn" />
                  </div>
                </div>
                );
              })}

             
            </div>
          </div>
        </section>
        {/* End Player Details Area */}
        <Footer />
      </div>
    </>
  );
};

export default Leaderboard;
