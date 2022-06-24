import React, { useState, useEffect } from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

import Plane from "./Plane";
import FlightSelect from "./FlightSelect";
import CustomerInfo from "./CustomerInfo";

const SeatSelect = ({handleSetCurrentReservation}) => {
    const [flights, setFlights] = useState('');
    const [flightName, setFlightName] = useState('');
    const [selectedFlight, setSelectedFlight] = useState('');
    const [seating, setSeating] = useState([]);
    const [selectedSeat, setSelectedSeat] = useState('');

    const history = useHistory();

    const [test, setTest] = useState(true);

    async function getFlightList() {
        try{
        const response = await fetch('/flights');
        const data = await response.json();
        console.log(data);
        let flightArray = data.data;
        let flightList = flightArray.map((el) => {
            delete el._id;
            return el
        })
        console.log(flightList);
        setFlights(flightList);
        }
        catch(err){
            console.log(err);
        }
    }

    async function handleSetSelectedFlight(val){
        setFlightName(val);

        try{
            const res = await fetch(`/flights/${val}`);
            const parsedRes = await res.json();
            console.log({parsedRes});
            setSelectedFlight(parsedRes.data);
        }
        catch(err){
            console.log(err)
        }
    }

    async function handleFormSubmit(event){
        event.preventDefault();
        
        let data = {
            flight: flightName,
            seat: selectedSeat,
            givenName: event.target["first-name"].value,
            surname: event.target["last-name"].value,
            email: event.target["email"].value, 
        }
        console.log({data});

        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }

        if (data.seat.length > 1){
        try{
            const response = await fetch('/reservations', settings);
            const innerData = await response.json();
            handleSetCurrentReservation(innerData.data);
            history.push("/confirmed");
            }
            catch(err){
                console.log(err);
            }
        }
    }

    useEffect(() => {
        getFlightList();
    }, []);

    useEffect(() => {
        setSeating(selectedFlight);
    }, [selectedFlight]);

    return (
        <Wrapper>
            {flights &&
            <FlightSelect 
                flights={flights}
                handleSetSelectedFlight={handleSetSelectedFlight}
                selectedFlight={selectedFlight}
                />}
            <h2>Select your seat and Provide your information!</h2>
            <Container>
                <Plane 
                    test={test}
                    seating={seating}
                    selectedSeat={selectedSeat}
                    setSelectedSeat={setSelectedSeat}
                    />
                <CustomerInfo
                    handleFormSubmit={handleFormSubmit}
                    setTest={setTest}
                    test={test}
                    />
            </Container>
        </Wrapper>
    );
}

export default SeatSelect;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;    
`
const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center ;

`
