import React from "react";
import styled from "styled-components";

const CustomerInfo = ({test, handleFormSubmit}) => {

    return (
        <>
            <Wrapper onSubmit={handleFormSubmit}>
                <TextArea 
                    type="text"
                    name="first-name" 
                    placeholder="First Name"
                    />
                <TextArea 
                    type="text"
                    name="last-name" 
                    placeholder="Last Name"
                    />
                <TextArea 
                    type="text"
                    name="email" 
                    placeholder="Email"
                    />
                <SubmitButton
                    type="submit" 
                    value="Confirm"           
                />
            </Wrapper>
        </>
    )
}

export default CustomerInfo

const Wrapper = styled.form`
    display: flex;
    flex-direction: column;
    height: 250px;
    width: 400px;
    background-color: var(--color-orange);
    border: solid 3px var(--color-alabama-crimson);
`
const TextArea = styled.input`
    width: 350px;
`
const SubmitButton = styled.input`
    
`