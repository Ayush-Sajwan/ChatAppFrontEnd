import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { setAvatarRoute } from "../utils/ApiRoutes";
import {toastOptions} from '../utils/toastOptions';


function SetAvatar() {

    const api="https://api.multiavatar.com";

    const [avatars,setAvatars]=useState([]);
    const [loading,setLoading]=useState(true);
    const [selectedImage,setSelectedImage]=useState(undefined);

    const navigate=useNavigate();

    useEffect(()=>{

        async function  fetchData(){
            const data=[];

            for(let i=0;i<4;i++){
    
                const image=await axios.get(`${api}/${Math.round(Math.random()*10000)}?apikey=xcWHzDBt7iOqgP`);
                //btoa is a window function that converts a string to base64
                //here the image data contains the stringified version of svg so we can directly convert it
                //other wise we firstly would have serialized it into a string
                data.push(btoa(image.data));
            }
    
            setAvatars(data);
            setLoading(false);
        }
        fetchData();

        return ()=>{};
    },[])




    const handleClick=async ()=>{
        
        if(selectedImage===undefined){
            toast("Please select an avatar",toastOptions);
        }
        else{

            const user=JSON.parse(localStorage.getItem('chat-app-user'));

            //note that we are using the destructuring in response of axios
            //as axios returns an obejct in which the data attribute contains 
            //the data returned by the server
            //so changing name to something else might cause an error
            const {data}=await axios.post(`${setAvatarRoute}/${user._id}`,{
                image:avatars[selectedImage]
            })

            if(data.isSet){

                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                toast("Image updated successfully",toastOptions);
                toast('Redirecting to the home page',toastOptions);

                setTimeout(()=>{
                    navigate("/");
                },3500);
            }
            else{
                toast(data.msg,toastOptions);
            }
        }


    }
    

  
  return (
    <>

    {loading?<Container><img className="loader" src={loader} alt="loader" /></Container>:
    <Container>

    <div className="title">
        <h1>Please select your Avatar</h1>
    </div>

    <div className="avatarsContainer">

        {avatars.map((avatarImage,index)=>{

            return(

                <div key={index} className={`avatar ${selectedImage===index ?'selected':''}`}>
                    <img 
                    src={`data:image/svg+xml;base64,${avatarImage}`} 
                    alt="avatar"
                    onClick={()=> setSelectedImage(index)}
                     />
                </div>
            )

        })}

    </div>

    <button className="btn" onClick={handleClick}>Set as Profile Picture</button>


    </Container>
    }

    <ToastContainer/>
    
    </>
  )
}

const Container=styled.div`
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap: 3rem;
background-color:#131324;
height:100vh;
width:100vw;

.loader{
    max-inline-size:100%;
    border-radius:50%;
}

.title{
    h1{
        color:white;
    }
}
.avatarsContainer{
    display:flex;
    gap:2rem;

    .avatar{

        border:0.4rem solid transparent;
        padding:0.5rem;
        display:flex;
        align-items:center;
        justify-content:center;
        transition:0.2s ease-in-out;

        img{
            height:6rem;
        }
    }
    .selected{
        border:0.4rem solid #4e0eff;
        border-radius:50%;
    }
}

.btn{
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #4e0eff;
      }
    }
`;


export default SetAvatar;
