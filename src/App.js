import React, { useState, useEffect, useContext } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ToggleMenu from "./components/togglemenu";

import BackToTopBtn from "./components/backToTopBtn";
import ChatbotModal from "./components/chatbotModal";
import ChattingModal from "./components/ChattingModal";

import logo from "./components/image/logo.png";

import Login from "./components/login/login";

import Main from "./components/main/main";
import SocialHandler from "./components/social/socialHandler";

import AccountInfo from "./components/accountInfo";
import MessageInfo from "./components/messageInfo";
import SendMessageInfo from "./components/sendMessageInfo";
import Home from "./pages/Home";

import MybbsList from "./components/mybbsList";
import MyfreebbsList from "./components/myfreebbsList";
import PartyAccept from "./components/partyAccept";
import PartyRequest from "./components/partyRequest";
import PartyRoom from "./components/partyRoom";
import PartyList from "./components/partyList";

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
import Mypage from "./components/mypage";

function App() {
  // 로그인 상태 관리
  const [log, setLog] = useState(null);
  const [nickname, setNickname] = useState("");
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState('');

  function loghandle() {
    localStorage.clear();
    window.location.href = "/";
  }

  useEffect(() => {
    if (localStorage.getItem("login") === null) {
      setLog(true);
    } else {
      setLog(false);
      const loginInfo = JSON.parse(localStorage.getItem("login"));
      setNickname(loginInfo.nickname);
      setProfile(loginInfo.profile);
      console.log(localStorage.getItem("login"));
    }
  }, [log]);

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
            {/* {log ? <span>로그인해주세요</span> : <span><img src={`http://localhost:3000/upload/${profile.substring(57)}`} style={{width: "20px", height: "20px", borderRadius: "50%"}}/>{nickname}님</span>}&nbsp;&nbsp;&nbsp; */}
            {log ? <Link to="/regi">회원가입</Link> : <Link to="/mypage">마이페이지</Link>}&nbsp;&nbsp;&nbsp;
            {log === false && <Link to="/messageInfo">메시지함</Link>}&nbsp;&nbsp;&nbsp;
            {log === false && <Link to="/">파티장 요청</Link>}&nbsp;&nbsp;&nbsp;
            {log ? (
              <Link to="/login">로그인</Link>
            ) : (
              <button
                onClick={() => {
                  loghandle();
                  signOut(auth);
                }}
              >
                로그아웃
              </button>
            )}
          </div>
        </header>

        <nav className="appNav">
          <Link to="/freeBoard">자유게시판</Link>&nbsp;&nbsp;&nbsp;
          <Link to="" className="mainmenu">문화생활
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
          </Link>&nbsp;&nbsp;&nbsp;

          <Link to="/qnalist">Q&A</Link>&nbsp;&nbsp;&nbsp;
          <Link to="/partybbs">partybbs</Link> &nbsp;&nbsp;
          <Link to="/partybbslist">partybbslist</Link> &nbsp;&nbsp;
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

            <Route path="/moviechart" element={<MovieCrawling />} />
            <Route path="/bookchart" element={<BookCrawling />} />
            <Route path="/localevent" element={<Localeventcrawling />} />
            <Route path="/musichart" element={<Musiccrawling />} />

            <Route path="/qnalist" element={<Qnalist />} />
            <Route path="/qnawrite" element={<Qnawrite />} />
            <Route path="/qnadetail/:qnaSeq" exact element={<Qnadetail />} />

            <Route path="/socialLogin" element={<SocialHandler />} />
            <Route path="/accountInfo" element={<AccountInfo />}></Route>
            <Route path="/mybbsList" element={<MybbsList />}></Route>
            <Route path="/partyAccept" element={<PartyAccept />}></Route>
            <Route path="/partyRequest" element={<PartyRequest />}></Route>
            <Route path="/partyRoom/:seq" element={<PartyRoom />}></Route>
            <Route path="/partyList" element={<PartyList />}></Route>

            <Route path="/messageInfo" element={<MessageInfo />}></Route>
            <Route path="/mypage" element={<Mypage />}></Route>
            <Route path="/sendMessageInfo" element={<SendMessageInfo />}></Route>

            <Route path="pages/Home" element={<Home />} />
            <Route path="bank/bankaccountInfo" element={<BankaccountInfo />} />

            <Route path="/myfreebbsList" element={<MyfreebbsList />}></Route>

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
        <footer>
          <p style={{ color: "gray", fontSize: "12px" }}>Copyright(c)2023 woojujumin All rights reserved </p>&nbsp;&nbsp;
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
