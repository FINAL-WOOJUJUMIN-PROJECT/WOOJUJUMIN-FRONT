import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Button from "react-bootstrap/Button";

import ToggleMenu from "./components/togglemenu";

import BackToTopBtn from "./components/backToTopBtn";
import ChatbotModal from "./components/chatbotModal";
import ChattingModal from "./components/ChattingModal";

import logo from "./components/image/logo.png";
import message from "./components/image/free-icon-received-message-9996256.png";
import user from "./components/image/free-icon-user-4803103.png";
import partyleader from "./components/image/free-icon-team-leader-2572948.png";

import Login from "./components/login/login";

import Main from "./components/main/main";
import SocialHandler from "./components/social/socialHandler";

import MessageInfo from "./components/messageInfo";
import SendMessageInfo from "./components/sendMessageInfo";
import Home from "./pages/Home";

import MyInfo from "./components/mypage/myinfo";

import Regi from "./components/login/regi";

import FreeBbsList from "./components/freebbs/freeBbsList";
import FreeBbsDetail from "./components/freebbs/freeBbsDetail";
import FreeBbsWrite from "./components/freebbs/freeBbsWrite";
import FreeBbsModify from "./components/freebbs/freeBbsModify";

import FreeBbsReply from "./components/freebbs/freeBbsReply";
import FreeBbslikey from "./components/freebbs/freeBbslikey";

import BankaccountInfo from "./components/bank/bankaccountInfo";

import Qnalist from "./components/qna/qnalist";
import Qnawrite from "./components/qna/qnawrite";
import Qnadetail from "./components/qna/qnadetail";

import "./App.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import MovieCrawling from "./components/crawling/movieCrawling";
import BookCrawling from "./components/crawling/bookcrawling";
import Localeventcrawling from "./components/crawling/localeventcrawling";
import Musiccrawling from "./components/crawling/musicrawling";
import { AuthContext } from "./context/AuthContext";
import IdSearch from "./components/login/idsearch";
import PwdSearch from "./components/login/pwdsearch";
// import TestScroll from "./components/crawling/test";

import Partybbs from "./components/partybbs";
import Partybbsdetail from "./components/partybbsdetail";
import Partybbslist from "./components/partybbslist";
import Partybbsupdate from "./components/partybbsupdate";

import PartyLeaderrequest from "./components/mypage/partyleaderrequest";
import axios from "axios";
import PartyLeaderresult from "./components/mypage/partyleaderresult";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);
  const [nickname, setNickname] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState("");
  const [cardcheck, setCardcheck] = useState("");
  const [id, setId] = useState('');
  const [imageurl, setImageurl] = useState('');

  function loghandle() {
    localStorage.clear();
    window.location.href = "/";
  }
  useEffect(() =>{

   // setLog(tmp.res);
  });


  //setLog(props);
  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
      const loginInfo = JSON.parse(localStorage.getItem("login"));
      setNickname(loginInfo.nickname);
      setProfile(loginInfo.profile);
      setId(loginInfo.id);
      setImageurl(loginInfo.imageurl);
      console.log(localStorage.getItem("login"));
    }
  }, [log]);

  useEffect(() => {
    const loginInfo = JSON.parse(localStorage.getItem("login"));
    const result = async () => {
      await axios
        .get("http://118.67.132.98:3000/partyleaderresult", { params: { memid: loginInfo.id } })
        .then(function(res) {
          console.log(res.data);
          setCardcheck(res.data);
        })
        .catch(function(err) {
          alert(err);
        });
    };

    if (loginInfo !== null) {
      result();
    }
  }, []);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      마이페이지
    </Tooltip>
  );
  const renderTooltip2 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      메시지함
    </Tooltip>
  );
  const renderTooltip3 = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      파티장 요청
    </Tooltip>
  );
  return (
    <div className="App">
      <BrowserRouter>
        <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ToggleMenu />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
            <Link to="/">
              <img src={logo} alt="Main Page" style={{ width: "150px" }} />
            </Link>
          </div>
          <div style={{ display: "flex", lignItems: "center", justifyContent: "center" }}>
            {log ? (
              <span>회원이 아닌가요?</span>
            ) : (
              <span>
                {id.substring(0,5) === 'kakao' ?
                  <img src={profile} style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white" }} />
                  : <img src={imageurl} style={{ width: "30px", height: "30px", borderRadius: "50%", background: "white" }} />
                }
                &nbsp;&nbsp;{nickname}님
              </span>
            )}
            &nbsp;&nbsp;&nbsp;
            {log ? (
              <Link to="/regi" style={{ textDecoration: "none", /* fontSize: "1.2rem", */ color: "navy" }}>
                회원가입하기
              </Link>
            ) : (
              <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip}>
                <Link to="/myinfo/mypage">
                  <img src={user} alt="noimg" style={{ width: "30px", height: "30px" }} />
                </Link>
              </OverlayTrigger>
            )}
            &nbsp;&nbsp;&nbsp;
            {log === false && (
              <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip2}>
                <Link to="/messageInfo">
                  <img src={message} alt="noimg" style={{ width: "30px", height: "30px" }} />
                </Link>
              </OverlayTrigger>
            )}
            &nbsp;&nbsp;&nbsp;
            {log === false && cardcheck === "" && (
              <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
                <Link to="/partyleaderrequest">
                  <img src={partyleader} alt="noimg" style={{ width: "30px", height: "30px" }} />
                </Link>
              </OverlayTrigger>
            )}
            {log === false && cardcheck !== "" && (
              <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
                <Link to="/partyleaderresult">
                  <img src={partyleader} alt="noimg" style={{ width: "30px", height: "30px" }} />
                </Link>
              </OverlayTrigger>
            )}
            {/* {log === false && (cardcheck === 1 || cardcheck === 2) && (
                <OverlayTrigger placement="bottom" delay={{ show: 250, hide: 400 }} overlay={renderTooltip3}>
                  <Link to="/partyleaderresult">
                    <img src={partyleader} alt="noimg" style={{ width: "30px", height: "30px" }} />
                  </Link>
                </OverlayTrigger>
              )} */}
            &nbsp;&nbsp;&nbsp;
            {log ? (
              <Button variant="light">
                <Link to="/login" style={{ textDecoration: "none", color: "black" }}>
                  로그인
                </Link>
              </Button>
            ) : (
              <Button
                variant="light"
                onClick={() => {
                  loghandle();
                  signOut(auth);
                }}
              >
                로그아웃
              </Button>
            )}
            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
          </div>
        </header>

        <nav className="appNav">
          <Link to="/freeBoard">자유게시판</Link>&nbsp;&nbsp;&nbsp;
          <Link to="" className="mainmenu">
            문화생활
            <ul className="submenu">
              <li>
                <Link to="/moviechart">상영영화</Link>&nbsp;&nbsp;&nbsp;
              </li>
              <li>
                <Link to="/bookchart">책베스트</Link>&nbsp;&nbsp;&nbsp;
              </li>
              <li>
                <Link to="/localevent">지역축제</Link>&nbsp;&nbsp;&nbsp;
              </li>
              <li>
                <Link to="/musichart">TOP50</Link>&nbsp;&nbsp;&nbsp;
              </li>
            </ul>
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link to="/partybbslist">파티게시판</Link> &nbsp;&nbsp;
          <Link to="/qnalist">사용문의</Link>&nbsp;&nbsp;&nbsp;
          {/* <Link to="/partybbsdetail">partybbsdetail</Link> &nbsp;&nbsp; */}
          {/* <Link to="/partybbsupdate">partybbsupdate</Link> &nbsp;&nbsp; */}
        </nav>
        <main>
          <ChatbotModal />
          <ChattingModal />
          <BackToTopBtn />
          <Routes>
            <Route exact path="/*" element={<Main />} />

            <Route path="/login" element={<Login />} />
            <Route path="/regi" element={<Regi />} />
            <Route path="/idsearch" element={<IdSearch />} />
            <Route path="/pwdsearch" element={<PwdSearch />} />

            <Route path="/partyleaderrequest" element={<PartyLeaderrequest />} />
            <Route path="/partyleaderresult" element={<PartyLeaderresult />} />

            <Route path="/moviechart" element={<MovieCrawling />} />
            <Route path="/bookchart" element={<BookCrawling />} />
            <Route path="/localevent" element={<Localeventcrawling />} />
            <Route path="/musichart" element={<Musiccrawling />} />

            <Route path="/qnalist" element={<Qnalist />} />
            <Route path="/qnawrite" element={<Qnawrite />} />
            <Route path="/qnadetail/:qnaSeq" exact element={<Qnadetail />} />

            <Route path="/socialLogin" element={<SocialHandler />} />

            <Route path="/myinfo/*" element={<MyInfo />}></Route>

            <Route path="/messageInfo" element={<MessageInfo />}></Route>
            <Route path="/sendMessageInfo" element={<SendMessageInfo />}></Route>

            <Route path="pages/Home" element={<Home />} />
            <Route path="bank/bankaccountInfo" element={<BankaccountInfo />} />

            <Route path="/freeBoard" element={<FreeBbsList />} />
            <Route path="/freeBoard/:tag" element={<FreeBbsList />} />
            <Route path="/freeBbsDetail/:bbsSeq" element={<FreeBbsDetail />} />
            <Route path="/freeBbsWrite" element={<FreeBbsWrite />} />
            <Route path="/freeBbsModify/:bbsSeq" element={<FreeBbsModify />} />

            <Route path="/partybbs" element={<Partybbs />} />
            <Route path="/partybbslist" element={<Partybbslist />} />
            <Route path="/partybbsdetail/:seq" element={<Partybbsdetail />} />
            <Route path="/partybbsupdate/:seq" exact element={<Partybbsupdate />} />
            <Route path="/freeBbsReply/:bbsSeq" element={<FreeBbsReply />} />
            <Route path="/freeBbslikey" element={<FreeBbslikey />} />
          </Routes>
        </main>
        <hr />
        <div className="mainmiddle5" style={{ display: "flex", flexDirection: "row" }}>
          <ul style={{ listStyle: "none", padding: "0" }}>
            <br /> <br />
            <li>
              <Link to="freeBoard" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                자유게시판
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="partybbslist" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                모집게시판
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                문화생활
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="qnalist" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                사용문의
              </Link>
            </li>
          </ul>
          <ul style={{ listStyle: "none", padding: "0", marginLeft: "100px" }}>
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                우주주민 소개
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                자주 묻는 질문
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="/pages/Home" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                채팅하기
              </Link>
            </li>
            <br />
            <br />
          </ul>
          <ul style={{ listStyle: "none", padding: "0", marginLeft: "100px" }}>
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                제휴 문의
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                광고 문의
              </Link>
            </li>
            <br />
            <br />
            <li>
              <Link to="#" style={{ textDecoration: "none", fontSize: "1.2rem", color: "black" }}>
                이용약관
              </Link>
            </li>
            <br />
            <br />
          </ul>
          <pre style={{ textAlign: "left", marginLeft: "100px" }}>
            대표:우주인 | 개인정보책임관리자 : 우주인
            <br />
            주소 : 서울시 멀티캠퍼스 자바 풀스택 11반 파이널 2조
            <br />
            사업자등록번호 : 0000-000-00000 <br />
            통신판매 : 제 2023-서울강남-00000
            <br />
            고객센터 : 000-0000-0000
            <br />
            운영 시간 : (월~금) 오전 11:00 ~ 오후 5:00 / (주말 및 공휴일) 오전 10:00 ~ 오후 7:00
          </pre>

          <hr />
        </div>
        <footer>
          <p style={{ color: "gray", fontSize: "15px" }}>Copyright(c)2023 woojujumin All rights reserved </p>&nbsp;&nbsp;
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
