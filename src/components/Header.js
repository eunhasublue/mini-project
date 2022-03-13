import React from "react";
import styled from "styled-components";
import { ReactComponent as Time } from "../img/Time.svg";
import { ReactComponent as Battery } from "../img/Battery.svg";
import { ReactComponent as CellularConnection } from "../img/CellularConnection.svg";
import { ReactComponent as Wifi } from "../img/Wifi.svg";
import { ReactComponent as Logo } from "../img/Logo.svg";
import { ReactComponent as ContactSupport } from "../img/ContactSupport.svg";
import { ReactComponent as Brightness } from "../img/Brightness_4.svg";

const Wrapper = styled.div`
  width: 390px;
  height: 87px;
  background: #ed702d;
`;

const HeaderStatusBar = styled.div`
  padding: 14px 15px 0 21px;
  display: flex;
  justify-content: space-between;
`;

const TitleBar = styled.div`
  display: flex;
  padding: 8px 0 0 20px;
`;

const TitleName = styled.div`
  color: white;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
`;

const Header = () => {
  return (
    <Wrapper>
      <HeaderStatusBar>
        <Time />
        <div>
          <CellularConnection />
          <Wifi style={{ margin: "0 1px 0 2px" }} />
          <Battery />
        </div>
      </HeaderStatusBar>

      <TitleBar>
        <Logo />
        <TitleName>Svelte Hacker News</TitleName>
        <div>
          <Brightness style={{ margin: "0 10px 0 75px" }} />
          <ContactSupport />
        </div>
      </TitleBar>
    </Wrapper>
  );
};

export default Header;
