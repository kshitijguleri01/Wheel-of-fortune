// import React, { useState } from "react";
// import { Checkscore, Gameinfo } from "../api/hitapi";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";

// const SubCategory = (categoryName) => {
//   const [games, setGames] = useState([]);
//   // useEffect = () => {
//   //   try {
//   //     Gameinfo().then((response) => {
//   //       setGames(
//   //           games.filter((item) => {
//   //             return response.data.gameCategory === categoryName;
//   //           })
//   //         );
//   //     });

//   //   } 
//   //       catch {
//   //           console.log("Excption");
//   //         }
    
//   // };


//   const redirectToGame = (gameUrl, gameId) => {
//     const ani = Cookies.get("ani");

//     Checkscore(ani, gameId).then((response) => {
//       if (response.data.response === "Play") {
//         window.location.href = gameUrl + "?userId=" + ani + "&gameId=" + gameId;
//       } else {
//         Swal.fire({
//           text: "You Don't Have Sufficient Points",
//           icon: "error",
//         });
//       }
//     });
//   };
//   return <div> <div className="container pb-5">
//   <div className="streams-list">
//     <div className="row">
     
//       {games.map((item, index) => {
//         return (
//           <div
//             className="col-lg-4 col-6"
           
//           >
//             <button
//               onClick={() => redirectToGame(item.gameUrl, item.id)}
//               className="change-img-btn"
//             >
//               <div className="single-live-stream-item">
//                 <img src={item.imageUrl} alt="i" />

//                 <div className="content">
//                   <h3 style={{ color: "white" }}>{item.gameName}</h3>
//                 </div>
//                 <a href="#!" className="video-btn">
//                   <i className="flaticon-play-button" />
//                 </a>
//                 <span href="#" className="link-btn" />
//               </div>
//             </button>
//           </div>
//         );
//       })}
//     </div>
//   </div>
//   </div>
//   </div>;
// };

// export default SubCategory;
