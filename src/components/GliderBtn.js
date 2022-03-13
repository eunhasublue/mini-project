import React from "react";
import styled from "styled-components";

const Glider = styled.span`
  position: absolute;
  top: 5px;
  left: 5px;
  height: 30px;
  width: 48.5%;
  background-color: #ed702d;
  border-radius: 100px;
  transition: 0.25s ease-out;
  transform: translate3D(${(props) => props.currentIndex * 100}%, 0, 0);
`;

const GliderNav = styled.div`
  display: flex;
  position: relative;
  background-color: white;
`;

const GliderContainer = styled.div`
  width: 350px;
  height: 40px;
  border-radius: 25px;
  overflow: hidden;
  margin: 24px 20px 0 20px;
  border: 1px solid gray;
`;

const GliderTab = styled.div`
  width: 50%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 15px;
  color: #b7b7b7;
  transition: color 0.15s ease-in;
  z-index: 1;
  &.active {
    color: white;
  }
`;

function GliderBtn({ tabsData, currentIndex, setCurrentIndex }) {
  return (
    <GliderContainer tabsLength="2">
      <GliderNav>
        {tabsData.map(({ title }, i) => (
          <GliderTab
            className={currentIndex === i ? "glider-tab active" : "glider-tab"}
            key={i}
            onClick={() => setCurrentIndex(i)}
          >
            {title}
          </GliderTab>
        ))}
        <Glider currentIndex={currentIndex} />
      </GliderNav>
    </GliderContainer>
  );
}

export default GliderBtn;
