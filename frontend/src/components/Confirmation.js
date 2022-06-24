import React from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Confirmation = ({currentReservation}) => {
  console.log({currentReservation});


  return (
    <>
    <Wrapper>
      <Header>Your flight is confirmed!</Header>
      <InfoPar><b>Reservation #:</b> {currentReservation._id}</InfoPar>
      <InfoPar><b>Flight #:</b> {currentReservation.flight}</InfoPar>
      <InfoPar><b>Seat #:</b> {currentReservation.seat}</InfoPar>
      <InfoPar><b>Name:</b> {`${currentReservation.givenName} ${currentReservation.surname}`}</InfoPar>
      <InfoPar><b>Email:</b> {currentReservation.email}</InfoPar>
    </Wrapper>
    <TombStone src={tombstone}/>
    </>
  )
};


export default Confirmation;



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 40%;
    width: 40%;
    background-color: var(--color-orange);
    border: solid 3px var(--color-alabama-crimson);
    position: absolute; 
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) ;
`
const Header = styled.h4`
color: var(--color-alabama-crimson);
font-size: 1.5em;
margin: 20px;
padding-bottom: 10px;
border-bottom: 4px solid var(--color-alabama-crimson);
`
const InfoPar = styled.p`
font-size: 1em;
margin: 15px;
`
const TombStone = styled.img`
  position: absolute;
  left: 50%;
  top: 75%;
  transform: translate(-50%, -50%);
  width: 200px;
`
