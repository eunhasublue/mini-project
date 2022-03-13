import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavigationTitle = styled.div`
  width: 390px;
  height: 40px;
  background: white;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 10px 20px;
`;

const Title = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 15px;
  line-height: 18px;
  text-align: center;
  color: #727272;
`;

const LinkStyle = styled(Link)`
  color: #727272;
  text-decoration: none;
`;

const NavigationBar = () => {
  return (
    <NavigationTitle>
      <Title>
        <LinkStyle to="/">Home</LinkStyle>
      </Title>
      <Title>
        <LinkStyle to="/top">Top</LinkStyle>
      </Title>
      <Title>
        <LinkStyle to="/news">New</LinkStyle>
      </Title>
      <Title>
        <LinkStyle to="/show">Show</LinkStyle>
      </Title>
      <Title>
        <LinkStyle to="/ask">Ask</LinkStyle>
      </Title>
      <Title>
        <LinkStyle to="/job">Job</LinkStyle>
      </Title>
    </NavigationTitle>
  );
};

export default NavigationBar;
