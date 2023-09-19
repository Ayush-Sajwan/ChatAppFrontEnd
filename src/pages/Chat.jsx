import React, { useState, useEffect ,useRef} from 'react';
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute,host } from "../utils/ApiRoutes";
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import {io} from 'socket.io-client';

function Chat() {
  const navigate = useNavigate();
  const socket=useRef();

  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  useEffect(() => {
    const getAllContacts = async () => {

      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      }
      else {
        const user = await JSON.parse(localStorage.getItem('chat-app-user'));
        setCurrentUser(user);

        const { data } = await axios.get(`${allUsersRoute}/${user._id}`);
        setContacts(data);
      }
    }
    getAllContacts();

  }, []);


  useEffect(()=>{

    if(currentUser){

      socket.current=io(host);
      socket.current.emit("add-user",currentUser._id);
    }
  },[currentUser])



  return (
    <Container>

      {currentUser &&
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} setCurrentChat={setCurrentChat} />

          {currentChat === undefined ?
            <Welcome currentUser={currentUser} /> :
            <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>
          }
        </div>
      }
      
    </Container>
  )
}

const Container = styled.div`

height:100vh;
width:100vw;
display:flex;
justify-content: center;
gap: 1rem;
align-items: center;
background-color: #131324;
.container{

  height: 85vh;
  width: 85vw;
  background-color: #00000076;
  display: grid;
  grid-template-columns: 25% 75%;

  @media screen and (min-width: 720px) and (max-width:1080px) {
    grid-template-columns: 35% 65%;
  }
}

`;
export default Chat;
