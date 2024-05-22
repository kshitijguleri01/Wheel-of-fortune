import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Checkuser } from "../api/hitapi";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Cookies from "js-cookie";
import "../css/style.css";
import { TailSpin } from "react-loader-spinner"; // Import the loader component you want to use
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"; // Update this import
import TestMusic from "../Music/TestMusic.mp3";
import useSound from "use-sound";
import logo from '../images/360.png';
import boxlogo from '../images/logo360.png';

const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for the loader
  const [audio, setAudio] = useState(null); // State to hold the Audio object
  const [isPlaying, setIsPlaying] = useState(false); // State to track playing status



  // const [playSound, { sound, stop }] = useSound(TestMusic);
  const toggleAudio = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
 

  useEffect(() => {
    try {
      // Trigger audio playback on page load
    //   const newAudio = new Audio(TestMusic);
    // setAudio(newAudio); // Save the Audio object in state
    // toggleAudio();
    const newAudio = new Audio(TestMusic);
    setAudio(newAudio); // Save the Audio object in state
  
      let params = new URLSearchParams(window.location.search);
      let ani = params.get("ani");
      let serviceId=params.get("serviceId");
      if(serviceId==null || serviceId==="undefined") 
      {
        localStorage.setItem("GameName","BOX");
        localStorage.setItem("logo",boxlogo);
      }
      else
      {
        localStorage.setItem("logo",logo);
        localStorage.setItem("GameName","360");

      }
     

      console.log("ani", ani);
      if (ani === "" || ani === null) {
        navigate("/Otp");
      } else {
        Cookies.set("ani", ani);

        Checkuser(ani).then((response) => {
          console.log("Response", response.data);
          setData(response.data.Points);
          if (response.data.Points.userType === "OldUser") {
            console.log("Old User");
            if (
              response.data.sumScore == null ||
              response.data.sumScore === undefined
            ) {
              Cookies.set("score", 0);
            } else {
              Cookies.set("score", response.data.sumScore);
              console.log("respon", response.data);
              // console.log(Cookies.get("score"))\

              navigate("/home");
              setLoading(false);
            }
          } else {
            console.log("New User");
            Cookies.set("score", response.data.sumScore);
            Cookies.set("point", response.data.Points.points);
            setLoading(false);
            Swal.fire({
              text:
                "Congratulations...you got " + Cookies.get("point") + " points",

              icon: "success",
            });
            console.log(Cookies.get("point"));

            navigate("/home");
          }
        });
      }
    } catch {
      console.log("Exception");
    }
  }, []);

  return (
    <div className="Loader">
      {/* Conditionally render the loader based on the loading state */}
      {loading ? (
        <>
          <TailSpin type="TailSpin" color="#00BFFF" />
          {/* <div>
          
          <button onClick={toggleAudio}>
            {isPlaying ? 'Pause Audio' : 'Play Audio'}
          </button>
          
        </div> */}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Index;
