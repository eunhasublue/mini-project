import React, { useEffect, useState } from "react";
import AuthTimerArrow from "./AuthTimerArrow";
import styled from "styled-components";
import axios from "axios";

const NestedComment = styled.div`
  background: #efefef;
  padding: 20px 12px;
  border-radius: 8px;
  margin-bottom: 15px;
  margin-left: ${(props) => props.called * 20}px;
`;

const NestedCommentContent = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.001em;
  color: #3f3f3f;
  word-break: break-word;
  pre {
    white-space: break-spaces;
  }
`;

const NestedComments = (props) => {
  const [nestedComment, setNestedComment] = useState([]);
  let called = props.called;
  useEffect(() => {
    const getKidCommentId = async () => {
      await axios
        .get(
          `https://hacker-news.firebaseio.com/v0/item/${props.nestedCommentId}.json`
        )
        .then((res) => {
          setNestedComment(res.data);
        });
    };
    getKidCommentId();
  }, [props.nestedCommentId]);

  return (
    <>
      <NestedComment called={props.called}>
        <AuthTimerArrow commentAuth={nestedComment.by} postImgSize={false} />
        {nestedComment.deleted ? (
          <NestedCommentContent>삭제된 메시지입니다.</NestedCommentContent>
        ) : (
          <NestedCommentContent
            dangerouslySetInnerHTML={{ __html: nestedComment.text }}
          />
        )}
      </NestedComment>

      {nestedComment.kids?.map((kids, index) => (
        <NestedComments
          key={kids[index]}
          nestedCommentId={kids}
          called={called++}
        />
      ))}
    </>
  );
};

export default NestedComments;
