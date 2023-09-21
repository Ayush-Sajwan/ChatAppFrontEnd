import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.avif";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from "../utils/ApiRoutes";

function Register() {
  
  const navigate=useNavigate();
  
  //state object to store the deatils entered by the user
  const [values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    confirmPassword:""
  });

    //options for the react toast
    const options={
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

  //this will handle the validation of information entered by user
  const handleValidation=()=>{

    const {username,password,confirmPassword}=values;
    if(password!==confirmPassword){
      toast("Password and Confirm Password should be same",options);
      return false;
    }
    else if(username.length<=3){
      toast("Username should have more than 3 characters",options);
      return false;
    }
    else if(password.length<=6){
      toast("Password length should be greater than 6 characters",options);
      return false;
    }

    return true;

  }

  //this function is responsible for updating the states
  const handleChange = (e) => {
    setValues({...values,[e.target.name]:e.target.value});
  };

    //this function handles the form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
      if(handleValidation()){
        const {username,email,password}=values;
        const {data}=await axios.post(registerRoute,{
          username,email,password
        })
       
        if(data.status===false){
          toast.error(data.msg,options);
        }
        else{

          localStorage.setItem("chat-app-user",JSON.stringify(data.user));
          navigate("/setAvatar");
        }
        
      }
    };


  return (
    <>
      <FormContainer>
        <form onSubmit={handleSubmit}>

          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>

          <input
            type="text"
            placeholder="UserName"
            name="username"
            onChange={handleChange}
            autoComplete="on"
          />

          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            autoComplete="on"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            autoComplete="on"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={handleChange}
            autoComplete="on"
          />

          <button type="submit">Create User</button>

          <span>
            Already have an account?
            <Link to="/login"> Login</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer/>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    img {
      height: 5rem;
      border-radius:50%;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
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

    span {
      color: white;
      text-transform: uppercase;
      a {
        text-decoration: none;
        color: #4e0eff;
        font-weight: bold;
        text-transform: uppercase;
      }
    }
    
  }
`;

export default Register;
