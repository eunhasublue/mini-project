import React from "react";
import styled from "styled-components";

const ListCardBackground = styled.div`
  background-color: white;
  width: 390px;
  background: ${(props) => (props.background ? "#fff" : "#EFEFEF")};
`;

const ListCard = (props) => {
  return (
    <ListCardBackground background={props.background}>
      {props.children}
    </ListCardBackground>
  );
};

export default ListCard;
