import React, { useState } from "react";
import imageLog from "../images/subscribe-bg.jpg";
import Lottie from "react-lottie";
import lottieBall from "../images/Animation - 1713865735149.json";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HeFlow = () => {
  const [selectedPack, setSelectedPack] = useState(""); // State to track selected pack
  const [msisdnNumber, setMsisdnNumber] = useState("");
  const [isloading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [q] = useSearchParams();
  const navigate = useNavigate();
  console.log(q.get("msisdn"), "msisdn")
  const handlePackChange = (event) => {
    setSelectedPack(event.target.value);
  };

  const handleSubscribe = async () => {
    if (!selectedPack) {
      toast.error("Please select a pack (Daily or Weekly).");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "/api/sub-user",
        {
          pack_type: selectedPack,
          msisdn: q.get("msisdn"),
          ext_ref: q.get("ext_ref"),
          m_act: "web",
          language: "en",
        }
      );
      console.log(response.data)
      setLoading(false);
      if (response.data.result === 1) {
        setModal(true);
        setTimeout(() => {
          navigate("/home");
        }, 4000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Network Error");
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bg-red-400 min-h-screen flex items-center justify-center">
        <img
          className="absolute h-full object-cover w-full blur-none "
          src={imageLog}
          alt="Background"
        />
        <div className="bg-gray-100   lg:w-5/12 md:w-6/12 w-10/12 shadow-3xl rounded-xl relative drop-shadow-2xl">
          <div className="p-2">
            <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-8 md:p-8  transition duration-500 hover:scale-110">
              <Lottie
                options={{
                  animationData: lottieBall,
                }}
                style={{ width: "70%", height: "auto" }}
              />
            </div>
            {!modal ? (
              <form className="py-8 md:p-24">
                <div className="text-4xl font-bold text-center py-2">
                  Wheel of Fortune
                </div>
                <div className="text-xl font-bold text-center">
                  {/* Pack selection */}
                  <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer justify-center items-center text-center">
                    <input
                      type="radio"
                      value="Daily"
                      name="Country"
                      checked={selectedPack === "Daily"}
                      onChange={handlePackChange}
                    />
                    <div className="ml-4 text-lg">Daily pack @2 leones</div>
                  </label>
                  <label className="flex bg-gray-100 text-gray-700 rounded-md px-3 py-2 my-3 hover:bg-indigo-300 cursor-pointer  justify-center items-center text-center ">
                    <input
                      type="radio"
                      value="Weekly"
                      name="Country"
                      checked={selectedPack === "Weekly"}
                      onChange={handlePackChange}
                    />
                    <div className="ml-4 text-lg">Weekly pack @11 leones</div>
                  </label>
                </div>
                <button
                  disabled={!selectedPack || isloading}
                  onClick={handleSubscribe}
                  className={`bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full rounded text-lg ${
                    isloading ? "bg-red-500" : ""
                  }`}
                >
                  {isloading ? (
                    <span className=" text-red-600 ">Loading...</span>
                  ) : (
                    "Subscribe"
                  )}
                </button>
              </form>
            ) : (
              <div className="py-5 md:p-24">
                <h1 className="text-lg mt-11">
                  Dear customer, you have successfully subscribed to Wheel of
                  Fortune. You will be redirected to content.
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeFlow;
