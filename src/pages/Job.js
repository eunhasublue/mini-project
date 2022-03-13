import React, { useEffect, useState } from "react";
import JobBanner from "../img/JobBanner.png";
import Prev from "../img/PrevPage.png";
import Next from "../img/NextPage.png";
import styled from "styled-components";
import axios from "axios";

const Wrapper = styled.div`
  width: 390px;
  height: 100vh;
  background-color: #efefef;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const Card = styled.div`
  width: 350px;
  height: 105px;
  background-color: white;
  padding: 12px;
  margin: 12px 20px;
  box-sizing: border-box;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const JobTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: #000000;
`;

const JobInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const JobDetailInfo = styled.div`
  font-size: 12px;
  line-height: 20px;
  color: #b7b7b7;
`;

const Pagenation = styled.div`
  display: flex;
  justify-content: center;
`;

const PageNumber = styled.div`
  width: 50px;
  height: 20px;
  background-color: white;
  border: 1px solid #dfdfdf;
  border-radius: 30px;
  margin: 0 25px;
  padding: 2px;
  text-align: center;
  line-height: 15px;
`;

const PageNumberSpan = styled.span`
  font-size: 12px;
  color: #000;
`;

const PageImg = styled.img`
  width: 25px;
  height: 25px;
`;

const Job = () => {
  const [initData, setInitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const url = "https://hacker-news.firebaseio.com/v0/jobstories.json";

  const getData = async (id) => {
    await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => {
        setInitData((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function getNewsIds() {
      await axios
        .get(url)
        .then((res) => {
          setInitData([]);
          setTotalPage(Math.ceil(res.data.length / 10));
          for (let i = (currentPage - 1) * 10; i < currentPage * 10; i++) {
            if (res.data.length > i) {
              getData(res.data[i]);
            }
          }
        })
        .catch((err) => console.log(err));
    }
    getNewsIds();
  }, [url, currentPage]);

  const nextPageHandler = () => {
    if (currentPage < totalPage) {
      setCurrentPage((currentPage) => currentPage + 1);
    }
  };

  const prevPageHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((currentPage) => currentPage - 1);
    }
  };

  const onClickBlankHandler = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Wrapper>
      <img src={JobBanner} alt="job_banner" />
      {initData.map((data) => (
        <Card key={data.id} onClick={() => onClickBlankHandler(data.url)}>
          <JobTitle>{data.title}</JobTitle>
          <JobInfo>
            <JobDetailInfo style={{ textDecoration: "underline" }}>
              devcycle.com
            </JobDetailInfo>
            <JobDetailInfo>2 hours ago</JobDetailInfo>
          </JobInfo>
        </Card>
      ))}

      <Pagenation>
        <PageImg src={Prev} alt="prev_page" onClick={prevPageHandler} />
        <PageNumber>
          <PageNumberSpan>
            {currentPage}/{totalPage}
          </PageNumberSpan>
        </PageNumber>
        <PageImg src={Next} alt="next_page" onClick={nextPageHandler} />
      </Pagenation>
    </Wrapper>
  );
};

export default Job;
