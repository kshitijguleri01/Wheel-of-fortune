import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from '../component/Homepage';
import Profile from '../component/Profile';
import Score from '../component/Score';
import Leaderboard from '../component/Leaderboard';
import Points from '../component/Points';
import Redeem from '../component/Redeem';
import Index from '../component/Index';
import Otp from '../component/Otp';
import Allcategory from '../component/Allcategory';
import AllGame from '../component/AllGame';
import SubCategory from '../component/SubCategory';
import Test from '../component/Test';
import PackSub from '../component/HeFlow';
import HeFlow from '../component/HeFlow';



const Routingfile = () => {

  useEffect(()=>{
    window.scroll({ top: 0,
      left: 0,
      behavior: "smooth",
    });
  })
  return (
        <>
         <Router>
                <Routes>
                <Route path= "/" element={<Index />} exact={true}/>
                <Route path= "/home" element={<Homepage />} exact={true}/>
                <Route path="sub" component={<SubCategory />} exact={true} />
                <Route path= "/Profile" element={<Profile />} exact={true}/>
                <Route path= "/Score" element={<Score />} exact={true}/>
                <Route path= "/Leader" element={<Leaderboard />} exact={true}/>
                <Route path= "/Points" element={<Points />} exact={true}/>
                <Route path= "/Radeem" element={<Redeem />} exact={true}/>
                <Route path= "/Otp" element={<Otp />} exact={true}/>
                <Route path= "/he" element={<HeFlow />} exact={true}/>
                <Route path="/Allcategory" element={<Allcategory />} exact={true}/>
                <Route path="/Allimages" element={<AllGame />} exact={true}/>
                <Route path="/test" element={<Test />} exact={true}/>
               
                </Routes>
        </Router>
        </>

    )
}

export default Routingfile