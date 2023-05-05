//import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

function FreeBbsReply(props) {
  let navigate = useNavigate();

  const [replylist, setReplylist] = useState([]);

  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(10);

  let replySeq = props.replySeq;
  let writer = props.writer;
  //댓글
  //const [replySeq, setReplySeq] = useState();
  const [content, setContent] = useState("");
  //const [writer, setWriter] = useState("");
  const contentChange = (e) => {
    setContent(e.target.value);
  };

  //댓글쓰기
  function writeFreebbsReply() {
    if (content === undefined || content.trim() === "") {
      alert("댓글 내용을 입력해 주십시오");
      return;
    }

    axios
      .post("http://localhost:3000/writeFreeReply", null, {
        params: { writer: writer, replySeq: replySeq, content: content },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "YES") {
          alert("성공적으로 등록되었습니다");
          navigate(`/freeBbsDetail/${replySeq}`);
          setContent("");
        } else {
          alert("등록되지 않았습니다");
        }
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function getReplylist() {
    axios
      .get("http://localhost:3000/freeReplyList", {
        params: { replySeq: replySeq, start: start, limit: limit },
      })
      .then(function(resp) {
        setReplylist(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  useEffect(() => {
    getReplylist();
  }, [replySeq, limit, content]);

  const handleLoadMore = () => {
    setLimit((prev) => prev + 10);
  };

  return (
    <div>
      <br />
      <div>
        <table border="1" align="center">
          <colgroup>
            <col width={"20%"} />
            <col width={"80%"} />
          </colgroup>
          <thead>
            <tr>
              <th>댓쓴이</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {replylist && replylist.length ? (
              replylist.map(function(reply, i) {
                return (
                  <tr key={i}>
                    <td>{reply.writer}</td>
                    <td>{reply.content}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={2}>작성된 글이 없습니다</td>
              </tr>
            )}
            <tr>
              <td colSpan={2}>
                <button onClick={handleLoadMore}>
                  <b>댓글 더보기</b>
                </button>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <br />
                <textarea style={{ width: "100%", resize: "none" }} value={content} onChange={contentChange}></textarea>
                <br /> <br />
                <div className="d-grid gap-2">
                  <Button variant="secondary" size="sm" type="submit" onClick={writeFreebbsReply}>
                    작성하기
                  </Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FreeBbsReply;
