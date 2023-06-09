// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// function FreeBbs() {
//     const [bbsList, setBbsList] = useState([]);

//     useEffect(() => {
//         axios.get("http://118.67.132.98:3000/getAllList")
//             .then(response => {
//                 setBbsList(response.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             })
//     }, []);

//     return (
//         <div style={{ width: "1000px", margin: "0px auto" }}>
//             <div style={{ float: "right" }}>
//                 <select>
//                     <option>카테고리</option>
//                     <option value={"basketball"}>농구</option>
//                     <option value={"soccer"}>축구</option>
//                     <option value={"baseball"}>야구</option>
//                     <option value={"tvShow"}>예능</option>
//                     <option value={"dramaMovie"}>드라마/영화</option>
//                     <option value={"game"}>게임</option>
//                     <option value={"food"}>음식</option>
//                     <option value={"together"}>함께</option>
//                     <option value={"travel"}>탐사</option>
//                     <option value={"chat"}>잡담</option>
//                 </select>
//             </div>
//             <br />
//             <br />
//             <div>
//                 <table border={1} align="center">
//                     <colgroup>
//                         <col width={"120px"} />
//                         <col width={"500px"} />
//                         <col width={"100px"} />
//                         <col width={"100px"} />
//                         <col width={"100px"} />
//                     </colgroup>
//                     <thead>
//                         <tr>
//                             <th>No.</th>
//                             <th>제목</th>
//                             <th>작성자</th>
//                             <th>작성일</th>
//                             <th>조회수</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {bbsList.map(list => (
//                             <tr key={list.bbsSeq}>
//                                 <td>{list.bbsSeq}</td>
//                                 <td>
//                                     <Link to={`/freeBbsDetail/${list.bbsSeq}`}>
//                                         {list.title}
//                                     </Link>
//                                 </td>
//                                 <td>{list.id}</td>
//                                 <td>{list.wdate}</td>
//                                 <td>{list.readcount}</td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     );
// }

// export default FreeBbs;
import { useState, useEffect,useAuth } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

function FreeBbsList() {
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

  //const { currentUser } = useAuth();
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    axios
      .get(`http://118.67.132.98:3000/getAllList?page=${page}&size=10`)
      .then((response) => {
        setList(response.data.content);
        setTotalPages(response.data.totalPages);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [page]);

  const handlePageChange = (value) => {
    setPage(value);
  };

  return (
    <div>
      <div style={{ float: "right" }}>
        {auth != null && <Link to="/freeBbsWrite">글 작성</Link>}
        <select>
          <option>카테고리</option>
          <option value={"basketball"}>농구</option>
          <option value={"soccer"}>축구</option>
          <option value={"baseball"}>야구</option>
          <option value={"tvShow"}>예능</option>
          <option value={"dramaMovie"}>드라마/영화</option>
          <option value={"game"}>게임</option>
          <option value={"food"}>음식</option>
          <option value={"together"}>함께</option>
          <option value={"travel"}>탐사</option>
          <option value={"chat"}>잡담</option>
        </select>
      </div>
      <br />
      <br />
      <div>
        <table border="1" align="center">
          <colgroup>
            <col width={"120px"} />
            <col width={"500px"} />
            <col width={"100px"} />
            <col width={"100px"} />
            <col width={"100px"} />
            <col width={"100px"} />
          </colgroup>
          <thead>
            <tr>
              <th>글번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
              <th>좋아요 수</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item.bbsSeq}>
                <td>{item.bbsSeq}</td>
                <td>
                  <Link to={`/freeBbsDetail/${item.bbsSeq}`}>{item.title}</Link>
                </td>
                <td>{item.writer}</td>
                <td>{item.regDate}</td>
                <td>{item.readCount}</td>
                <td>{item.likeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {totalPages > 0 && (
            <Pagination
              count={totalPages}
              page={page}
              onChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default FreeBbsList;
