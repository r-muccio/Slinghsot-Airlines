import React, {useState} from "react";
import styled from "styled-components";

import tombstone from "../assets/tombstone.png";

const Reservations = () => {
    
    const [reservationFound, setReservationFound] = useState(false);
    const [targetReservation, setTargetReservation] = useState("");

    const handleIdSubmit = async (event) => {
        event.preventDefault();

        let data = {id : event.target["reservation-id"].value};

        console.log({data});

        const settings = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        try{
            const response = await fetch(`/reservations/${data.id}`, settings);
            console.log({response});
            const parsedRes = await response.json();
            console.log({parsedRes});
            if (parsedRes.data._id && parsedRes.data.seat){
                setTargetReservation(parsedRes.data);
                setReservationFound(true);
            }
            }
            catch(err){
                console.log(err);
                setReservationFound(false);
                alert("Reservation ID not found. Please try again.");
            }
    }


    return (
        <>
        {!reservationFound && <Wrapper>
            <Header>Find Reservation By ID</Header>
            <Form onSubmit={handleIdSubmit}>
                <TextArea 
                    type="text"
                    name="reservation-id" 
                    placeholder="Enter reservation ID here"
                    />
                <SubmitButton
                    type="submit" 
                    value="Find Reservation"           
                />
            </Form>
        </Wrapper>}

        {reservationFound && targetReservation.seat &&
        <Wrapper2>
            <Header>Your Reservation Details:</Header>
            <InfoPar><b>Reservation #:</b> {targetReservation._id}</InfoPar>
            <InfoPar><b>Flight #:</b> {targetReservation.flight}</InfoPar>
            <InfoPar><b>Seat #:</b> {targetReservation.seat}</InfoPar>
            <InfoPar><b>Name:</b> {`${targetReservation.givenName} ${targetReservation.surname}`}</InfoPar>
            <InfoPar><b>Email:</b> {targetReservation.email}</InfoPar>
        </Wrapper2>
        }
        <TombStone src={tombstone}/>
        </>
    )
};


export default Reservations;



const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40%;
    width: 40%;
    background-color: var(--color-orange);
    border: solid 3px var(--color-alabama-crimson);
    position: absolute; 
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%) ;
`
const Wrapper2 = styled.div`
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
const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 400px;
    background-color: var(--color-orange);
`
const TextArea = styled.input`
    width: 350px;
    margin-bottom: 25px;
`
const SubmitButton = styled.input`
    background-color: var(--color-selective-yellow);
    border-radius: 5px;
    width: 300px;
`
const TombStone = styled.img`
    position: absolute;
    left: 50%;
    top: 75%;
    transform: translate(-50%, -50%);
    width: 200px;
`