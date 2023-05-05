import Pagination from "react-js-pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./freebbs.css";

function FreeBbsList() {
  const [tag, setTag] = useState();
  const paramtag = useParams().tag;

  useEffect(() => {
    if (paramtag !== undefined) {
      setTag(paramtag);
    }
  }, []);
  //로그인관련

  const [id, setId] = useState("");
  const [auth, setAuth] = useState();

  const isLogin = localStorage.getItem("login");

  useEffect(() => {
    if (isLogin == null) {
      return;
    } else {
      const login = JSON.parse(isLogin);
      setId(login.id);
      setAuth(login.auth);
    }
  }, [isLogin]);

  const [freelist, setFreelist] = useState([]);

  const [choice, setChoice] = useState();
  const [search, setSearch] = useState();

  // paging
  const [page, setPage] = useState(1);
  const [start, setStart] = useState(0);
  const [totalCnt, setTotalCnt] = useState(0);

  function getFreelist() {
    axios
      .get("http://localhost:3000/freeBbslist", {
        params: { choice: choice, search: search, start: start, tag: tag },
      })
      .then(function(resp) {
        setFreelist(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function getFreecnt() {
    axios
      .get("http://localhost:3000/cntFreeBbs", {
        params: {
          choice: choice,
          search: search,
          tag: tag,
        },
      })
      .then(function(resp) {
        setTotalCnt(resp.data);
      })
      .catch(function(err) {
        alert(err);
      });
  }

  function searchBtn() {
    getFreelist(choice, search);
  }

  function pageChange(page) {
    setPage(page);
    setStart((page - 1) * 20);
  }
  useEffect(() => {
    getFreelist();
    getFreecnt();
  }, [start, totalCnt, tag, choice]);

  return (
    <div className="freebbspage">
      <br />
      <Button variant="outline-secondary" value={""} onClick={(e) => setTag(e.target.value)}>
        전체
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={10} onClick={(e) => setTag(e.target.value)}>
        잡담
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={1} onClick={(e) => setTag(e.target.value)}>
        농구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={2} onClick={(e) => setTag(e.target.value)}>
        축구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={3} onClick={(e) => setTag(e.target.value)}>
        야구
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={4} onClick={(e) => setTag(e.target.value)}>
        예능
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={5} onClick={(e) => setTag(e.target.value)}>
        드라마/영화
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={6} onClick={(e) => setTag(e.target.value)}>
        게임
      </Button>
      &nbsp;&nbsp;
      <Button variant="outline-secondary" value={7} onClick={(e) => setTag(e.target.value)}>
        음식
      </Button>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <a href="#">내가 좋아한 게시물</a>
      <br />
      <br />
      <div className="freebbslist">
        <Table bordered hover>
          <colgroup>
            <col width={"80px"} />
            <col width={"500px"} />

            <col width={"100px"} />
            <col width={"60px"} />
            <col width={"60px"} />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>

              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {freelist && freelist.length ? (
              freelist.map(function(free, i) {
                return free.del === 0 ? (
                  <tr key={i}>
                    <td>{free.bbsSeq}</td>
                    <td>
                      <div
                        style={{
                          width: "100%",
                          height: "50px",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {free.image !== null ? (
                          <img
                            src={`http://localhost:3000/upload/freebbs/${free.image}`}
                            alt="free image"
                            style={{
                              width: 40,
                              height: "auto",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        ) : null}
                        &nbsp;&nbsp;<Link to={`/freeBbsDetail/${free.bbsSeq}`}>{free.title}</Link>
                      </div>
                    </td>

                    <td>{free.wdate.substring(0, 10)}</td>
                    <td>{free.readcount}</td>
                    <td>{free.likey}</td>
                  </tr>
                ) : free.del === 1 ? (
                  <tr key={i}>
                    <td>{free.bbsSeq}</td>
                    <td colSpan={5} style={{ textAlign: "left" }}>
                      <p style={{ color: "red" }}>작성자가 삭제한글입니다</p>
                    </td>
                  </tr>
                ) : (
                  <tr key={i}>
                    <td>{free.bbsSeq}</td>
                    <td colSpan={5} style={{ textAlign: "left" }}>
                      <p style={{ color: "purple" }}>관리자가 검토중인 글입니다</p>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6}>작성된 글이 없습니다</td>
              </tr>
            )}
          </tbody>
        </Table>
        {auth != null && (
          <Link to="/freeBbsWrite">
            {" "}
            <Button variant="success" size="sm">
              글 작성
            </Button>
          </Link>
        )}
        <br />
        <Pagination activePage={page} itemsCountPerPage={20} totalItemsCount={totalCnt} pageRangeDisplayed={5} prevPageText={"이전"} nextPageText={"다음"} onChange={pageChange} />
        <select value={choice} onChange={(e) => setChoice(e.target.value)}>
          <option>검색</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="writer">작성자</option>
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="검색어" />
        &nbsp;
        <Button variant="success" size="sm" onClick={searchBtn}>
          검색
        </Button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
}

export default FreeBbsList;
