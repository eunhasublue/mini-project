import React from "react";
import styled from "styled-components";
import { ReactComponent as FormatList } from "../img/FormatList.svg";
import { ReactComponent as FormatCardList } from "../img/FormatCardList.svg";

const Mode = styled.div`
  width: 390px;
  display: flex;
  box-sizing: border-box;
  padding-top: 24px;
`;

const Select = styled.select`
  border-radius: 15px;
  padding: 0 5px;
  border: 0.5px solid #dfdfdf;
  box-sizing: border-box;
  margin-left: 15px;
`;

const ModeBar = () => {
  return (
    <Mode>
      <Select>
        <option>Results</option>
      </Select>
      <Select style={{ marginLeft: "8px" }}>
        <option>Time</option>
      </Select>
      <div>
        <FormatList style={{ margin: "0 6px 0 160px" }} />
        <FormatCardList />
      </div>
    </Mode>
  );
};

export default ModeBar;
