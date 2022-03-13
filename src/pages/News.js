import React, { useEffect, useState } from "react";
import { ReactComponent as IconUser } from "../img/IconUser.svg";
import { ReactComponent as NewsBanner } from "../img/NewsBanner.svg";
import styled from "styled-components";
import axios from "axios";
import ModeBar from "../components/ModeBar";
import Comment from "../img/Comment.png";
import Prev from "../img/PrevPage.png";
import Next from "../img/NextPage.png";
import Detail from "./Detail";

const Card = styled.div`
  background-color: white;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.3), 0px 3px 6px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  width: 350px;
  height: 148px;
  margin: 20px 20px 16px 20px;
  padding: 15px 12px 20px 12px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

const Github = styled.div`
  background: #efefef;
  width: 90px;
  border-radius: 20px;
  padding: 3px 12px;
  box-sizing: border-box;
`;

const GithubSpan = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: #ed702d;
  line-height: 20px;
`;

const Title = styled.span`
  color: #202020;
  font-size: 16px;
  font-weight: 600;
  line-height: 24px;
`;

const ByStyle = styled.span`
  color: #3f3f3f;
  font-weight: 500;
  font-size: 12px;
  margin-left: 2px;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TitleWrapper = styled.div`
  margin: 8px 0 0 5px;
`;

const Wrapper = styled.div`
  width: 390px;
  height: 100vh;
  background-color: white;
  overflow: hidden;
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const PointTime = styled.span`
  font-weight: normal;
  font-size: 12px;
  color: #949494;
  margin: 0 4px;
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

const News = () => {
  const [initData, setInitData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [detailPageVisible, setDetailPageVisible] = useState(false);
  const [detailData, setDetailData] = useState();

  const url = "https://hacker-news.firebaseio.com/v0/newstories.json";

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

  // const getData = () => {
  //   id.map((data) => {
  //     const resData = axios.get(
  //       `https://hacker-news.firebaseio.com/v0/item/${data}.json`
  //     );
  //     setInitData((prev) => [...prev, resData.data]);
  //   });
  // };

  // const getData = () => {
  //   let array = [];
  //   id.map((data) => {
  //     array.push(
  //       axios.get(`https://hacker-news.firebaseio.com/v0/item/${data}.json`)
  //     );
  //   });
  //   setInitData(array);
  // };

  // const getUrl = async () => {
  //   try {
  //     const { data } = await axios.get(url);
  //     setId(data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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

  // useEffect(() => {
  //   getData();
  // }, []);

  // const NewsIdPush = () => {
  //   newsNumber
  //     .filter((_, index) => index < 10)
  //     .map((id) => {
  //       axios
  //         .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
  //         .then((res) => {
  //           setNewsList((prev) => [...prev, res.data]);
  //         })
  //         .catch((err) => console.log(err));
  //     });
  // };

  // useEffect(async () => {
  //   await axios
  //     .get("https://hacker-news.firebaseio.com/v0/newstories.json")
  //     .then((res) => {
  //       setNewsNumber(res.data);
  //       NewsIdPush();
  //     });
  // }, []);

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
          <NewsBanner />
          <ModeBar />
          {initData.map((data) => (
            <Card key={data.id} onClick={() => DetailPageHandler(data)}>
              <div>
                <Github>
                  <GithubSpan>github.com</GithubSpan>
                </Github>
                <TitleWrapper>
                  <Title>{data.title}</Title>
                </TitleWrapper>
              </div>

              <PostInfo>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <IconUser style={{ width: "16px", height: "16px" }} />
                  <ByStyle>{data.by}</ByStyle>
                  <PointTime>{data.score} points</PointTime>
                  <PointTime>2 hours ago</PointTime>
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

export default News;
