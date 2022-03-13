import React from "react";
import styled from "styled-components";
import Timer from "../img/Timer.png";
import ArrowTop from "../img/ArrowTop.png";
import { ReactComponent as IconUser } from "../img/IconUser.svg";

const AuthTimeArrowSort = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const FontSpan = styled.span`
  font-weight: 600;
  font-size: 14px;
  color: #3f3f3f;
`;

const TimerFont = styled.span`
  font-size: 14px;
  color: #b7b7b7;
`;

const UserIconImg = styled(IconUser)`
  margin-right: 3px;
  width: ${(props) => (props.postImgSize ? "40px" : "20px")};
  height: ${(props) => (props.postImgSize ? "40px" : "20px")};
`;

const AuthTimerArrow = (props) => {
  return (
    <AuthTimeArrowSort>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginRight: "10px",
          }}
        >
          <UserIconImg postImgSize={props.postImgSize} />
          <FontSpan>{props.commentAuth}</FontSpan>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={Timer} alt="timer" style={{ marginRight: "3px" }} />
          </div>
          <TimerFont>2 hours ago</TimerFont>
        </div>
      </div>

      <div>
        <img src={ArrowTop} alt="arrow_top" />
      </div>
    </AuthTimeArrowSort>
  );
};

export default AuthTimerArrow;
