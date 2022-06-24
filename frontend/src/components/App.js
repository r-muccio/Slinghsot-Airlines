import React, {useState} from "react";
import styled from "styled-components";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import SeatSelect from "./SeatSelect";
import Confirmation from "./Confirmation";
import Reservations from "./Reservations";
import GlobalStyles from "./GlobalStyles";

const App = () => {

  const [currentReservation, setCurrentReservation] = useState("");

  function handleSetCurrentReservation(data) {
    setCurrentReservation(data);
  }

  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Main>
        <Switch>
          <Route exact path="/">
            <SeatSelect handleSetCurrentReservation={handleSetCurrentReservation} />
          </Route>
          <Route exact path="/confirmed">
            <Confirmation currentReservation={currentReservation} />
          </Route>
          <Route exact path="/view-reservation">
            <Reservations />
          </Route>
          <Route path="">404: Oops!</Route>
        </Switch>
        <Footer />
      </Main>
    </BrowserRouter>
  );
};

const Main = styled.div`
  background: var(--color-orange);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 110px);
`;

export default App;
