import React,{useState,useEffect,useRef} from "react";
import styled from "styled-components";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { storeMessageRoute,getMessagesRoute } from "../utils/ApiRoutes";
import axios from "axios";
import ChatHeader from "./ChatHeader";


export default function ChatContainer(props) {
  const { currentChat, currentUser,socket } = props;
  const [messages,setMessages]=useState([]);
  const scroll=useRef(null);

  //this will get all the messages of particular currentChat
  useEffect(()=>{

    const getMessages=async ()=>{

        const {data}=await axios.post(getMessagesRoute,{
            sender:currentUser._id,
            receiver:currentChat._id
        });

        setMessages(data.messages);
    };

    getMessages();
  },[currentUser,currentChat]);


  //this use effect will setup the socket to listen for the messages
  useEffect(()=>{
    socket.current.on("receive-msg",(msg)=>{
      setMessages((prev)=>[...prev,{sender:currentChat._id,body:msg}]);
    });
  },[currentChat,socket])

  //this use effect is responsible for scrolling whenever there is change in messages
  useEffect(()=>{
    scroll.current?.lastElementChild?.scrollIntoView({behavior:'smooth'});
  },[messages])


  //this will be handle the storage of msg to the backend
  //as well as sockets
  const sendMessage = async (msg) => {
    
    //stroing the message in the database
    const {data}=await axios.post(storeMessageRoute,
        {
            sender:currentUser._id,
            receiver:currentChat._id,
            body:msg
        });
    if(!data.status){
        alert("Could not save data");
    }
    else{
      //sending messages through the socket
      socket.current.emit("send-msg",{to:currentChat._id,msg:msg});

      //pushing the message into the messages
      setMessages((prev)=>[...prev,{sender:currentUser._id,body:msg}]);
    }
  };




  return (
    <>
      <Container>

        <div className="header">
          <ChatHeader currentChat={currentChat}/>
        </div>

        <div className="chat-messages" >
          <Messages messages={messages} scroll={scroll} currentUser={currentUser}/>
        </div>

        <div className="chat-input">
          <ChatInput sendMessage={sendMessage}  />
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 15% 70% 15%;
  overflow: hidden;


  .chat-messages{
    overflow:auto;

    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width: 0%.1rem;
            border-radius: 0.5rem;
        }
    }
  }
`;
