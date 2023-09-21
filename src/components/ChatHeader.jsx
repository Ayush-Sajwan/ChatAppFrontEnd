import React from "react";
import styled from "styled-components";
import {FiLogOut} from 'react-icons/fi'
import {useNavigate} from 'react-router-dom';

export default function ChatHeader(props) {
  const navigate=useNavigate();

  const handleClick=()=>{

    localStorage.removeItem("chat-app-user");
    navigate('/login');
  }
  return (
    <Container>

      <div className="user-details">
        <div className="avatar">
          <img
            src={`data:image/svg+xml;base64,${props.currentChat.avatarImage}`}
            alt="avatar"
          />
        </div>
        <div className="username">
          <h3>{props.currentChat.username}</h3>
        </div>
      </div>

<div className="logout" onClick={handleClick}>
      <FiLogOut size={'1.5rem'}/>
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #0d0d30;
  justify-content: space-between;
  padding: 1.5rem 2rem 0.5rem 2rem;

  .user-details {
    display: flex;
    align-items: center;
    gap: 1rem;
    .avatar {
      img {
        height: 3rem;
      }
    }
    .username {
      h3 {
        color: white;
        text-transform: capitalize;
      }
    }
  }

.logout{
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    border-radius: 0.8rem;

    &:hover{
        background-color: white;
        color: blue;

    }
}

`;
