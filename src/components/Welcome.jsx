import React from 'react';
import styled from 'styled-components';
import Robot from '../assets/robot.gif';

export default function Welcome(props) {
  return (
    <Container>
    <img src={Robot} alt="rRobotGif" />
    <h1>Welcome <span>  {props.currentUser.username} </span></h1>
    <h3>Please Select a chat to start messaging</h3>

    </Container>
  )
};

const Container=styled.div`
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
color: white;
 img{
  height: 20rem;
 }
 h1{
  span{
    color: #4e00ff;
  }
 }

`;
