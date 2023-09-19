import React,{useState} from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import {IoMdSend} from 'react-icons/io'
import {BsEmojiSmileFill} from 'react-icons/bs';

export default function ChatInput(props) {

  const [pickerVisible,setPickerVisible]=useState(false);
  const [msg,setMsg]=useState("");

  const pickerVisibiltyHandler=()=>{
    setPickerVisible(!pickerVisible);
  }

  const handleInputChange=(e)=>{
    setMsg(e.target.value);
  }

  //this will handle the emoji click
  //the picker adds an emoji obejct with emoji details to the function
  const handleEmojiClick=(emojiObj)=>{

    //prevState returns the state previous state
    //it is necesssary to use when we set state multiple times in a row
    //prev can be used with any state
    setMsg((prevMsg)=> prevMsg + emojiObj.emoji)
  }


  //this will handle the message submission
  const handleSubmit=(e)=>{
    e.preventDefault();
    setPickerVisible(false);
    props.sendMessage(msg);
    setMsg('');
  }

  return (
    <>
    <Container>

        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={pickerVisibiltyHandler}/>
                {pickerVisible && <Picker  onEmojiClick={handleEmojiClick}/>}
            </div>
        </div>

        <form className='input-container' onSubmit={handleSubmit}>
            <input type="text" placeholder='type your message' value={msg} onChange={handleInputChange} />
            <button type="submit">
            <IoMdSend size={"2rem"} color={"white"}/>
            </button>
        </form>
    </Container>

    </>
  )
};

const Container=styled.div`

display: grid;
grid-template-columns: 5% 95%;
align-items: center;
height: 100%;
background-color: #080420;
padding: 0 2rem;


.button-container{
  display: flex;
  align-items: center;
  color: white;
  gap: 1rem;

  .emoji{

    position: relative;
    svg{
      font-size:1.5rem;
      color: #ffff00c8;
      cursor: pointer;
    }
    svg:hover{
      color: white;
    }

    .EmojiPickerReact{
      position: absolute;
      width: 800px;
      top: -500px;
    }
  }
}

.input-container{
  width: 100%;
  height: 60%;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  background-color: #ffffff34;
  input{
    width: 90%;
    color: white;
    background-color: transparent;
    border: none;
    padding-left: 1rem;
    font-size: 1.2rem;

    &::selection{
      background-color: #9186f3;
    }
    &:focus{
      outline: none;
    }
  }
  button{
    padding: 0.3rem 2rem;
    border-radius: 2rem;
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #9a86f3;
  }
}
`;