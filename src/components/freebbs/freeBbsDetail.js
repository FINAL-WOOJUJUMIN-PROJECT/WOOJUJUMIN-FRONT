import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import FreeBbsReply from "./freeBbsReply";
import FreeBbslikey from "./freeBbslikey";
import FreeBbsReadcount from "./freeBbsReadcount";
import FreeBbsModify from "./freeBbsModify";
import Button from "react-bootstrap/Button";

function FreeBbsDetail() {
  let navigate = useNavigate();

  const [freebbs, setFreeBbs] = useState({});
  const [loading, setLoading] = useState(false);

  //댓글
  const [replySeq, setReplySeq] = useState();

  const [writer, setWriter] = useState("");
  const [memberSeq, setMemberSeq] = useState();

  //접속정보
  let login = JSON.parse(localStorage.getItem("login"));
  useEffect(function() {
    if (login) {
      setWriter(login.id);
      setMemberSeq(login.memberSeq);
    }
  }, []);

  let params = useParams();

  let bbsSeq = params.bbsSeq;

  const seqs = { memberSeq: memberSeq, bbsSeq: bbsSeq };

  const bbsData = async (bbsSeq) => {
    const response = await axios.get("http://localhost:3000/getfreeBbs", {
      params: { bbsSeq: bbsSeq },
    });
    setFreeBbs(response.data);
    setLoading(true); // 여기서 rendering 해 준다
  };

  function delFeebbsByWriter() {
    axios
      .post("http://localhost:3000/delFeebbsByWriter", null, {
        params: { bbsSeq: bbsSeq },
      })
      .then(function(resp) {
        if (resp.data === "YES") {
          alert("삭제되었습니다.");
        } else {
          alert("삭제에 실패했습니다");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function onRemove() {
    if (window.confirm("정말 삭제하겠습니까? ")) {
      delFeebbsByWriter();
      navigate("/freeBoard");
    } else {
      alert("글 삭제를 취소합니다.");
    }
  }

  useEffect(() => {
    bbsData(params.bbsSeq);
    setReplySeq(params.bbsSeq);
  }, [params.bbsSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  const imageUrl = freebbs.image !== null ? `http://localhost:3000/upload/freebbs/${freebbs.image}` : null;

  //목록으로 이동
  function handleButtonClick() {
    navigate("/freeBoard");
  }
  return (
    <div>
      <br />
      <table border="1" align="center">
        <colgroup>
          <col width={"80px"} />
          <col width={"500px"} />
          <col width={"150px"} />
          <col width={"150px"} />
        </colgroup>
        <tbody>
          <tr>
            <th>제목</th>
            <td>{freebbs.title}</td>
            <th>조회수</th>
            <td>
              <FreeBbsReadcount seqs={seqs} />
            </td>
          </tr>
          <tr>
            <th>작성자</th>
            <td>{freebbs.id}</td>
            <th>작성시간</th>
            <td>{freebbs.wdate}</td>
          </tr>
          <tr>
            <td colSpan={4}>
              <br /> <br />
              {imageUrl !== null ? (
                <img
                  src={imageUrl}
                  alt="no image"
                  style={{
                    width: 500,
                    height: "auto",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              ) : null}
              <br /> <br />
              <pre>{freebbs.content}</pre>
              <br /> <br />
              {login && <FreeBbslikey seqs={seqs} />} <br /> <br />
            </td>
          </tr>
          {login && (
            <tr>
              <td colSpan={4}>
                <FreeBbsReply replySeq={replySeq} writer={writer} />
                <br /> <br />
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <Button variant="outline-secondary" size="sm" onClick={handleButtonClick}>
        목록
      </Button>
      &nbsp;&nbsp;
      {freebbs.id == writer ? (
        <Button variant="outline-secondary" size="sm" onClick={() => navigate(`/freeBbsModify/${bbsSeq}`)}>
          수정
        </Button>
      ) : null}
      &nbsp;&nbsp;{" "}
      {freebbs.id == writer ? (
        <Button variant="outline-secondary" size="sm" onClick={() => onRemove()}>
          삭제
        </Button>
      ) : null}
      &nbsp;&nbsp;
      <br /> <br />
      <br />
      <br />
    </div>
  );
}

export default FreeBbsDetail;
