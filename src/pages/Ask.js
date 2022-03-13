import React, { useEffect, useState } from "react";
import ModeBar from "../components/ModeBar";
import { ReactComponent as AskBanner } from "../img/AskBanner.svg";
import { ReactComponent as IconUser } from "../img/IconUser.svg";
import Comment from "../img/Comment.png";
import Prev from "../img/PrevPage.png";
import Next from "../img/NextPage.png";
import styled from "styled-components";
import axios from "axios";
import Detail from "./Detail";

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
  width: 390px;
  height: 200px;
  margin: 20px 0 12px 0;
  background-color: white;
  padding: 12px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const QuestionTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  color: #202020;
`;

const QuestionTitleSpan = styled.span`
  font-weight: 500;
  font-size: 16px;
  color: #ed702d;
`;

const QuestionContent = styled.div`
  font-size: 14px;
  margin: 10px 0;
  color: #727272;
  word-break: break-word;
  flex-wrap: wrap;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const QuestionTime = styled.div`
  font-size: 12px;
  color: #949494;
  position: absolute;
  right: 0;
`;

const CommentInfo = styled.div`
  display: flex;
  align-items: center;
`;

const CommentCounter = styled.span`
  font-weight: 500;
  font-size: 12px;
  color: #ed702d;
`;

const PostAuth = styled.div`
  color: #3f3f3f;
  font-weight: 500;
  font-size: 12px;
  margin: 0 3px;
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

const Ask = () => {
  const [initData, setInitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [detailPageVisible, setDetailPageVisible] = useState(false);
  const [detailData, setDetailData] = useState();

  const url = "https://hacker-news.firebaseio.com/v0/askstories.json";

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

  const DetailPageHandler = (data) => {
    setDetailPageVisible(true);
    setDetailData(data);
  };

  return (
    <>
      {detailPageVisible ? (
        <Detail detailPageData={detailData} />
      ) : (
        <Wrapper>
          <AskBanner />
          <ModeBar />
          {initData.map((data) => (
            <Card key={data.id} onClick={() => DetailPageHandler(data)}>
              <div style={{ position: "relative" }}>
                <QuestionTitle>
                  <QuestionTitleSpan>Ask HN: </QuestionTitleSpan> {data.title}
                </QuestionTitle>
                <QuestionContent>{data.text}...</QuestionContent>
                <QuestionTime>2 hours ago</QuestionTime>
              </div>

              <PostInfo>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconUser style={{ width: "16px", height: "16px" }} />
                  <PostAuth>{data.by}</PostAuth>
                  <PostAuth>{data.score} points</PostAuth>
                </div>

                <CommentInfo>
                  <img
                    src={Comment}
                    alt="comment"
                    style={{ marginRight: "2px" }}
                  />
                  <CommentCounter>{data.descendants}</CommentCounter>
                </CommentInfo>
              </PostInfo>
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
      )}
    </>
  );
};

export default Ask;
