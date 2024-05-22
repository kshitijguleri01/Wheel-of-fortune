import React from 'react'
import { Link } from 'react-router-dom'
import social1 from "../images/social-shape1.png";
import social3 from "../images/social-shape3.png";
import social4 from "../images/social-shape4.png";
import social5 from "../images/social-shape5.png";
import social6 from "../images/social-shape6.png";



const Footer = () => {
  return (
    <div>
      {/* Start Social Area */}
      <section className="social-area pt-100 pb-70">
        <div className="container">
          <div className="section-title">
            <span className="sub-title">Official</span>
            <h2 style={{color:'white'}}>Stay Conected</h2>
          </div>
          <div className="row">
            <div className="col-lg-2 col-sm-4 col-md-4 col-6">
              <div className="single-social-box">
                <div className="content">
                  <i className="bx bxl-facebook" />
                  facebook
                </div>
                <div className="shape">
                  <img src={social1} alt="image" />
                  <img src={social3} alt="image" />
                </div>
                <a href="https://www.facebook.com/" className="link-btn" />
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-md-4 col-6">
              <div className="single-social-box">
                <div className="content">
                  <i className="bx bxl-twitter" />
                  Twitter
                </div>
                <div className="shape">
                  <img src={social1} alt="image" />
                  <img src={social4} alt="image" />
                </div>
                <a href="https://twitter.com/" className="link-btn" />
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-md-4 col-6">
              <div className="single-social-box">
                <div className="content">
                  <i className="bx bxl-youtube" />
                  YouTube
                </div>
                <div className="shape">
                  <img src={social1} alt="image" />
                  <img src={social5} alt="image" />
                </div>
                <a href="https://www.youtube.com/" className="link-btn" />
              </div>
            </div>
            <div className="col-lg-2 col-sm-4 col-md-4 col-6">
              <div className="single-social-box">
                <div className="content">
                  <i className="bx bxl-instagram" />
                  Instagram
                </div>
                <div className="shape">
                  <img src={social1} alt="image" />
                  <img src={social6} alt="image" />
                </div>
                <a href="https://www.instagram.com/" className="link-btn" />
              </div>
            </div>
          </div>
        </div>
      </section>
         <footer className="footer-area">
          <div className="container">
            <div className="footer-content">
              <div className="logo">
                <Link to="/home" style={{color:'white'}} className="d-inline-block"> <h6 className="wow animate__animated animate__fadeInRight" data-wow-delay="00ms" data-wow-duration="1000ms">GAME {localStorage.getItem("GameName")}</h6>
                </Link>
                <ul className="footer-menu">
                  <li className="nav-item"><a className="nav-link" href="#!">Legal</a></li>
                  <li className="nav-item"><a className="nav-link" href="#!">Terms of Use</a></li>
                  <li className="nav-item"><a className="nav-link" href="#!">Privacy policy</a></li>
                  <li className="nav-item"><a className="nav-link" href="#!">Cockie setting</a></li>
                  <li className="nav-item"><a className="nav-link" href="#!">Support center</a></li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="copyright-area">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-12 d-flex justify-content-center">
                <p>© all copyrights reserved by Visiontrek </p>
              </div>
            </div>
          </div>
        </div>
        {/* End Footer Area */}
        <div className="go-top"><i className="bx bx-up-arrow-alt" /></div>
        <div className="zelda-cursor" />
        <div className="zelda-cursor2" />

    </div>
  )
}

export default Footer