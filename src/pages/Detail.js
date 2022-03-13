import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as IconUser } from "../img/IconUser.svg";
import Comment from "../img/Comment.png";
import AuthTimerArrow from "../components/AuthTimerArrow";
import axios from "axios";
import NestedComments from "../components/NestedComments";

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
  background-color: white;
  padding: 20px;
  box-sizing: border-box;
`;

const PostInfo = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Auth = styled.div`
  font-weight: 500;
  font-size: 18px;
  color: #3f3f3f;
`;

const PostPointTime = styled.div`
  font-size: 12px;
  color: #949494;
  margin-right: 5px;
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 22px;
  color: #202020;
  margin: 28px 0;
`;

const Content = styled.div`
  font-size: 18px;
  line-height: 24px;
  color: #727272;
`;

const Circle = styled.div`
  background-color: #c4c4c4;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  margin-right: 5px;
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

const Sort = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const CommentList = styled.div`
  background-color: white;
  margin-top: 10px;
  padding: 15px 20px;
`;

const CirCleSort = styled.div`
  display: flex;
  align-items: center;
`;

const CommentContent = styled.div`
  font-size: 14px;
  line-height: 20px;
  color: #3f3f3f;
  margin-bottom: 15px;
  word-break: break-word;
  pre {
    white-space: break-spaces;
  }
  pre > code {
    white-space: break-spaces;
  }
`;

const Detail = (props) => {
  const [comment, setComment] = useState([]);

  const getCommentId = async (id) => {
    await axios
      .get(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
      .then((res) => {
        setComment((prev) => [...prev, res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.detailPageData.kids) {
      for (let i = 0; i < props.detailPageData.kids.length; i++) {
        getCommentId(props.detailPageData.kids[i]);
      }
    }
  }, []);

  return (
    <Wrapper>
      <Card>
        <PostInfo>
          <IconUser style={{ width: "40px", height: "40px" }} />
          <div style={{ marginLeft: "12px" }}>
            <Auth>{props.detailPageData.by}</Auth>
            <div style={{ display: "flex", marginTop: "2px" }}>
              <PostPointTime>{props.detailPageData.score} points</PostPointTime>
              <PostPointTime>{props.detailPageData.time}</PostPointTime>
            </div>
          </div>
        </PostInfo>
        <div>
          <Title>{props.detailPageData.title}</Title>
          <Content
            dangerouslySetInnerHTML={{ __html: props.detailPageData.text }}
          />
        </div>
      </Card>

      <CommentList>
        <Sort>
          <CirCleSort>
            <Circle></Circle>
            <div style={{ marginRight: "10px" }}>Registered</div>
            <Circle></Circle>
            <div>Newest</div>
          </CirCleSort>
          <CommentInfo>
            <img src={Comment} alt="comment" style={{ marginRight: "2px" }} />
            <CommentCounter>{props.detailPageData.descendants}</CommentCounter>
          </CommentInfo>
        </Sort>

        {comment.map((data) => (
          <>
            <div key={data.id}>
              <AuthTimerArrow postImgSize={false} commentAuth={data.by} />
              {data.deleted ? (
                <CommentContent>삭제된 메시지입니다.</CommentContent>
              ) : (
                <CommentContent
                  dangerouslySetInnerHTML={{ __html: data.text }}
                />
              )}
            </div>
            {data.kids?.map((kids, index) => (
              <NestedComments
                key={kids[index]}
                nestedCommentId={kids}
                called={0}
              />
            ))}
          </>
        ))}
      </CommentList>
    </Wrapper>
  );
};

export default Detail;
