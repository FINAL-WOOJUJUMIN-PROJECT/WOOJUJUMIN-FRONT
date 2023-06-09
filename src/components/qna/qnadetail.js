import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Qnadetail() {
  const [qna, setQna] = useState();
  const [loading, setLoading] = useState(false);

  let params = useParams();
  console.log(params.qnaSeq);

  const qnaData = async (qnaSeq) => {
    const response = await axios.get("http://118.67.132.98:3000/getQna", {
      params: { qnaSeq: qnaSeq },
    });
    setQna(response.data);

    setLoading(true); // 여기서 rendering 해 준다
  };

  useEffect(() => {
    qnaData(params.qnaSeq);
  }, [params.qnaSeq]);

  if (loading === false) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <br /> <br />
      <h3>내 문의글 보기</h3>
      <br /> <br />
      <table align="center" border="1" className="ttable">
        <colgroup>
          <col style={{ width: "150px" }} />
          <col style={{ width: "500px" }} />
        </colgroup>
        <tbody>
          <tr>
            <th>작성자</th>
            <td style={{ textAlign: "left" }}>{qna.id}</td>
          </tr>

          <tr>
            <th>작성일</th>
            <td style={{ textAlign: "left" }}>{qna.wdate}</td>
          </tr>

          <tr>
            <th>제목</th>
            <td colSpan="2" style={{ textAlign: "left" }}>
              {qna.title}
            </td>
          </tr>
          <tr>
            <th>내용</th>
            <td style={{ textAlign: "left" }}>{qna.content}</td>
          </tr>

          {qna.ansdate ? (
            <>
              <tr>
                <th>답변일자</th>
                <td style={{ textAlign: "left" }}>{qna.ansdate}</td>
              </tr>
              <tr>
                <th>답변</th>
                <td style={{ textAlign: "left" }}>{qna.answer}</td>
              </tr>
            </>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default Qnadetail;
