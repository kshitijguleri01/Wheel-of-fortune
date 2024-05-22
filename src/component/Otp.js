import React, { useEffect, useState } from "react";
import imageLog from "../images/subscribe-bg.jpg";
import Cookies from "js-cookie";
import Lottie from "react-lottie";
import lottieBall from "../images/Animation - 1713865735149.json";
import { FcPhoneAndroid } from "react-icons/fc";
import axios from "axios";
import { Navigate, useSearchParams } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Otp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [otp, setOtp] = useState(false);
  const [otpText, setOtpText] = useState("");
  const [selectedPack, setSelectedPack] = useState('Daily');
  const [msisdnNumber, setMsisdnNumber] = useState("");
  const [isloading, setLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const [q] = useSearchParams();
  const navigate = useNavigate()
  const InputStyle = {
    width: '40px', // Adjust width as needed
    height: '40px', // Adjust height as needed
    fontSize: '20px', // Adjust font size as needed
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: '5px',
    marginRight: '5px', // Adjust margin between inputs as needed,
    fontWeight: "700",
    color: "#05C3DD",
    
  };
  const handleInputChange = (e) => {
    setMsisdnNumber(e.target.value);
  };

  const handlePackChange = (event) => {
    setSelectedPack(event.target.value); // Update selected pack when radio button changes
  };
  const getotp = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await axios.post("https://osl.wheel2fortune.com/api/otp", {
        msisdn: msisdnNumber,
        ext_ref: q.get("ext_ref"),
      });
      setLoading(false)
      console.log(await response.data, "========")
      if(response.data.result === 2) {
        return navigate("/home");
      }
      if (response.data.result === 1) {
        const location = response.data.location;
        localStorage.setItem("location", location);
        setOtp(true);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  const confirmOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const response = await axios.post("https://osl.wheel2fortune.com/api/otp/confirm", {
        msisdn: msisdnNumber,
        otp: otpText,
        ext_ref: q.get("ext_ref"),
        location: localStorage.getItem("location"),
        pack_type: selectedPack
      });
      setLoading(false)
      console.log(response.data, "==----00-0")
      if(response.data.result === 2) {
        return navigate("/home");
      }
      if (response.data.result === 1) {
        toast.success(response.data.msg);
        setModal(true)
        setTimeout(() => {
          navigate("/home")
        }, 4000)
      } else {
        setErrorMessage("Invalid OTP or OTP Expired")
      }
    } catch (error) {
      toast.error("Network Error");
    }
  };

  return (  
    <>
      <ToastContainer />
      <div className=" min-h-screen flex items-center justify-center">
        <img className="absolute h-full object-cover w-full " src={imageLog} alt="Background" />
        <div className="bg-gray-100 lg:w-5/12 md:w-6/12 w-10/12 shadow-3xl rounded-xl relative drop-shadow-2xl mt-3">
          <div className="p-2">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-8 md:p-8">
              <Lottie
                options={{
                  animationData: lottieBall,
                }}
                style={{ width: "70%", height: "auto" }}
              />
            </div>
            {!modal ? (
              <form className="py-5 px-2 md:p-24">
              <div className="text-3xl font-bold text-center py-2 mt-2">Wheel of Fortune</div>
              <div className="text-xl font-bold text-center py-4">
                {otp ? "Enter Received OTP" : "Enter Mobile Number Below"}
              </div>
              <div className="flex items-center text-lg mb-6 md:mb-8">

                {otp ? (
                  <div className="text-center justify-center flex items-center ml-14 sm:ml-36">
                    <OtpInput
                      value={otpText}
                      onChange={setOtpText}
                      numInputs={4}
                      separator={<span>-</span>}
                      inputStyle={InputStyle}
                      containerStyle={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                       marginLeft:"14px"
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                ) : (
                  <>
                    <div className="absolute ml-3">
                      <FcPhoneAndroid size={30} />
                    </div>
                    <input
                      type="number"
                      id="number"
                      onChange={handleInputChange}
                      value={msisdnNumber}
                      className="bg-gray-200 rounded pl-12 py-2 md:py-4 focus:outline-none w-full"
                      placeholder="Enter Mobile Number"
                    />
                  </>
                )}
              </div>
              {!otp && (
                <>
                  <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                    <input
                      type="radio"
                      value="Daily"
                      name="Country"
                      checked={selectedPack === 'Daily'}
                      onChange={handlePackChange}
                    />
                    <div className="ml-4 text-lg">Daily pack @2 leones</div>
                  </label>
                  <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer">
                    <input
                      type="radio"
                      value="Weekly"
                      name="Country"
                      checked={selectedPack === 'Weekly'}
                      onChange={handlePackChange}
                    />
                    <div className="ml-4 text-lg">Weekly pack @11 leones</div>
                  </label>
                </>
              )}
              <button
                disabled={isloading ? true : false}
                onClick={otp ? confirmOtp : getotp}
                className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded text-lg"
              >
                {isloading ? "loading" : "Subscribe"}
              </button>
              {errorMessage && (
                <div className="text-red-500 text-center mt-4">{errorMessage}</div>
              )}
            </form>
            ) : (
              <div className="py-5 md:p-24 mt-10">
              <h1  className="text-lg">Dear customer you have successfully subscribed to Wheel of Fortune, you will be redirected to content</h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Otp;
