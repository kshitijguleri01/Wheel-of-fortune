import React from "react";
import axios from "axios";


const baseApi = 'https://game360.bigcash.co.za/';
// const baseApi='https://game360.bigcash.co.za/';
// const baseApi='http://localhost:3832/';
// const gameInfoApi = 'http://5.189.166.187:9981/Game360/'

 const Checkuser=async(ani)=>

{
   const parameter = {ani:ani};
   console.log("paramete",parameter);
    return  await axios.post(baseApi +"check?ani=",parameter);
}

const Gameinfo=async()=>
{

    return await axios.get(baseApi+"gameInfo");

}

const Checkscore=async(ani,gameId)=>{

    const param = {ani:ani,gameId:gameId};
    return await axios.post(baseApi+"checkPoint",param);

}

const Leader=async()=>{
    
    return await axios.get(baseApi+"leader");

}


const GifApi=async()=>{
    
    return await axios.get(baseApi+"gif");

}


const CheckScoreForScorePage=async(ani)=>

{
   const parameter = {ani:ani};
   console.log("paramete",parameter);
    return await axios.post(baseApi +"score",parameter);
}

const RedeemApi=async(ani)=>
{
    const parameter = {ani:ani};
   console.log("paramete",parameter);
    return await axios.post(baseApi +"redeem",parameter);
}

const EditName=async(ani,name,imageName)=>{
    const parameter = {ani:ani,name:name,image:imageName}
    return await axios.post(baseApi+"editName",parameter);
}

export  {Checkuser,Gameinfo,Checkscore,Leader,GifApi,CheckScoreForScorePage,RedeemApi,EditName};




// export const Checkuser = (ani) => {
//   
//     const parameter = {ani:ani};
//        console.log("paramete",parameter);
//         return  axios.post(baseApi +"check?ani=",parameter);
  
// }
