import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 390px;
  height: 100vh;
  background-color: #efefef;
  padding: 29px 20px 0 20px;
  box-sizing: border-box;
`;

const Card = styled.div`
  width: 350px;
  height: 332px;
  background-color: #fff;
  border: 0.7px solid #dfdfdf;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.05), 0px 6px 10px rgba(0, 0, 0, 0.05);
  padding: 24px 16px;
`;

const UserName = styled.div`
  font-weight: bold;
  font-size: 22px;
  line-height: 32px;
  letter-spacing: 0.001em;
  text-transform: capitalize;
  color: #000000;
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
`;

const JoinedKarma = styled.div`
  font-size: 12px;
  font-weight: bold;
  line-height: 12px;
  color: #ed702d;
  border: 1px solid #ed702d;
  border-radius: 25px;
  padding: 3px;
`;

const UserDetail = styled.div`
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: 0.001em;
  color: #555555;
`;

const UserContent = styled.div`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.001em;
  color: #3f3f3f;
`;

const UserInfo = () => {
  const { by } = useParams();
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    async function getUserInfo() {
      await axios
        .get(`https://hacker-news.firebaseio.com/v0/user/${by}.json`)
        .then((res) => {
          setUserInfo(res.data);
        })
        .catch((err) => console.log(err));
    }
    getUserInfo();
  }, [by]);

  return (
    <Wrapper>
      <Card>
        <UserName>{by}</UserName>
        <UserData>
          <JoinedKarma>Joined</JoinedKarma>
          <UserDetail style={{ margin: "0 7px 0 5px" }}>
            {userInfo.created}
          </UserDetail>
          <JoinedKarma>karma</JoinedKarma>
          <UserDetail style={{ marginLeft: "5px" }}>
            {userInfo.karma}
          </UserDetail>
        </UserData>
        <UserContent>
          Software engineer since C64; machine learning nerd with a PhD; life &
          adventure around the world. Creator of Gensim open source. Founder at
          rare-technologies.com. CTO at https://pii-tools.com.
          https://github.com/piskvorky/ https://twitter.com/RadimRehurek
        </UserContent>
      </Card>
    </Wrapper>
  );
};

export default UserInfo;
