import React from "react";
import HomeBanner from "../img/HomeBanner.png";
import styled from "styled-components";
import Vector from "../img/Vector.png";

const Wrapper = styled.div`
  width: 390px;
  height: 100vh;
  background: white;
`;

const FontDiv = styled.div`
  background: white;
  padding: 40px 0 10px 20px;
  display: flex;
  align-items: center;
`;

const FontSpan = styled.div`
  font-weight: bold;
  font-size: 24px;
  letter-spacing: -0.0025em;
  text-transform: capitalize;
  color: #202020;
  margin-right: 8px;
`;

const HomeWrpper = styled.div`
  width: 350px;
  height: 490px;
  background: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 16px 14px 14px 0;
  margin: 20px 20px 16px 20px;
  box-sizing: border-box;
`;

const Number = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.0025em;
  color: #ed702d;
  padding: 0 24px 0 14px;
`;

const Post = styled.div`
  display: flex;
`;

const HomeTitle = styled.div`
  padding-bottom: 14px;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.001em;
  color: #202020;
`;

const HomeSpan = styled.span`
  font-weight: normal;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.001em;
  color: #727272;
  margin-left: 8px;
`;

const ImageVector = styled.img`
  color: #202020;
  width: 7px;
  height: 12px;
`;

const Home = () => {
  return (
    <>
      <img src={HomeBanner} alt="home_banner" />
      <Wrapper>
        <FontDiv>
          <FontSpan>Today's Top </FontSpan>
          <ImageVector src={Vector} alt="vector" />
        </FontDiv>
        <HomeWrpper>
          <ul style={{ paddingInlineStart: "0" }}>
            <li style={{ listStyle: "none", paddingBottom: "20px" }}>
              <Post>
                <Number>1</Number>
                <div>
                  <HomeTitle>
                    I bulit a system that takes picture of...
                  </HomeTitle>
                  <div>
                    <HomeSpan>Kristin Watson</HomeSpan>
                    <HomeSpan>100 points</HomeSpan>
                    <HomeSpan>2 minutes ago</HomeSpan>
                  </div>
                </div>
              </Post>
            </li>
          </ul>
        </HomeWrpper>
      </Wrapper>
    </>
  );
};

export default Home;
