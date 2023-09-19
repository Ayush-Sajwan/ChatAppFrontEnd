import React, { useState } from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.avif';

export default function Contacts(props) {

    const { contacts, currentUser,setCurrentChat } = props;

    const [selectedChat, setSelectedChat] = useState();

    const handleClick=(index,contact)=>{
        setCurrentChat(contact);
        setSelectedChat(index);
    }
    return (
        <>
            <Container>
                <div className="brand">
                    <img src={Logo} alt="Logo" />
                    <h3>Snappy</h3>
                </div>
                <div className="contacts">
                    {
                        contacts.map((contact, index) => {

                            return (

                                <div className={`contact ${selectedChat === index ? "selected" : ""}`} 
                                key={index}
                                onClick={()=>{handleClick(index,contact)}}
                                >

                                    <div className="avatar">
                                        <img src={`data:image/svg+xml;base64,${contact.avatarImage}`} alt="avatar" />
                                    </div>
                                    <div className="username">
                                        <h3>{contact.username}</h3>
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>

                <div className="current-user">
                    <div className="avatar">
                        <img src={`data:image/svg+xml;base64,${currentUser.avatarImage}`} alt="avatar" />
                    </div>
                    <div className="username">
                        <h2>{currentUser.username}</h2>
                    </div>
                </div>

            </Container>

        </>
    )
};

const Container = styled.div`
display: grid;
grid-template-rows: 10% 75% 15% ;
overflow: hidden;
background-color: #080420;

.brand{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    img{
        height: 3rem;
        border-radius: 50%;
    }
    h3{
        color: white;
        text-transform: uppercase;
    }
}

.contacts{
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: auto;
    padding: 0.5rem;
    gap:0.8rem;
    &::-webkit-scrollbar{
        width: 0.2rem;
        &-thumb{
            background-color:#ffffff39;
            width: 0%.1rem;
            border-radius: 0.5rem;
        }
    }

    .contact{

        display: flex;
        align-items: center;
        background-color: #ffffff39;
        min-height: 5rem;
        width: 90%;
        border-radius: 0.2rem;
        padding: 0.4rem;
        cursor: pointer;
        gap: 1rem;
        transition: 0.5s ease-in-out;
       

        .avatar{
            img{
                height: 3rem;
            }
        }

        .username{
            h3{
                color: white;
                text-transform: capitalize;
            }
        }
    }
    .selected{
        background-color: #9186f3;
    }
}

.current-user{
    background-color: #0d0d30;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    .avatar{
            img{
                height: 3rem;
                max-inline-size: 100%;
            }
        }

        .username{
            h2{
                color: white;
            }
        }
}
`;
