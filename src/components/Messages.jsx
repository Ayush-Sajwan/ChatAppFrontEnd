import React from 'react';
import styled from 'styled-components';

export default function Messages(props) {
  const {currentUser,messages,scroll}=props;
  return (
    <>
   <Container ref={scroll}>
    

    {messages.map((msg,index)=>{
      return(

        <div className={`message ${msg.sender===currentUser._id?'sended':'received'}`} key={index}>
      <div className="content">
        <p>{msg.body}</p>
      </div>
    </div>

      );
    })}

   </Container>
   </>
  )
};

const Container=styled.div`

display: flex;
flex-direction: column;
gap: 1rem;
padding: 1rem;

.message{
  display: flex;
  align-items: center;

  .content{
    max-width: 40%;
    overflow-wrap: break-word;
    font-size: 1.1rem;
    padding: 1rem;
    border-radius: 1rem;
    color: #d1d1d1;
    background-color: #4f04ff21;

  }
}

.sended{
  justify-content: flex-end;
}
.received{
  justify-content: flex-start;
}
`;
