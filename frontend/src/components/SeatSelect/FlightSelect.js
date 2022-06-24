import React, { useState } from "react";
import styled from "styled-components";

const FlightSelect = (props) => {
  let {
    handleSetSelectedFlight, 
    flights, 
  } = props;

  let [formState, setFormState] = useState("placeholder");

  function handleChange(event) {
    console.log("event.target.value: ", event.target.value);
    setFormState(event.target.value);
    handleSetSelectedFlight(event.target.value);
  }

  return (
    <Wrapper>
      <Labelle htmlFor="flights">Flight Number:</Labelle>
      <FlightList value={formState} onChange={handleChange}>
      <option value="placeholder" disabled>Select a flight</option>
        {flights.map((el, index) => {
          let elValues = Object.values(el)
          return <option 
                    key={index} 
                    value={elValues[0]}
                    >{elValues[0]}</option>
        })}
      </FlightList>
    </Wrapper>
  );
};

export default FlightSelect;

const Wrapper = styled.div`
  background-color: var(--color-cadmium-red);
  padding: 1.5% 0;
  display: flex;
`

const Labelle = styled.label`
  padding-left: 2%;
`
const FlightList = styled.select`
  background-color: white;
`
